/* eslint-disable max-lines, max-statements */
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import { EyeClosedIcon } from '@radix-ui/react-icons'
import { Button, Flex, IconButton, Text } from '@radix-ui/themes'
import { CHANGE_PASSWORD } from 'api/user-settings/change-user-password'
import { MODALS_FIELDS } from 'features/user-settings/constants'
import { DataTestIDs } from 'shared/constants'
import { notificationStateVar } from 'shared/store/notification'
import { ControllableFormField, XyroLoading } from 'shared/ui'
// TODO: Split styles file per feature
import styles from '../../account/account.module.scss'

export const AccountSettingsPassword: React.FC = () => {
  const [commitChangePassword, { loading }] = useMutation(CHANGE_PASSWORD)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordRepeated, setNewPasswordRepeated] = useState('')

  const [isOldPasswordHidden, setIsOldPasswordHidden] = useState(true)
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true)
  const [isNewPasswordRepeatedHidden, setIsNewPasswordRepeatedHidden] =
    useState(true)

  const handleSubmit = async () => {
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
    <Flex
      direction={'column'}
      gap={'3rem'}
      className={styles.settingsContainerWrapper}
    >
      <Text
        size={'8'}
        weight={'medium'}
        className='color-white'
      >
        Reset Password
      </Text>

      <RadixForm.Root onSubmit={handleSubmit}>
        <Flex
          direction={'column'}
          gap={'3rem'}
          maxWidth={'53rem'}
        >
          <Flex
            direction={'column'}
            width={'100%'}
            gap={'1'}
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
              size={'1'}
              className='color-white'
              weight={'bold'}
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
            gap={'1'}
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
              size={'1'}
              className='color-white'
              weight={'bold'}
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
            gap={'1'}
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
              size={'1'}
              className='color-white'
              weight={'bold'}
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
                    UPDATE
                  </Text>
                </XyroLoading>
              </Button>
            </RadixForm.Submit>
          </Flex>
        </Flex>
      </RadixForm.Root>
    </Flex>
  )
}
