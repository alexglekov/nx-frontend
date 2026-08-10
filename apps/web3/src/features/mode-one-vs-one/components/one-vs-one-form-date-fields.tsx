import React, { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { SelectionButtons } from 'shared/ui'
import { AVAILABLE_SELECTION_TIMEFRAMES } from '../constants'
import { oneVsOneCreateFormStateVar } from '../store/form'
import { FieldNames } from '../types'
import styles from '../mode-one-vs-one.module.scss'

const timeframeSelectionButtonsDataTestIDs = new Array(
  AVAILABLE_SELECTION_TIMEFRAMES.length
).fill(DataTestIDs.buttonPredictTimeframe)

export const OneVsOneFormDateFields: React.FC = () => {
  // const dateSelectorValue = useReactiveVar(dateSelectorVar)

  // const handleSelect = (value: number) => {
  //   dateSelectorVar(value)
  // }

  const oneVsOneCreateFormState = useReactiveVar(oneVsOneCreateFormStateVar)

  const handleChange = useCallback(
    (value: string | number) => {
      oneVsOneCreateFormStateVar({
        ...oneVsOneCreateFormState,
        [FieldNames.predictTimeframe]: Number(value)
      })
    },
    [oneVsOneCreateFormState]
  )

  return (
    <Flex
      width={'100%'}
      gap={'2'}
      direction={'column'}
    >
      <Text className={styles.fieldTitleNew}>Select game duration:</Text>

      {/* TODO: Decided to show only timeframe buttons until new datepicker will be implemented */}

      {/* <Flex
        width={'100%'}
        gap={'2'}
      >
        <DatePicker
          name={FieldNames.betDate}
          isLabelShown={false}
        />
        <TimePicker
          name={FieldNames.betTime}
          isLabelShown={false}
        />
      </Flex> */}

      {/* NOTE: fast implementation to fix datepickers
       * TODO: improve datepicker and fast timeframe field to be more consistent
       * task: FE-366: https://linear.app/xyro/issue/FE-366/1vs1-obnovit-dejtpiker
       *
       * UPDATE: Decided to show only timeframe buttons until new datepicker will be implemented
       */}
      <SelectionButtons
        name={FieldNames.predictTimeframe}
        className={styles.timeframeSelector}
        options={AVAILABLE_SELECTION_TIMEFRAMES}
        defaultFieldValue={null}
        onChange={handleChange}
        appearance='radix'
        color='gray'
        size='3'
        dataTestIds={timeframeSelectionButtonsDataTestIDs}
      />
    </Flex>
  )
}
