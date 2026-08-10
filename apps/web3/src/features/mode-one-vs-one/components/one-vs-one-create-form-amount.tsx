import React, { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { DataTestIDs, MAX_PREDICT_AMOUNT } from 'shared/constants'
import { balanceVar } from 'shared/store/balance-store'
import { AmountFieldErrorMessage } from 'shared/ui/amount-field/types'
import { TokenSwitcher } from 'shared/ui/token-switcher/token-switcher'
import { ONE_VS_ONE_MIN_AMOUNT_VALUE } from '../constants'
import { oneVsOneCreateFormStateVar } from '../store/form'
import { oneVsOneIsXyroTokenSelectedVar } from '../store/selected-token'
import { FieldNames } from '../types'
import { OneVsOneFormAmountField } from './one-vs-one-form-amount-field'
import styles from '../mode-one-vs-one.module.scss'

const customErrorMessages: AmountFieldErrorMessage[] = [
  {
    match: 'rangeOverflow',
    title: 'Insufficient balance',
    testLocator: 'validationMessageInsufficientBalance'
  }
]

export const OneVsOneFormCreateAmount: React.FC = () => {
  const oneVsOneCreateFormState = useReactiveVar(oneVsOneCreateFormStateVar)
  const oneVsOneIsXyroTokenSelected = useReactiveVar(
    oneVsOneIsXyroTokenSelectedVar
  )
  const balance = useReactiveVar(balanceVar)

  const setPredictAmount = useCallback(
    (value: string) => {
      oneVsOneCreateFormStateVar({
        ...oneVsOneCreateFormState,
        [FieldNames.betAmount]: value
      })
    },
    [oneVsOneCreateFormState]
  )

  const errorMessages =
    Number(oneVsOneCreateFormState[FieldNames.betAmount]) < MAX_PREDICT_AMOUNT ?
      customErrorMessages
    : []

  const selectedTokenName = oneVsOneIsXyroTokenSelected ? 'XYRO' : 'USDT'

  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'1'}
    >
      <Text className={styles.fieldTitleNew}>
        Your amount{' '}
        <span className={styles.fieldTitleSecondary}>
          ({ONE_VS_ONE_MIN_AMOUNT_VALUE} to 100k {selectedTokenName})
        </span>
        :
      </Text>
      <Flex>
        <Flex
          align={'center'}
          gap={'3'}
          width={'100%'}
        >
          <OneVsOneFormAmountField
            customErrorMessages={errorMessages}
            minAmount={ONE_VS_ONE_MIN_AMOUNT_VALUE}
            maxAmount={balance.usdtBalance + balance.treasuryDeposit}
            name={FieldNames.betAmount}
            value={oneVsOneCreateFormState[FieldNames.betAmount] ?? ''}
            setValue={setPredictAmount}
            dataTestID={DataTestIDs.inputOneVsOnePredictAmount}
            onlyInteger
            hasIcon
          />

          <TokenSwitcher
            checked={oneVsOneIsXyroTokenSelected}
            onChange={oneVsOneIsXyroTokenSelectedVar}
          />
        </Flex>

        {/* TODO: Uncomment this logic when API will be ready */}
        {/* <Flex
          align={'end'}
          direction={'column'}
          className={styles.payoutWrapper}
          gap={'2'}
        >
          <Flex
            gap={'1'}
            align={'end'}
          >
            <Text
              className={styles.fieldTitleSecondary}
              weight={'medium'}
            >
              Payout
            </Text>
            <Flex className={styles.payoutContainer}>
              <Text
                size={'1'}
                weight={'medium'}
              >
                x2
              </Text>
            </Flex>
          </Flex>
          <Flex
            align={'center'}
            gap={'1'}
          >
            <TetherAssetSimpleIcon
              height={'2.5rem'}
              width='2.5rem'
            />
            <Text
              size={'1'}
              className='color-white'
              weight={'bold'}
            >
              -
            </Text>
          </Flex>
        </Flex> */}
      </Flex>
    </Flex>
  )
}
