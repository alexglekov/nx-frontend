/* eslint-disable max-lines */
import React, { useCallback, useState } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import { Button, Flex, Heading, Text } from '@radix-ui/themes'
import { UpdateUserNameMutation } from '__generated__/graphql'
import { CHANGE_USERNAME } from 'api/user-settings/change-user-name'
import cn from 'classnames'
import { MODALS_FIELDS } from 'features/user-settings/constants'
import { DataTestIDs, MAX_USER_NAME_LENGHT } from 'shared/constants'
import { useValidateUserName } from 'shared/hooks/use-validate-user-name'
import { userVar } from 'shared/store/user'
import { ControllableFormField, XyroDialog, XyroLoading } from 'shared/ui'
import {
  errorGlobalNotification,
  successGloalNotification
} from '../utils/global-notifications'
import styles from '../user-settings.module.scss'

export const ChangeNameModal: React.FC = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const { name, handleNameChange, isNameInvalid } = useValidateUserName()

  const [commitChangeUsername, { loading }] =
    useMutation<UpdateUserNameMutation>(CHANGE_USERNAME)
  const user = useReactiveVar(userVar)

  const handleOpenChange = useCallback(
    (isOpen: boolean) => setDialogIsOpen(isOpen),
    []
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) throw new Error('User state is empty')

    if (isNameInvalid) return

    const mutationOptions = {
      variables: { name },
      onError: () => errorGlobalNotification('Name was not updated'),
      onCompleted: () => {
        successGloalNotification('Name was successfully updated')

        handleOpenChange(false)

        location.reload()
      }
    }

    await commitChangeUsername(mutationOptions)
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
          data-testid={DataTestIDs.buttonUserSettingsChangeName}
        >
          <Text
            weight={'bold'}
            size={'2'}
          >
            CHANGE NAME
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
            Change name
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
                {MODALS_FIELDS.CHANGE_NAME.name.label}
              </Text>

              <Text
                size={'2'}
                className={cn('color-white', { ['color-pink']: isNameInvalid })}
              >
                {name.length}/{MAX_USER_NAME_LENGHT}
              </Text>
            </Flex>

            <ControllableFormField
              value={name}
              handleFieldChange={handleNameChange}
              borderRadius='large'
              height='6rem'
              placeholder={MODALS_FIELDS.CHANGE_NAME.name.placeholder}
              name={MODALS_FIELDS.CHANGE_NAME.name.value}
              dataTestID={DataTestIDs.userSettingsChangeNameInput}
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
                disabled={loading || isNameInvalid}
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
                    CHANGE NAME
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
