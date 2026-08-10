/* eslint-disable max-lines */
import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Form } from '@radix-ui/react-form'
import { Button, Flex, Separator, Text } from '@radix-ui/themes'
import { useAvailableAssets } from 'features/balance-transactions/hooks/use-available-assets'
import { useBalanceDeposit } from 'features/balance-transactions/hooks/use-balance-deposit'
import {
  operationAmountVar,
  selectedPaymentAssetVar
} from 'features/balance-transactions/store/balance-flow-values.store'
import { BalanceOperationStatusType } from 'features/balance-transactions/types'
import { useBalance } from 'shared/hooks/use-balance'
import { ControllableAmountField, XyroLoading } from 'shared/ui'
import { formatHugePrice } from 'shared/utils/format-huge-price'
import { BalanceTransactionAssetSelect } from '../balance-transactions-asset-select'
import styles from '../../balance-transactions.module.scss'

interface Props {
  isDeposit?: boolean
  setDialogStep: (step: BalanceOperationStatusType) => void
}
// eslint-disable-next-line max-statements, complexity
export const BalanceTransactionsDialogAmountStep: React.FC<Props> = ({
  isDeposit,
  setDialogStep
}) => {
  const { handleCreateCoinspaidDeposit, loading } = useBalanceDeposit()
  const { availableAssets } = useAvailableAssets()
  const { balance } = useBalance()

  const amount = useReactiveVar(operationAmountVar)
  const selectedAsset = useReactiveVar(selectedPaymentAssetVar)

  const selectedAssetEntity = availableAssets.find(
    a => a.name === selectedAsset
  )

  const finalAmountInAsset =
    Number(amount || 0) / (selectedAssetEntity?.convertRate || 0)

  const formattedFinalAmount =
    (Number(finalAmountInAsset) > 1000000 ?
      formatHugePrice(Number(finalAmountInAsset))
    : finalAmountInAsset < 1 ? finalAmountInAsset.toFixed(6)
    : finalAmountInAsset) || '0'

  const finalAmountString =
    selectedAsset ? `${formattedFinalAmount} ${selectedAsset}` : '---'

  const handleNextStep = async () => {
    if (!selectedAssetEntity?.id) return

    try {
      if (isDeposit) {
        const depositAddress = await handleCreateCoinspaidDeposit(
          selectedAssetEntity?.id,
          finalAmountInAsset
        )

        if (!depositAddress) {
          setDialogStep('statusFail')

          return
        }
      }

      setDialogStep('payment')
    } catch {
      setDialogStep('statusFail')
    }
  }

  const assetOperationMinAmount =
    isDeposit ?
      selectedAssetEntity?.minDeposit || 0
    : selectedAssetEntity?.minWithdrawal || 0

  const isButtonDisabled =
    isDeposit ?
      Boolean(
        !amount || Number(amount) < assetOperationMinAmount || !selectedAsset
      )
    : Boolean(
        !amount ||
          Number(amount) > balance ||
          !selectedAsset ||
          Number(amount) < assetOperationMinAmount
      )

  const maxInputValue = isDeposit ? 10e50 : balance || 10e50

  return (
    <Form>
      <Flex
        direction={'column'}
        gap={'5'}
      >
        <BalanceTransactionAssetSelect />

        <Flex
          direction={'column'}
          gap={'2'}
        >
          <ControllableAmountField
            value={amount}
            setValue={operationAmountVar}
            minAmount={assetOperationMinAmount}
            max={maxInputValue}
            maxLength={7}
            placeholder='Enter amount in USD'
            name='amount'
          />

          <Flex
            align={'center'}
            justify={'between'}
          >
            <Text size={'2'}>Min amount:</Text>

            <Text
              size={'2'}
              weight={'bold'}
            >
              {assetOperationMinAmount.toFixed(2)} USD
            </Text>
          </Flex>
        </Flex>

        <Flex
          direction={'column'}
          gap={'4'}
        >
          {/* TODO: add bonus logic when API is ready */}
          {/* {isDeposit && (
            <Flex
              align={'center'}
              justify={'between'}
            >
              <Text
                size='2'
                weight='medium'
                className='color-gray-light'
              >
                Bonus on your wallet:
              </Text>

              <Text
                size='2'
                weight='medium'
                className='color-gray-light'
              >
                -- USD
              </Text>
            </Flex>
          )} */}

          {/* TODO: add bonus logic when API is ready */}
          {/* <Flex
            align={'center'}
            justify={'between'}
          >
            <Text
              size='2'
              weight='medium'
              className='color-gray-light'
            >
              Processing fee: --
            </Text>

            <Text
              size='2'
              weight='medium'
              className='color-gray-light'
            >
              Will be charged: -- USD
            </Text>
          </Flex> */}

          <Separator
            size={'4'}
            mt={'4'}
          />
        </Flex>

        <Flex
          align={'center'}
          justify={'between'}
        >
          <Text
            size='4'
            weight='bold'
            className='color-gray-light'
          >
            Final amount:
          </Text>

          <Text
            size='4'
            weight='bold'
            className='color-gray-light'
          >
            {finalAmountString}
          </Text>
        </Flex>

        <Button
          className={styles.depositCTAButton}
          type='button'
          disabled={isButtonDisabled}
          onClick={handleNextStep}
        >
          <XyroLoading loading={loading}>
            <Text
              className='color-white'
              size={'2'}
              weight={'bold'}
            >
              NEXT
            </Text>
          </XyroLoading>
        </Button>

        <Text
          size={'2'}
          weight={'medium'}
          className='color-gray-light'
        >
          Top up your XYRO 2.0 account in seconds and start enjoying the
          excitement of iGaming with dozens of games available immediately!
        </Text>
      </Flex>
    </Form>
  )
}
