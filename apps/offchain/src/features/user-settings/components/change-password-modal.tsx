/* eslint-disable max-lines */
import React, { FormEvent, useCallback, useState } from 'react'
import { useMutation } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import { EyeClosedIcon } from '@radix-ui/react-icons'
import { Button, Flex, Heading, IconButton, Text } from '@radix-ui/themes'
import { CHANGE_PASSWORD } from 'api/user-settings/change-user-password'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { notificationStateVar } from 'shared/store/notification'
import { ControllableFormField, XyroDialog, XyroLoading } from 'shared/ui'
import { MODALS_FIELDS } from '../constants'
import styles from '../user-settings.module.scss'

// eslint-disable-next-line max-statements
export const ChangePasswordModal: React.FC = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const [commitChangePassword, { loading }] = useMutation(CHANGE_PASSWORD)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordRepeated, setNewPasswordRepeated] = useState('')

  const [isOldPasswordHidden, setIsOldPasswordHidden] = useState(true)
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true)
  const [isNewPasswordRepeatedHidden, setIsNewPasswordRepeatedHidden] =
    useState(true)

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setDialogIsOpen(isOpen)

    setOldPassword('')
    setNewPassword('')
    setNewPasswordRepeated('')
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (newPassword !== newPasswordRepeated) {
      notificationStateVar({
        isOpen: true,
        type: 'warning',
        title: 'Passwords are not equal'
      })

      return
    }

    await commitChangePassword({
      variables: {
        data: {
          newPassword,
          oldPassword
        }
      },
      onCompleted: () => {
        notificationStateVar({
          isOpen: true,
          type: 'success',
          title: 'Password was successfully updated'
        })

        handleOpenChange(false)

        location.reload()
      },
      onError: e => {
        notificationStateVar({
          isOpen: true,
          type: 'error',
          title: 'Something went wrong...',
          description: e.message || 'Password was not changed'
        })
      }
    })
  }

  return (
    <XyroDialog
      open={dialogIsOpen}
      onOpenChange={handleOpenChange}
      className={cn(styles.dialogContent, styles.changePasswordContent)}
      dialogTrigger={
        <Button
          size={'3'}
          variant='outline'
          radius='full'
          color='gray'
          className={styles.modalTriggerBtn}
          data-testid={DataTestIDs.buttonUserSettingsChangeName}
        >
          <Text
            weight={'bold'}
            size={'2'}
          >
            CHANGE PASSWORD
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
          gap={'2'}
        >
          <Heading
            size={'7'}
            weight={'medium'}
            mb={'7'}
            className={'color-white'}
          >
            Change Password
          </Heading>

          <Flex
            direction={'column'}
            width={'100%'}
            gap={'2'}
            position={'relative'}
          >
            <IconButton
              className={styles.passwordCloseButton}
              type='button'
              variant='ghost'
              onClick={() => setIsOldPasswordHidden(p => !p)}
            >
              <EyeClosedIcon color='var(--white)' />
            </IconButton>

            <Text
              size={'2'}
              className={styles.enterBioTitle}
              weight={'regular'}
            >
              {MODALS_FIELDS.CHANGE_PASSWORD.oldPassword.label}
            </Text>

            <ControllableFormField
              value={oldPassword}
              handleFieldChange={v => setOldPassword(v.target.value)}
              borderRadius='large'
              height='6rem'
              type={isOldPasswordHidden ? 'password' : 'text'}
              placeholder={
                MODALS_FIELDS.CHANGE_PASSWORD.oldPassword.placeholder
              }
              name={MODALS_FIELDS.CHANGE_PASSWORD.oldPassword.value}
              dataTestID={DataTestIDs.userSettingsOldPasswordInput}
            />
          </Flex>

          <Flex
            direction={'column'}
            width={'100%'}
            gap={'2'}
            position={'relative'}
          >
            <IconButton
              className={styles.passwordCloseButton}
              type='button'
              variant='ghost'
              onClick={() => setIsNewPasswordHidden(p => !p)}
            >
              <EyeClosedIcon color='var(--white)' />
            </IconButton>

            <Text
              size={'2'}
              className={styles.enterBioTitle}
              weight={'regular'}
            >
              {MODALS_FIELDS.CHANGE_PASSWORD.newPassword.label}
            </Text>

            <ControllableFormField
              value={newPassword}
              handleFieldChange={v => setNewPassword(v.target.value)}
              borderRadius='large'
              height='6rem'
              type={isNewPasswordHidden ? 'password' : 'text'}
              placeholder={
                MODALS_FIELDS.CHANGE_PASSWORD.newPassword.placeholder
              }
              name={MODALS_FIELDS.CHANGE_PASSWORD.newPassword.value}
              dataTestID={DataTestIDs.userSettingsNewPasswordInput}
            />
          </Flex>

          <Flex
            direction={'column'}
            width={'100%'}
            gap={'2'}
            position={'relative'}
          >
            <IconButton
              className={styles.passwordCloseButton}
              type='button'
              variant='ghost'
              onClick={() => setIsNewPasswordRepeatedHidden(p => !p)}
            >
              <EyeClosedIcon color='var(--white)' />
            </IconButton>

            <Text
              size={'2'}
              className={styles.enterBioTitle}
              weight={'regular'}
            >
              {MODALS_FIELDS.CHANGE_PASSWORD.newPasswordRepeated.label}
            </Text>

            <ControllableFormField
              value={newPasswordRepeated}
              handleFieldChange={v => setNewPasswordRepeated(v.target.value)}
              borderRadius='large'
              height='6rem'
              type={isNewPasswordRepeatedHidden ? 'password' : 'text'}
              placeholder={
                MODALS_FIELDS.CHANGE_PASSWORD.newPasswordRepeated.placeholder
              }
              name={MODALS_FIELDS.CHANGE_PASSWORD.newPasswordRepeated.value}
              dataTestID={DataTestIDs.userSettingsNewPasswordRepeatedInput}
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
                disabled={loading}
                size='3'
                type='submit'
                className={styles.submitBtn}
                data-testid={DataTestIDs.buttonUserSettingsChangeNameSave}
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
                    CHANGE PASSWORD
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
