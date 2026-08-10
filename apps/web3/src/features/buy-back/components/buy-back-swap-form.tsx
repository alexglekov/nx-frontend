import { useReactiveVar } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { SwapTetherToken, SwapXyroToken, SwapArrows } from 'shared/icons'
import { XyroLoading } from 'shared/ui'
import { ButtonWithWalletConnection } from 'shared/ui/with-wallet/with-wallet-connection'
import { REVIEW_SWAP_DATA_LIST, TOKEN_SWAP_ASSETS } from '../constants'
import { useBuyBackCardInputs } from '../hooks/use-buy-back-card-inputs'
import { useSwapForm } from '../hooks/use-swap-form'
import { xyroTokenPriceVar } from '../store/token-price'
import { BuyBackReviewDialog } from './buy-back-review-dialog'
import { BuyBackTokenInput } from './buy-back-token-input'
import styles from '../buy-back.module.scss'

/* eslint-disable-next-line complexity, max-statements */
export const SwapForm = () => {
  const xyroTokenPrice = useReactiveVar(xyroTokenPriceVar)

  const { price } = xyroTokenPrice

  const {
    firstInputValue,
    secondInputValue,
    setFirstInputValue,
    setSecondInputValue,
    setFirstInputFocused,
    setSecondInputFocused,
    isSell,
    setIsSell
  } = useBuyBackCardInputs(price)

  const {
    balance,
    buttonDisabled,
    buttonText,
    hasError,
    loading,
    onChangeInput,
    handleSubmit,
    handleConfirm,
    isOpenConfirmDialog,
    setIsOpenConfirmDialog,
    reviewSwapData
  } = useSwapForm(Number(firstInputValue), isSell)

  const swapButtonClassnames = cn(styles.swapButton, {
    [styles.swapButtonDisabled]: buttonDisabled
  })

  const sellAsset = isSell ? TOKEN_SWAP_ASSETS.USDT : TOKEN_SWAP_ASSETS.XYRO

  const buyAsset = isSell ? TOKEN_SWAP_ASSETS.XYRO : TOKEN_SWAP_ASSETS.USDT

  const sellAssetItem = {
    ...sellAsset,
    amount: firstInputValue
  }

  const buyAssetItem = {
    ...buyAsset,
    amount: secondInputValue
  }

  const formattedFee = (Number(firstInputValue) * 0.003).toFixed(2)

  const firstInputBalanceDataTestId =
    isSell ? balanceTradeInputUSDT : balanceTradeInputXYRO
  const firstInputDataTestId = isSell ? inputTradeUSDT : inputTradeXYRO
  const secondInputBalanceDataTestId =
    isSell ? balanceTradeInputXYRO : balanceTradeInputUSDT
  const secondInputDataTestId = isSell ? inputTradeXYRO : inputTradeUSDT

  return (
    <RadixForm.Root onSubmit={handleSubmit}>
      <Flex
        direction={'column'}
        gap={'1'}
        position={'relative'}
      >
        <BuyBackTokenInput
          setValue={setFirstInputValue}
          value={firstInputValue}
          balance={isSell ? balance.usdtBalance : balance.xyroBalance}
          name={'Sell'}
          tokenIcon={isSell ? <SwapTetherToken /> : <SwapXyroToken />}
          tokenName={isSell ? 'USDT' : 'XYRO'}
          handleChange={onChangeInput}
          setFocused={setFirstInputFocused}
          hasError={hasError}
          page='Trade'
          balanceDataTestId={firstInputBalanceDataTestId}
          inputDataTestId={firstInputDataTestId}
        />

        <Flex
          className={styles.swapArrows}
          onClick={() => setIsSell(!isSell)}
          data-testid={buttonChangeAssetsTrade}
        >
          <SwapArrows />
        </Flex>

        <BuyBackTokenInput
          balance={isSell ? balance.xyroBalance : balance.usdtBalance}
          setValue={setSecondInputValue}
          value={secondInputValue}
          name={'Buy'}
          tokenIcon={isSell ? <SwapXyroToken /> : <SwapTetherToken />}
          tokenName={isSell ? 'XYRO' : 'USDT'}
          setFocused={setSecondInputFocused}
          balanceDataTestId={secondInputBalanceDataTestId}
          inputDataTestId={secondInputDataTestId}
          page='Trade'
          isBuy
        />
      </Flex>

      <Flex
        justify={'between'}
        mt={'2'}
        px={'5'}
        width={'100%'}
        className={styles.tradeStatContainer}
        gap={'2'}
      >
        <Flex gap={'1'}>
          <Text size={'2'}>Fee (0.3%)</Text>
        </Flex>
        <Text size={'2'}>USDT {formattedFee}</Text>
      </Flex>

      <ButtonWithWalletConnection
        type='submit'
        size={'4'}
        className={swapButtonClassnames}
        mt={'5'}
        disabled={buttonDisabled}
        variant={loading ? 'outline' : 'solid'}
        data-testid={buttonSubmitTradeForm}
      >
        <XyroLoading loading={loading}>{buttonText.toUpperCase()}</XyroLoading>
      </ButtonWithWalletConnection>

      <BuyBackReviewDialog
        isOpen={isOpenConfirmDialog}
        setIsOpen={setIsOpenConfirmDialog}
        handleSubmit={() => handleConfirm(firstInputValue)}
        sellAsset={sellAssetItem}
        buyAsset={buyAssetItem}
        overviewValues={reviewSwapData}
        overviewItems={REVIEW_SWAP_DATA_LIST}
        loading={loading}
      />
    </RadixForm.Root>
  )
}

const {
  balanceTradeInputXYRO,
  balanceTradeInputUSDT,
  buttonChangeAssetsTrade,
  buttonSubmitTradeForm,
  inputTradeUSDT,
  inputTradeXYRO
} = DataTestIDs
