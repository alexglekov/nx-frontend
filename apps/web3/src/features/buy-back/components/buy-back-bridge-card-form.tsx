/* eslint-disable max-lines */
import React, { useCallback } from 'react'
import * as RadixForm from '@radix-ui/react-form'
import { Button, Flex, Text } from '@radix-ui/themes'
import { STAND } from 'app/constants'
import { Stand } from 'app/types'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { useWallet } from 'shared/hooks/use-wallet'
import { ArbitrumRoundedIcon, EthAssetIcon, SwapArrows } from 'shared/icons'
import { arbitrum, arbitrumSepolia, sepolia, mainnet } from 'viem/chains'
import { useAccount, useSwitchChain } from 'wagmi'
import { REVIEW_BRIDGE_DATA_LIST, TOKEN_BRIDGE_ASSETS } from '../constants'
import { useBridgeForm } from '../hooks/use-bridge-form'
import { useBridgeXyroTokenBalance } from '../hooks/use-bridge-xyro-token-balance'
import { useBuyBackCardInputs } from '../hooks/use-buy-back-card-inputs'
import { BuyBackReviewDialog } from './buy-back-review-dialog'
import { BuyBackTokenInput } from './buy-back-token-input'
import styles from '../buy-back.module.scss'

const SELL_CHAIN = STAND !== Stand.dev ? arbitrum : arbitrumSepolia
const BUY_CHAIN = STAND !== Stand.dev ? mainnet : sepolia

