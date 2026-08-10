import { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { DataTestIDs, PRICE_PATTERN, PRICE_REGEXP } from 'shared/constants'
import { selectedAssetVar } from 'shared/store/selected-asset'
import { oneVsOneCreateFormStateVar } from '../store/form'
import { FieldNames } from '../types'
import { OneVsOneFormAmountField } from './one-vs-one-form-amount-field'
import styles from '../mode-one-vs-one.module.scss'

export const OneVsOneBetPredictField: React.FC = () => {
  const selectedAsset = useReactiveVar(selectedAssetVar)

  const oneVsOneCreateFormState = useReactiveVar(oneVsOneCreateFormStateVar)

  const setPredictPrice = useCallback(
    (value: string) => {
      if (!PRICE_REGEXP.test(value)) return

      oneVsOneCreateFormStateVar({
        ...oneVsOneCreateFormState,
        [FieldNames.predictExactPrice]: value
      })
    },
    [oneVsOneCreateFormState]
  )

  return (
    <Flex
      direction='column'
      align={'center'}
      justify={'center'}
      p={'4'}
      className={styles.predictFieldWrapper}
      width={'100%'}
      gap='2'
    >
      <Flex
        width={'100%'}
        gap='2'
        direction='column'
        align={'center'}
        justify={'center'}
      >
        <Text
          size={{ initial: '3', sm: '1' }}
          weight={'regular'}
        >
          Where the&nbsp;
          <span className={styles.selectedAssetName}>
            {selectedAsset?.name.toUpperCase() || 'asset'}
          </span>
          &nbsp; price would go:
        </Text>

        <OneVsOneFormAmountField
          name={FieldNames.predictExactPrice}
          placeholder='Type price'
          minAmount={0}
          value={oneVsOneCreateFormState[FieldNames.predictExactPrice] ?? ''}
          setValue={setPredictPrice}
          dataTestID={DataTestIDs.inputOneVsOnePredictPrice}
          pattern={PRICE_PATTERN}
          inputMode='decimal'
          className={styles.amountField}
        />
      </Flex>
    </Flex>
  )
}
