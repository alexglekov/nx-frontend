/* eslint-disable max-statements */
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Form } from '@radix-ui/react-form'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useAvailableAssets } from 'features/balance-transactions/hooks/use-available-assets'
import { useBalanceWithdraw } from 'features/balance-transactions/hooks/use-balance-withdraw'
import {
  operationAmountVar,
  selectedPaymentAssetVar
} from 'features/balance-transactions/store/balance-flow-values.store'
import { BalanceOperationStatusType } from 'features/balance-transactions/types'
import { roundToFixedFloat } from 'features/balance-transactions/utils/round-to-fixed-float'
import { Web3Adress } from 'shared/types'
import { ControllableFormField } from 'shared/ui'
import { formatHugePrice } from 'shared/utils/format-huge-price'
import styles from '../../balance-transactions.module.scss'

interface Props {
  setDialogStep: (step: BalanceOperationStatusType) => void
}
export const BalanceTransactionDialogAddressStep: React.FC<Props> = ({
  setDialogStep
}) => {
  const selectedAsset = useReactiveVar(selectedPaymentAssetVar)
  const selectedAmount = useReactiveVar(operationAmountVar)

  const { availableAssets } = useAvailableAssets()

  const selectedAssetEntity = availableAssets.find(
    a => a.name === selectedAsset
  )

  const finalAmountInAsset = roundToFixedFloat(
    Number(selectedAmount || 0) / (selectedAssetEntity?.convertRate || 0)
  )

  const formattedFinalAmount =
    (Number(finalAmountInAsset) > 1000000 ?
      formatHugePrice(Number(finalAmountInAsset))
    : finalAmountInAsset) || '0'

  const { handleCreateCoinspaidWithdrawal } = useBalanceWithdraw()

  const [walletAddress, setWalletAddress] = useState('')

  const handleWalletAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWalletAddress(e.target.value)
  }

  const handleSubmitWithdraw = async () => {
    if (!selectedAssetEntity?.id) return

    try {
      await handleCreateCoinspaidWithdrawal(
        walletAddress as Web3Adress,
        Number(selectedAmount),
        selectedAssetEntity.id
      )

      setDialogStep('statusSuccess')
    } catch {
      setDialogStep('statusFail')
    }
  }

  const isButtonDisabled = !walletAddress

  return (
    <Form>
      <Flex
        direction={'column'}
        gap={'4'}
        width={'100%'}
        mt={'3'}
      >
        <Flex
          align={'center'}
          justify={'between'}
          width={'100%'}
        >
          <Text
            size={'5'}
            className='color-gray-light'
          >
            Final amount:
          </Text>

          <Flex
            align={'center'}
            gap={'2'}
          >
            <Text
              size={'7'}
              className='color-white'
              weight={'bold'}
            >
              {formattedFinalAmount}
            </Text>

            <Text
              size={'7'}
              className='color-gray-light'
            >
              {selectedAsset}
            </Text>
          </Flex>
        </Flex>

        <ControllableFormField
          name='walletAddress'
          type='text'
          value={walletAddress}
          handleFieldChange={handleWalletAddressChange}
          className={styles.walletAddressInputField}
          placeholder='Enter wallet address'
        />

        <Button
          className={styles.withdrawButton}
          onClick={handleSubmitWithdraw}
          disabled={isButtonDisabled}
          type='button'
        >
          <Text
            className='color-white'
            weight={'bold'}
            size={'2'}
          >
            WITHDRAW
          </Text>
        </Button>
      </Flex>
    </Form>
  )
}