// eslint-disable-next-line max-statements, complexity
export const BuyBackBridgeCardForm: React.FC = () => {
  const { address, chainId } = useAccount()
  const { isConnected, handlePrepareWallet } = useWallet()
  const { switchChain } = useSwitchChain()

  const {
    arbitrumTokenBalance,
    ethereumTokenBalance,
    arbitrumBalanceLoading,
    ethBalanceLoading
  } = useBridgeXyroTokenBalance()

  const {
    firstInputValue,
    isSell,
    secondInputValue,
    setFirstInputValue,
    setIsSell,
    setSecondInputValue
  } = useBuyBackCardInputs()

  const tokenBalance = isSell ? arbitrumTokenBalance : ethereumTokenBalance

  const isInsufficentAmount = Number(firstInputValue) > tokenBalance

  const {
    handleSubmit,
    formattedGasFee,
    isTransactionProcessing,
    isTransactionFeeLoading,
    buyBackReviewDialogData,
    isPreviewDialogOpen,
    setIsPreviewDialogOpen
  } = useBridgeForm(isSell, Number(firstInputValue), isInsufficentAmount)

  const swapButtonClassnames = cn(styles.swapButton, {
    [styles.swapButtonDisabled]: false
  })

  // eslint-disable-next-line max-statements
  const getCTAButtonObject = useCallback(() => {
    if (!isConnected) {
      return {
        text: 'CONNECT WALLET',
        handleAction: handlePrepareWallet,
        disabled: false
      }
    }

    if (isSell && chainId !== SELL_CHAIN.id) {
      return {
        text: 'SWITCH CHAIN',
        handleAction: () => switchChain({ chainId: SELL_CHAIN.id }),
        disabled: false
      }
    }

    if (!isSell && chainId !== BUY_CHAIN.id) {
      return {
        text: 'SWITCH CHAIN',
        handleAction: () => switchChain({ chainId: BUY_CHAIN.id }),
        disabled: false
      }
    }

    if (!firstInputValue) {
      return {
        text: 'ENTER AMOUNT',
        handleAction: () => null,
        disabled: true
      }
    }

    if (Number(firstInputValue) > tokenBalance) {
      return {
        text: 'INSUFFICENT BALANCE',
        handleAction: () => null,
        disabled: true
      }
    }

    // TODO: Add additional condition for balances
    return {
      text: 'PREVIEW SWAP',
      handleAction: () => setIsPreviewDialogOpen(true),
      disabled: false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    firstInputValue,
    isConnected,
    handlePrepareWallet,
    chainId,
    tokenBalance,
    isSell
  ])

  const CTAButtonObject = getCTAButtonObject()

  const sellAsset =
    isSell ? TOKEN_BRIDGE_ASSETS.ARBITRUM : TOKEN_BRIDGE_ASSETS.ETH
  const buyAsset =
    isSell ? TOKEN_BRIDGE_ASSETS.ETH : TOKEN_BRIDGE_ASSETS.ARBITRUM

  const sellBalance = isSell ? arbitrumTokenBalance : ethereumTokenBalance
  const buyBalance = isSell ? ethereumTokenBalance : arbitrumTokenBalance

  const sellBalanceLoading = isSell ? arbitrumBalanceLoading : ethBalanceLoading
  const buyBalanceLoading = isSell ? ethBalanceLoading : arbitrumBalanceLoading

  const sellAssetItem = {
    ...sellAsset,
    amount: firstInputValue
  }

  const buyAssetItem = {
    ...buyAsset,
    amount: secondInputValue
  }

  const gasFeeText =
    isTransactionFeeLoading ? 'Loading...' : formattedGasFee || '--'

  return (
    <RadixForm.Root onSubmit={handleSubmit}>
      <Flex
        direction={'column'}
        gap={'1'}
        position={'relative'}
      >
        <BuyBackTokenInput
          isBalanceLoading={sellBalanceLoading}
          setValue={setFirstInputValue}
          balance={sellBalance}
          name={'Sell'}
          value={firstInputValue}
          page='Bridge'
          tokenIcon={
            isSell ?
              <ArbitrumRoundedIcon />
            : <EthAssetIcon
                width={'4rem'}
                height={'4rem'}
              />
          }
          tokenName={isSell ? 'Arbitrum' : 'Ethereum'}
          balanceDataTestId={
            isSell ? balanceBridgeInputArbitrum : balanceBridgeInputEthereum
          }
          inputDataTestId={isSell ? inputBridgeArbitrum : inputBridgeEthereum}
          hasError={isInsufficentAmount}
        />

        <Flex
          className={styles.swapArrows}
          onClick={() => setIsSell(!isSell)}
          data-testid={buttonChangeAssetsBridge}
        >
          <SwapArrows />
        </Flex>

        <BuyBackTokenInput
          isBalanceLoading={buyBalanceLoading}
          balance={buyBalance}
          setValue={setSecondInputValue}
          name={'Buy'}
          value={secondInputValue}
          page='Bridge'
          balanceDataTestId={
            isSell ? balanceBridgeInputEthereum : balanceBridgeInputArbitrum
          }
          inputDataTestId={isSell ? inputBridgeArbitrum : inputBridgeEthereum}
          tokenIcon={
            isSell ?
              <EthAssetIcon
                width={'4rem'}
                height={'4rem'}
              />
            : <ArbitrumRoundedIcon />
          }
          isBuy
          tokenName={isSell ? 'Ethereum' : 'Arbitrum'}
        />
      </Flex>

      <Flex
        justify={'between'}
        gap={'1'}
        mt={'1'}
      >
        {Boolean(address) && (
          <Flex
            justify={'between'}
            mt={'2'}
            px={'5'}
            width={'100%'}
            className={styles.tradeStatContainer}
            gap={'2'}
          >
            <Text size={'1'}>Gas</Text>
            <Text size={'1'}>ETH: {gasFeeText}</Text>
          </Flex>
        )}
      </Flex>

      <Button
        size={'4'}
        type='button'
        className={swapButtonClassnames}
        mt={'5'}
        disabled={CTAButtonObject.disabled}
        data-testid={buttonSubmitBridgeForm}
        onClick={CTAButtonObject.handleAction}
      >
        <Text
          size={'2'}
          weight={'bold'}
        >
          {CTAButtonObject.text}
        </Text>
      </Button>

      <BuyBackReviewDialog
        isOpen={isPreviewDialogOpen}
        setIsOpen={setIsPreviewDialogOpen}
        sellAsset={sellAssetItem}
        buyAsset={buyAssetItem}
        handleSubmit={handleSubmit}
        loading={isTransactionProcessing}
        overviewItems={REVIEW_BRIDGE_DATA_LIST}
        overviewValues={buyBackReviewDialogData}
      />
    </RadixForm.Root>
  )
}

const {
  balanceBridgeInputArbitrum,
  balanceBridgeInputEthereum,
  buttonChangeAssetsBridge,
  buttonSubmitBridgeForm,
  inputBridgeArbitrum,
  inputBridgeEthereum
} = DataTestIDs
