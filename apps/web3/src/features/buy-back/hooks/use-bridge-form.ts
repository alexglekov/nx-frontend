/* eslint-disable max-statements */
import { useEffect, useState } from 'react'
import * as CCIP from '@chainlink/ccip-js'
import { STAND, VITE_HTTP_PROVIDER } from 'app/constants'
import { Stand } from 'app/types'
import { arbitrumOne } from 'app/wagmi-config'
import { notificationStateVar } from 'shared/store/notification'
import { Maybe, Web3Adress } from 'shared/types'
import { useDebounce } from 'use-debounce'
import { createPublicClient, http, parseUnits } from 'viem'
import { arbitrumSepolia, mainnet, sepolia } from 'viem/chains'
import { useAccount, useWalletClient } from 'wagmi'
import { handleCatchAction } from '../../../shared/utils/handle-catch-action'
import { BRIDGE_OPTIONS_MAP } from '../constants'
import { BridgeOption, OverviewValuesType } from '../types'

const CHAIN_ARBITRUM = STAND !== Stand.dev ? arbitrumOne : arbitrumSepolia
const CHAIN_ETH = STAND !== Stand.dev ? mainnet : sepolia
const httpProviderArbitrum = VITE_HTTP_PROVIDER || 'https://arbitrum.drpc.org'

export const useBridgeForm = (
  isSell: boolean,
  firstInputValue: number,
  isInsufficentAmount: boolean
) => {
  const { address } = useAccount()
  const { data: walletClient } = useWalletClient()
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)

  const [debouncedFirstInputValue] = useDebounce(firstInputValue, 500)

  const [transactionFee, setTransactionFee] = useState(0n)
  const [isTransactionFeeLoading, setIsTransactionFeeLoading] = useState(false)

  const [isTransactionProcessing, setIsTransactionProcessing] = useState(false)

  const [buyBackReviewDialogData, setBuyBackReviewDialogData] =
    useState<Maybe<OverviewValuesType>>(null)

  const formattedGasFee = Number(
    (parseInt(String(transactionFee)) / 1e18).toFixed(6)
  )

  useEffect(() => {
    const data: OverviewValuesType = {
      networkFee: String(formattedGasFee),
      expectedOutput: String(firstInputValue)
    }

    setBuyBackReviewDialogData(data)
  }, [debouncedFirstInputValue, formattedGasFee, firstInputValue])

  useEffect(() => {
    setTransactionFee(0n)
  }, [isSell])

  const sender: BridgeOption =
    isSell ? BRIDGE_OPTIONS_MAP.ARBITRUM : BRIDGE_OPTIONS_MAP.ETH
  const receiver: BridgeOption =
    isSell ? BRIDGE_OPTIONS_MAP.ETH : BRIDGE_OPTIONS_MAP.ARBITRUM

  const ccipClient = CCIP.createClient()

  const publicClientArbitrum = createPublicClient({
    chain: CHAIN_ARBITRUM,
    transport: http(httpProviderArbitrum)
  })

  const publicClientETH = createPublicClient({
    chain: CHAIN_ETH,
    transport: http()
  })

  const handleGetTransferFee = async (amount: number) => {
    setIsTransactionFeeLoading(true)
    try {
      const formattedAmount = parseUnits(String(amount), 18)

      const fee = await ccipClient.getFee({
        client: isSell ? publicClientArbitrum : publicClientETH,
        routerAddress: sender.routerAddress,
        tokenAddress: sender.tokenAddress,
        amount: formattedAmount,
        destinationAccount: address as Web3Adress,
        destinationChainSelector: receiver.chainSelector
      })

      setTransactionFee(fee)
    } catch (e) {
      handleCatchAction(e)
    } finally {
      setIsTransactionFeeLoading(false)
    }
  }

  useEffect(() => {
    if (!address || isInsufficentAmount) return

    if (!debouncedFirstInputValue) {
      setTransactionFee(0n)
      return
    }

    handleGetTransferFee(debouncedFirstInputValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFirstInputValue, isSell])

  const handleSubmit = async () => {
    setIsTransactionProcessing(true)

    try {
      const formattedAmount = parseUnits(String(firstInputValue), 18)

      await ccipClient.approveRouter({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        client: walletClient as any,
        routerAddress: sender.routerAddress,
        tokenAddress: sender.tokenAddress,
        amount: formattedAmount,
        waitForReceipt: true
      })

      const { txHash } = await ccipClient.transferTokens({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        client: walletClient as any,
        routerAddress: sender.routerAddress,
        tokenAddress: sender.tokenAddress,
        amount: formattedAmount,
        destinationAccount: address as Web3Adress,
        destinationChainSelector: receiver.chainSelector
      })

      const buttonAction = async () => {
        await navigator.clipboard.writeText(txHash)

        window.open('https://ccip.chain.link/', '_blank')
      }

      notificationStateVar({
        type: 'success',
        isOpen: true,
        title: `Transaction successfully completed!`,
        description: `Hash was copied to clipboard. You can view it on Chainlink CCIP.`,
        buttonAction: () => buttonAction(),
        actionText: 'Chainlink CCIP',
        duration: 5000
      })

      setIsPreviewDialogOpen(false)
    } catch (e) {
      handleCatchAction(e)
    } finally {
      setIsTransactionProcessing(false)
    }
  }

  return {
    handleSubmit,
    transactionFee,
    isTransactionFeeLoading,
    isTransactionProcessing,
    buyBackReviewDialogData,
    formattedGasFee,
    isPreviewDialogOpen,
    setIsPreviewDialogOpen
  }
}
