import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { MODALS_FIELDS } from 'features/user-settings/constants'
import React from 'react'
import { FormField } from 'shared/ui'
import * as RadixForm from '@radix-ui/react-form'
import { DotTitle } from 'shared/ui/dot-title/dot-title'
import styles from '../user-settings.module.scss'

interface Props {
  handleOpenChange: (isOpen: boolean) => void
}

export const DeleteAccountModalConfirm: React.FC<Props> = ({
  handleOpenChange
}): JSX.Element => {
  return (
    <Flex
      direction={'column'}
      gap={'3'}
      width={'100%'}
    >
      <Text
        className={styles.deleteAccountWarning}
        size={'1'}
        align={'center'}
      >
        Your account will be accessible for another <b>30 days</b>. You can use
        your username and password to log in. If you do not log in for 30 days,
        your account will be deleted without the possibility of recovery.
      </Text>

      <Box
        my={'6'}
        className={styles.separator}
      />

      <Flex
        direction={'column'}
        gap={'2'}
      >
        <DotTitle>
          {MODALS_FIELDS.DELETE_ACCOUNT.password.label.toUpperCase()}
        </DotTitle>
        <FormField
          height='6rem'
          borderRadius='large'
          type='password'
          placeholder={MODALS_FIELDS.DELETE_ACCOUNT.password.placeholder}
          name={MODALS_FIELDS.DELETE_ACCOUNT.password.value}
        />
      </Flex>

      <Flex
        direction={'column'}
        gap={'1'}
        width={'100%'}
        className={styles.deleteAccountButtonsContainer}
      >
        <RadixForm.Submit asChild>
          <Button
            className={styles.deleteBtn}
            color='pink'
            type='submit'
          >
            <Text className={styles.submitBtnText}>DELETE ACCOUNT</Text>
          </Button>
        </RadixForm.Submit>
        <Button
          className={styles.cancelBtn}
          type='button'
          onClick={() => handleOpenChange(false)}
        >
          Cancel
        </Button>
      </Flex>
    </Flex>
  )
}
