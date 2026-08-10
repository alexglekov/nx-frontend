import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import * as RadixForm from '@radix-ui/react-form'
import { Box, Flex, Text } from '@radix-ui/themes'
import './date-picker.scss'
import styles from './date-picker.module.scss'

const MAX_TIME = new Date(new Date().setHours(23, 59))
const MIN_TIME = new Date()

interface Props {
  name: string
  isLabelShown?: boolean
}
export const TimePicker: React.FC<Props> = ({ name, isLabelShown = true }) => {
  const [time, setTime] = useState<Date>()

  const handleChange = (time: Date) => {
    setTime(time)
  }

  return (
    <RadixForm.Field
      name={name}
      className={styles.timePickerField}
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
                TIME
              </Text>
            </Flex>
          </RadixForm.Label>
        ) : null}

        <RadixForm.Message match='valueMissing'>
          Please enter time
        </RadixForm.Message>
      </Flex>

      <ReactDatePicker
        placeholderText='Time'
        className={styles.timePicker}
        name={name}
        selected={time}
        onChange={handleChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption='Time'
        dateFormat='HH:mm'
        timeFormat='HH:mm'
        showPopperArrow={false}
        minTime={MIN_TIME}
        maxTime={MAX_TIME}
      />
    </RadixForm.Field>
  )
}
