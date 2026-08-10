/* eslint-disable max-lines, max-statements */

import React, { useEffect, useState } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Form } from '@radix-ui/react-form'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import {
  Button,
  Flex,
  IconButton,
  Separator,
  Text,
  TextArea
} from '@radix-ui/themes'
import {
  ChangeEmailMutation,
  RequestEmailConfirmMutation,
  UpdateUserNameMutation
} from '__generated__/graphql'
import { VERIFY_EMAIL_MUTATION } from 'api/account/verify-user-email'
import { CHANGE_EMAIL_MUTATION } from 'api/user-settings/change-user-email'
import { CHANGE_USERNAME } from 'api/user-settings/change-user-name'
import cn from 'classnames'
import { errorGlobalNotification } from 'features/user-settings/utils/global-notifications'
import { notificationStateVar } from 'shared/store/notification'
import { userVar } from 'shared/store/user'
import { ControllableFormField, XyroLoading } from 'shared/ui'
import { DataTestIDs } from '../../../../shared/constants'
import { useUser } from '../../../auth/hooks/use-user'
import { successGloalNotification } from '../../../user-settings/utils/global-notifications'
import { ChangeAvatarModal } from '../account-change-avatar'
import styles from '../../account.module.scss'

export const AccountBasicInfo: React.FC = () => {
  const user = useReactiveVar(userVar)
  const { refetchUser } = useUser()
  const [isEmailVerificationSent, setIsEmailVerificationSent] = useState(false)

  const [nickname, setNickname] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [bio, setBio] = useState('')

  const isEmailVerified = Boolean(user?.emailConfirmed)

  const [commitVerifyEmail] = useMutation<RequestEmailConfirmMutation>(
    VERIFY_EMAIL_MUTATION
  )

  const [commitChangeUsername] =
    useMutation<UpdateUserNameMutation>(CHANGE_USERNAME)

  const [commitChangeEmail, { loading: changeEmailLoading }] =
    useMutation<ChangeEmailMutation>(CHANGE_EMAIL_MUTATION)

  const handleFirstNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }

  const handleNicknameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  }

  const handleLastNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(e.target.value)
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value)
  }

  useEffect(() => {
    if (user) {
      setFirstName(user.name || '')
      setLastName(user.name || '')
      setEmail(user.email || '')
      setBio(user.bio || '')
      setNickname(user.name || '')
    }
  }, [user])

  const handleVerifyEmail = async () => {
    commitVerifyEmail({
      onCompleted: () => {
        notificationStateVar({
          isOpen: true,
          title: 'Verification link was sent to your email',
          type: 'success'
        })

        setIsEmailVerificationSent(true)
      },

      onError: e => {
        notificationStateVar({
          title: e.message,
          type: 'error',
          isOpen: true
        })
      }
    })
  }

  const handleSubmit = async () => {
    if (!user) throw new Error('User state is empty')

    const emailMutationOptions = {
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
      }
    }

    const nicknameMutationOptions = {
      variables: {
        name: nickname
      },
      onError: (e: any) => {
        const message = e.message || 'Name was not updated'

        errorGlobalNotification(message)
      },
      onCompleted: () => {
        successGloalNotification('Name was successfully updated')
      }
    }

    if (email !== user?.email) {
      await commitChangeEmail(emailMutationOptions)
    }

    if (nickname !== user?.name) {
      await commitChangeUsername(nicknameMutationOptions)
    }

    void refetchUser()
  }

  const disabledSave = email === user?.email && nickname === user?.name

  return (
    <Flex
      className={styles.accountInfoWrapper}
      direction={'column'}
      gap={'5'}
    >
      <Text
        size={'5'}
        className={'color-white'}
      >
        Personal Information
      </Text>

      <Flex
        gap={{ initial: '5', sm: '8' }}
        align={{ initial: 'center', sm: 'start' }}
        direction={{ initial: 'column', sm: 'row' }}
      >
        <ChangeAvatarModal />

        <Form style={{ width: '100%' }}>
          <Flex
            direction={'column'}
            width={'100%'}
            gap={{ initial: '3', sm: '5' }}
          >
            <Flex
              gap={{ initial: '3', sm: '5' }}
              align={'center'}
              width={'100%'}
              direction={{ initial: 'column', sm: 'row' }}
            >
              <Flex
                direction={'column'}
                gap={'1'}
                width={'100%'}
              >
                <Text
                  size={'1'}
                  className='color-white'
                  weight={'bold'}
                >
                  NICK
                </Text>

                <ControllableFormField
                  name='nickname'
                  type='text'
                  value={nickname}
                  handleFieldChange={handleNicknameChanged}
                  className={styles.basicInfoInput}
                  placeholder='Enter your nick'
                />
              </Flex>

              <Flex
                direction={'column'}
                gap={'1'}
                width={'100%'}
              >
                <Text
                  size={'1'}
                  className='color-white'
                  weight={'bold'}
                >
                  EMAIL
                </Text>

                <Flex position={'relative'}>
                  <ControllableFormField
                    name='email'
                    type='email'
                    value={email}
                    handleFieldChange={handleEmailChange}
                    className={cn(
                      styles.basicInfoInput,
                      styles.emailVerificationInput
                    )}
                    placeholder='Enter your email'
                  />

                  <Flex className={styles.iconVerifyEmail}>
                    {isEmailVerified ?
                      <CheckCircledIcon
                        width={'3rem'}
                        height={'3rem'}
                        color={'var(--lime)'}
                      />
                    : <IconButton
                        onClick={handleVerifyEmail}
                        className={cn('cursor-pointer', 'background-none')}
                        variant='ghost'
                        type={'button'}
                        disabled={isEmailVerificationSent}
                      >
                        <Text
                          size={'2'}
                          weight={'bold'}
                          className={'color-pink'}
                        >
                          {isEmailVerificationSent ? 'SENT' : 'VERIFY'}
                        </Text>
                      </IconButton>
                    }
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Flex
              align={'center'}
              gap={'3'}
            >
              <Separator
                size={'4'}
                className={'background-gray-dark'}
              />

              <Text
                size={'3'}
                className={cn('color-gray-dark', 'no-wrap')}
              >
                PERSONAL INFO
              </Text>

              <Separator
                size={'4'}
                className={'background-gray-dark'}
              />
            </Flex>

            <Flex
              gap={{ initial: '3', sm: '5' }}
              align={'center'}
              width={'100%'}
              direction={{ initial: 'column', sm: 'row' }}
            >
              <Flex
                direction={'column'}
                gap={'1'}
                width={'100%'}
              >
                <Text
                  size={'1'}
                  className='color-white'
                  weight={'bold'}
                >
                  FIRST NAME
                </Text>

                <ControllableFormField
                  name='firstName'
                  type='text'
                  value={firstName}
                  handleFieldChange={handleFirstNameChanged}
                  className={styles.basicInfoInput}
                  placeholder='Enter your first name'
                />
              </Flex>

              <Flex
                direction={'column'}
                gap={'1'}
                width={'100%'}
              >
                <Text
                  size={'1'}
                  className='color-white'
                  weight={'bold'}
                >
                  LAST NAME
                </Text>

                <ControllableFormField
                  name='lastName'
                  type='text'
                  value={lastName}
                  handleFieldChange={handleLastNameChanged}
                  className={styles.basicInfoInput}
                  placeholder='Enter your last name'
                />
              </Flex>
            </Flex>

            <Flex
              gap={{ initial: '3', sm: '5' }}
              width={{ initial: '100%', sm: '50%' }}
              direction={{ initial: 'column', sm: 'row' }}
            >
              <Flex
                direction={'column'}
                gap={'1'}
              >
                <Text
                  size={'1'}
                  className='color-white'
                  weight={'bold'}
                >
                  DATE OF BIRTH
                </Text>

                <ControllableFormField
                  name='date of birth'
                  type='date'
                  value={dateOfBirth}
                  handleFieldChange={handleDateOfBirthChange}
                  className={styles.basicInfoInput}
                  placeholder='00/00/0000'
                />
              </Flex>
            </Flex>

            <Flex
              direction={'column'}
              gap={'1'}
              width={'100%'}
            >
              <Text
                size={'1'}
                className='color-white'
                weight={'bold'}
              >
                BIO
              </Text>

              <TextArea
                placeholder='Tell us a little bit about yourself'
                className={cn(
                  styles.accountBioInfoInput,
                  styles.basicInfoInput
                )}
                value={bio}
                onChange={handleBioChange}
              />
            </Flex>

            <Button
              className={styles.updateAccountInfoBtn}
              disabled={disabledSave}
              onClick={handleSubmit}
            >
              <XyroLoading loading={changeEmailLoading}>
                <Text
                  size={'2'}
                  weight={'bold'}
                >
                  SAVE
                </Text>
              </XyroLoading>
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  )
}
