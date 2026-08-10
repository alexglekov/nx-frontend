import React from 'react'
import { Flex } from '@radix-ui/themes'
import {
  DataTestIDs,
  MAX_PREDICT_AMOUNT,
  MIN_BET_AMOUNT
} from 'shared/constants'
import { ControllableAmountField, TetherToken } from 'shared/ui'
import { AmountFieldErrorMessage } from 'shared/ui/amount-field/types'
import { AddBetFieldNames as FieldNames } from '../../types'
import styles from '../../mode-setups.module.scss'

const customErrorMessages: AmountFieldErrorMessage[] = [
  {
    match: 'rangeOverflow',
    title: 'Insufficient balance',
    testLocator: 'validationMessageInsufficientBalance'
  }
]

interface Props {
  amount: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
  maxAmount: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const SetupsBetAmountField: React.FC<Props> = ({
  amount,
  setAmount,
  maxAmount,
  onChange
}) => {
  const errorMessages =
    Number(amount) < MAX_PREDICT_AMOUNT ? customErrorMessages : []

  return (
    <Flex
      width={'100%'}
      position={'relative'}
    >
      <ControllableAmountField
        value={amount}
        label='or type it:'
        setValue={setAmount}
        className={styles.amountField}
        onChange={onChange}
        name={FieldNames.betAmount}
        disabled={false}
        minAmount={MIN_BET_AMOUNT}
        max={maxAmount}
        onlyInteger
        required={true}
        dataTestID={DataTestIDs.inputSetupsBidAmount}
        customErrorMessages={errorMessages}
      />

      <Flex
        position={'absolute'}
        className={styles.amountFieldXyroIconLeft}
      >
        <TetherToken
          size='3rem'
          color='yellow'
        />
      </Flex>
    </Flex>
  )
}
