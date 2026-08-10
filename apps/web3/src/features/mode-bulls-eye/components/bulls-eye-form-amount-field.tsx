import React, { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { DataTestIDs, PRICE_REGEXP } from 'shared/constants'
import { ControllableAmountField } from 'shared/ui'
import { MIN_BULLS_EYE_INPUT_VALUE } from '../constants'
import { bullsEyeCurrentContractAddressVar } from '../store/bulls-eye-contract-addresses.store'
import { FieldNames } from '../types'
import styles from '../mode-bulls-eye.module.scss'

interface Props {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}
export const BullsEyeFormAmountField: React.FC<Props> = ({
  value,
  setValue
}) => {
  const currentBullsEyeSmartContract = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )

  const assetId = currentBullsEyeSmartContract?.meta?.asset || 'BTC'

  const handleChangeValue = useCallback(
    (value: string) => {
      if (PRICE_REGEXP && !PRICE_REGEXP.test(value)) return
      setValue(value)
    },
    [setValue]
  )

  return (
    <Flex
      direction={'column'}
      gap={'1'}
      width={'100%'}
      pt={'4'}
    >
      <Text
        size={'1'}
        weight={'medium'}
        color='gray'
      >
        Guess the <span className={styles.betAssetText}>{assetId}</span> price:
      </Text>

      <ControllableAmountField
        value={value}
        mt={'1'}
        setValue={handleChangeValue}
        minAmount={MIN_BULLS_EYE_INPUT_VALUE} // NOTE: Think about workaround
        name={FieldNames.price}
        placeholder='Type price'
        className={styles.betAmountField}
        dataTestID={DataTestIDs.inputBullsEyePredict}
      />
    </Flex>
  )
}
