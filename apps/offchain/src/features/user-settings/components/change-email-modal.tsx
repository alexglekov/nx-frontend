/* eslint-disable max-lines */
import React, { useCallback, useState } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import { Button, Flex, Heading, Text } from '@radix-ui/themes'
import { ChangeEmailMutation } from '__generated__/graphql'
import { CHANGE_EMAIL_MUTATION } from 'api/user-settings/change-user-email'
import cn from 'classnames'
import { MODALS_FIELDS } from 'features/user-settings/constants'
import { DataTestIDs } from 'shared/constants'
import { useValidateEmail } from 'shared/hooks/use-validate-user-email'
import { userVar } from 'shared/store/user'
import { ControllableFormField, XyroDialog, XyroLoading } from 'shared/ui'
import {
  errorGlobalNotification,
  successGloalNotification
} from '../utils/global-notifications'
import styles from '../user-settings.module.scss'

export const ChangeEmailModal: React.FC = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const { email, isEmailInvalid, handleEmailChange } = useValidateEmail()

  const [commitChangeEmail, { loading }] = useMutation<ChangeEmailMutation>(
    CHANGE_EMAIL_MUTATION
  )

  const user = useReactiveVar(userVar)

  const handleOpenChange = useCallback(
    (isOpen: boolean) => setDialogIsOpen(isOpen),
    []
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) throw new Error('User state is empty')

    if (isEmailInvalid) return

    const mutationOptions = {
      variables: {
        data: {
          email
        }
      },
      onError: (e: any) => {
        const message = e.message || 'Email was not updated'

        errorGlobalNotification(message)
      },
      onCompleted: () => {
        successGloalNotification('Email was successfully updated')

        handleOpenChange(false)

        location.reload()
      }
    }

    await commitChangeEmail(mutationOptions)
  }

  return (
    <XyroDialog
      open={dialogIsOpen}
      onOpenChange={handleOpenChange}
      className={cn(styles.dialogContent, styles.changeNameContent)}
      dialogTrigger={
        <Button
          size={'3'}
          variant='outline'
          radius='full'
          color='gray'
          className={styles.modalTriggerBtn}
          data-testid={DataTestIDs.buttonUserSettingsChangeEmail}
        >
          <Text
            weight={'bold'}
            size={'2'}
          >
            CHANGE EMAIL
          </Text>
        </Button>
      }
    >
      <RadixForm.Root onSubmit={handleSubmit}>
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          position={'relative'}
        >
          <Heading
            size={'7'}
            weight={'medium'}
            mb={'7'}
            className={'color-white'}
          >
            Change email
          </Heading>

          <Flex
            direction={'column'}
            width={'100%'}
            gap={'2'}
          >
            <Flex
              align={'center'}
              justify={'between'}
              width={'100%'}
            >
              <Text
                size={'2'}
                className={styles.enterBioTitle}
                weight={'regular'}
              >
                {MODALS_FIELDS.CHANGE_EMAIL.email.label}
              </Text>

              {isEmailInvalid && (
                <Text
                  size={'2'}
                  className={'color-pink'}
                >
                  Wrong email format
                </Text>
              )}
            </Flex>

            <ControllableFormField
              value={email}
              handleFieldChange={handleEmailChange}
              borderRadius='large'
              height='6rem'
              placeholder={MODALS_FIELDS.CHANGE_EMAIL.email.placeholder}
              name={MODALS_FIELDS.CHANGE_EMAIL.email.label}
              dataTestID={DataTestIDs.userSettingsChangeEmailInput}
            />
          </Flex>
          <Flex
            className={styles.buttonsContainer}
            width={'100%'}
            direction={'column'}
            gap={'1'}
          >
            <RadixForm.Submit asChild>
              <Button
                disabled={loading || isEmailInvalid}
                size='3'
                type='submit'
                className={styles.submitBtn}
                data-testid={DataTestIDs.buttonUserSettingsChangeEmailSave}
              >
                <XyroLoading
                  loading={loading}
                  iconSize='0'
                  variant='dark'
                >
                  <Text
                    className={styles.submitBtnText}
                    size={'2'}
                  >
                    CHANGE EMAIL
                  </Text>
                </XyroLoading>
              </Button>
            </RadixForm.Submit>

            <Button
              className={styles.cancelBtn}
              size='3'
              type='button'
              onClick={() => setDialogIsOpen(false)}
            >
              <Text size={'2'}>CANCEL</Text>
            </Button>
          </Flex>
        </Flex>
      </RadixForm.Root>
    </XyroDialog>
  )
}
