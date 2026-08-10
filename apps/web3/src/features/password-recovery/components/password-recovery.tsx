import { Button, Flex, Heading } from '@radix-ui/themes'
import React from 'react'
import * as RadixForm from '@radix-ui/react-form'
import { DotTitle, FormField } from 'shared/ui'
import { useQueryParams } from 'shared/hooks/use-query'
import { notificationStateVar } from 'shared/store/notification'
import styles from '../password-recovery.module.scss'
import { RECOVERY_TOKEN_NAME } from '../constants'

export const PasswordRecovery: React.FC = () => {
  const query = useQueryParams()
  const recoveryToken = query.get(RECOVERY_TOKEN_NAME) || ''

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!recoveryToken) {
      notificationStateVar({
        isOpen: true,
        title: 'Incorrect recovery token',
        type: 'error'
      })
      return
    }
    // TODO: Add logic to handle password change
  }

  return (
    <Flex className={styles.passwordRecovery}>
      <Heading
        size='7'
        weight={'medium'}
        className={styles.cardHeadingText}
      >
        Settings
      </Heading>
      <RadixForm.Root onSubmit={handleSubmit}>
        <Flex
          direction={'column'}
          gap={'2'}
          className={styles.formFieldWrapper}
        >
          <DotTitle>ENTER NEW PASSWORD</DotTitle>
          <FormField
            height='6rem'
            borderRadius='large'
            type='password'
            name='password'
            placeholder='Enter new password'
          />
          <RadixForm.Submit asChild>
            <Button
              className={styles.submitBtn}
              type='submit'
              mt={'2'}
            >
              Submit
            </Button>
          </RadixForm.Submit>
        </Flex>
      </RadixForm.Root>
    </Flex>
  )
}
