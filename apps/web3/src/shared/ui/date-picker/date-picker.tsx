import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import * as RadixForm from '@radix-ui/react-form'
import { Box, Flex, Text } from '@radix-ui/themes'
import { MAX_DATE } from 'shared/constants'
import './date-picker.scss'
import styles from './date-picker.module.scss'

const DATE_INTERVALS = [
  {
    start: new Date(),
    end: MAX_DATE
  }
]

interface Props {
  name: string
  isLabelShown?: boolean
}
export const DatePicker: React.FC<Props> = ({ name, isLabelShown = true }) => {
  const [date, setDate] = useState<Date | null>(null)

  const handleChange = (date: Date) => {
    setDate(date)
  }

  return (
    <RadixForm.Field
      name={name}
      className={styles.datePickerField}
    >
      <Flex>
        {isLabelShown ? (
          <RadixForm.Label>
            <Flex
              align={'center'}
              gap={'1'}
              mb={'2'}
            >
              <Box className={styles.whiteBox} />
              <Text
                weight={'bold'}
                className={styles.assetName}
              >
                DATE
              </Text>
            </Flex>
          </RadixForm.Label>
        ) : null}

        <RadixForm.Message match='valueMissing'>
          Please enter date
        </RadixForm.Message>
      </Flex>

      <ReactDatePicker
        className={styles.datePicker}
        onChange={handleChange}
        name={name}
        selected={date}
        includeDateIntervals={DATE_INTERVALS}
        showPopperArrow={false}
        showPreviousMonths={false}
        dateFormat={'yyyy-MM-dd'}
        placeholderText='Date'
      />
    </RadixForm.Field>
  )
}
