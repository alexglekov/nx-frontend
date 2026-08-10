import { FormEvent, useMemo, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Maybe } from '__generated__/graphql'
import { useUsdc } from 'contracts/usdc'
import { useXyroToken } from 'contracts/xyro-token/use-xyro-token'
import { useWallet } from 'shared/hooks/use-wallet'
import { balanceVar } from 'shared/store/balance-store'
import { notificationStateVar } from 'shared/store/notification'
import { getFormValues } from 'shared/utils/get-form-values'
import { useDebouncedCallback } from 'use-debounce'
import { handleCatchAction } from '../../../shared/utils/handle-catch-action'
import { ROUTER_ADDRESS } from '../constants'
import { xyroTokenPriceVar } from '../store/token-price'
import { OverviewValuesType } from '../types'
import { getExpectedOutput } from '../utils/get-expected-output'
import { getMinReceived } from '../utils/get-min-received'
import { getNetworkFee } from '../utils/get-network-fee'
import { useLoadTokenPrice } from './use-load-token-price'
import { useSwap } from './use-swap'

/* eslint-disable-next-line max-statements */
export const useSwapForm = (amount: number, isSell: boolean) => {
  const [loading, setLoading] = useState(false)
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false)
  const [reviewSwapData, setReviewSwapData] =
    useState<Maybe<OverviewValuesType>>(null)

  const balance = useReactiveVar(balanceVar)
  const xyroTokenPrice = useReactiveVar(xyroTokenPriceVar)

  const { isReady } = useWallet()

  const { price, sqrtPriceX96 } = xyroTokenPrice

  const { loadTokenPrice } = useLoadTokenPrice()
  const usdc = useUsdc()
  const { approveAmount } = useXyroToken()
  const { swap } = useSwap()

  const tokenBalance = isSell ? balance.usdtBalance : balance.xyroBalance

  const buttonDisabled =
    isReady && (tokenBalance < amount || amount === 0 || loading)

  const buttonText = useMemo(() => {
    if (amount === 0) {
      return 'Enter amount'
    }

    if (amount > tokenBalance) {
      return 'Insufficient Balance'
    }

    return 'preview swap'
  }, [amount, tokenBalance])

  const onChangeInput = useDebouncedCallback(() => {
    loadTokenPrice()
  }, 500)

  /* eslint-disable-next-line max-statements */
  const handleConfirm = async (amount: string) => {
    if (!usdc) return

    setLoading(true)

    try {
      if (isSell) {
        const tx = await usdc.approvePure(Number(amount), ROUTER_ADDRESS)

        if (!tx) {
          setLoading(false)

          return
        }
      } else {
        const tx = await approveAmount({
          amount: Number(amount),
          spender: ROUTER_ADDRESS
        })

        if (!tx) {
          setLoading(false)

          return
        }
      }
    } catch (error) {
      handleCatchAction(error)
      setLoading(false)
      return
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const tx = await swap({
        amount,
        sqrtPriceX96,
        price: String(price),
        isSell
      })

      if (!tx) {
        return
      }

      notificateOnSuccess()
      setIsOpenConfirmDialog(false)
    } catch (err) {
      handleCatchAction(err)
    } finally {
      setLoading(false)
    }
  }

  /* eslint-disable-next-line max-statements */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = getFormValues<
      { Sell: string; Buy: string },
      { Sell: string; Buy: string }
    >(event.target as HTMLFormElement) ?? { Buy: 0, Sell: 0 }

    setReviewSwapData({
      minReceived: getMinReceived(data, isSell, price),
      expectedOutput: getExpectedOutput(data, isSell, price),
      networkFee: getNetworkFee(data, isSell)
    })

    setIsOpenConfirmDialog(true)
  }

  const hasError = amount > tokenBalance

  return {
    balance,
    buttonDisabled,
    buttonText,
    handleConfirm,
    handleSubmit,
    hasError,
    onChangeInput,
    isOpenConfirmDialog,
    setIsOpenConfirmDialog,
    reviewSwapData,
    loading
  }
}

export const notificateOnSuccess = () =>
  notificationStateVar({
    isOpen: true,
    description: 'Swap success, check your wallet balance',
    title: 'Swap success',
    type: 'success'
  })
