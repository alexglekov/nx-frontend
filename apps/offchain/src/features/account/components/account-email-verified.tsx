import { useEffect } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { EnvelopeClosedIcon, EnvelopeOpenIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { ConfirmEmailMutation } from '__generated__/graphql'
import { CONFIRM_EMAIL_MUTATION } from 'api/account/confirm-user-email'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { notificationStateVar } from 'shared/store/notification'
import { userVar } from 'shared/store/user'
import { useUser } from '../../auth/hooks/use-user'
import styles from '../account.module.scss'

interface Props {
  emailToken?: string
}

export const AccountEmailVerified: React.FC<Props> = ({ emailToken }) => {
  const user = useReactiveVar(userVar)
  const { refetchUser } = useUser()

  const isEmailVerified = Boolean(user?.emailConfirmed)

  const [commitVerifyEmail, { loading: isLoading }] =
    useMutation<ConfirmEmailMutation>(CONFIRM_EMAIL_MUTATION)

  const emailVerificationHeader =
    !isEmailVerified ? 'Verification in progress' : 'Email verified!'

  const handleEmailVerification = async () => {
    if (isEmailVerified) return

    try {
      await commitVerifyEmail({
        variables: { data: { token: emailToken } },
        onCompleted: () => {
          refetchUser()

          notificationStateVar({
            title: 'Success',
            description: `Your email has been verified!`,
            type: 'success',
            isOpen: true
          })
        },

        onError: error => {
          notificationStateVar({
            title: 'Failed to verify email',
            description: error.message,
            type: 'error',
            isOpen: true
          })
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (emailToken && !isEmailVerified) {
      void handleEmailVerification()
    }
  }, [emailToken, isEmailVerified])

  return (
    <Flex
      direction={'column'}
      height={'100%'}
      width={'100%'}
      justify={'center'}
      align={'center'}
      gap={'8'}
      py={'9'}
    >
      {isLoading ?
        <EnvelopeClosedIcon
          className={cn(styles.envelopeClosedIcon, {
            [styles.envelopeAnimation]: isLoading
          })}
          color={'var(--pink)'}
          height={'8rem'}
          width={'8rem'}
        />
      : <EnvelopeOpenIcon
          className={styles.envelopeOpenIcon}
          color={'var(--lime)'}
          height={'8rem'}
          width={'8rem'}
        />
      }

      <Flex
        align={'center'}
        justify={'center'}
        direction={'column'}
        gap={'6'}
      >
        <Text
          size={'8'}
          weight={'bold'}
          className={'color-white'}
        >
          Email verification
        </Text>

        <Text
          size={'6'}
          className={'color-white'}
        >
          {emailVerificationHeader}
        </Text>
      </Flex>

      <Flex
        align={'center'}
        direction={{ initial: 'column', sm: 'row' }}
        gap={'5'}
        width={{ initial: '100%', sm: 'auto' }}
      >
        <Link
          to={RouterPathes.home}
          className={styles.emailVerifyLink}
        >
          <Button className={styles.emailVerifyButton}>
            <Text
              size={'2'}
              weight={'bold'}
              className={'color-white'}
            >
              HOME
            </Text>
          </Button>
        </Link>

        <Link
          to={RouterPathes.accountMyAccount}
          className={styles.emailVerifyLink}
        >
          <Button
            className={cn(
              styles.emailVerifyButton,
              styles.emailVerifyAccountBtn
            )}
          >
            <Text
              size={'2'}
              weight={'bold'}
              className={'color-black'}
            >
              MY ACCOUNT
            </Text>
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}
