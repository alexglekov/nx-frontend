import { Button, Flex, RadioGroup, Text, TextArea } from '@radix-ui/themes'
import { DELETE_ACCOUNT_REASON_OPTIONS } from 'features/user-settings/constants'
import React from 'react'
import styles from '../user-settings.module.scss'

const CONFIRM_DELETION_STEP = 2

interface Props {
  handleChoosenReasonChange: (value: string) => void
  handleOpenChange: (isOpen: boolean) => void
  choosenReason: string
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export const DeleteAccountModalFillInfo: React.FC<Props> = ({
  handleChoosenReasonChange,
  handleOpenChange,
  choosenReason,
  setStep
}) => {
  return (
    <>
      <RadioGroup.Root
        size={'2'}
        color='pink'
        className={styles.radioGroup}
        onValueChange={handleChoosenReasonChange}
      >
        <Flex
          direction={'column'}
          gap={'5'}
          width={'100%'}
          mb={'2'}
        >
          <Flex
            align={'center'}
            gap={'3'}
          >
            <RadioGroup.Item
              value={DELETE_ACCOUNT_REASON_OPTIONS.smthBroken}
              id='r1'
            />
            <label
              htmlFor='r1'
              className={styles.radioGroupLabel}
            >
              {DELETE_ACCOUNT_REASON_OPTIONS.smthBroken}
            </label>
          </Flex>
          <Flex
            align={'center'}
            gap={'3'}
          >
            <RadioGroup.Item
              value={DELETE_ACCOUNT_REASON_OPTIONS.usingAnotherSevice}
              id='r2'
            />
            <label
              htmlFor='r2'
              className={styles.radioGroupLabel}
            >
              {DELETE_ACCOUNT_REASON_OPTIONS.usingAnotherSevice}
            </label>
          </Flex>
          <Flex
            align={'center'}
            gap={'3'}
          >
            <RadioGroup.Item
              value={DELETE_ACCOUNT_REASON_OPTIONS.other}
              id='r3'
            />
            <label
              htmlFor='r3'
              className={styles.radioGroupLabel}
            >
              {DELETE_ACCOUNT_REASON_OPTIONS.other}
            </label>
          </Flex>
        </Flex>
      </RadioGroup.Root>
      <TextArea
        mt={'3'}
        mb={'6'}
        placeholder='Start typing...'
        className={styles.deleteReasonArea}
      />

      <Flex
        direction={'column'}
        gap={'1'}
        width={'100%'}
      >
        <Button
          className={styles.submitBtn}
          type='button'
          onClick={() => setStep(CONFIRM_DELETION_STEP)}
          disabled={!choosenReason}
        >
          <Text className={styles.submitBtnText}>Continue</Text>
        </Button>

        <Button
          className={styles.cancelBtn}
          type='button'
          onClick={() => handleOpenChange(false)}
        >
          Cancel
        </Button>
      </Flex>
    </>
  )
}
