/* eslint-disable max-statements, complexity, max-lines */
import React, { useCallback, useState } from 'react'
import { ApolloError, useReactiveVar } from '@apollo/client'
import { Checkbox } from '@radix-ui/react-checkbox'
import { Form } from '@radix-ui/react-form'
import { CheckIcon, EyeClosedIcon } from '@radix-ui/react-icons'
import { Button, Flex, IconButton, Text } from '@radix-ui/themes'
import { useCreateSession } from 'features/auth/hooks/use-create-session'
import {
  isSignInDialogOpenVar,
  isSignUpDialogOpenVar
} from 'features/auth/store/dialogs'
import { notifyOnAuthCompleted } from 'features/auth/utils/notify'
import { TermsDialogTab } from 'features/terms-dialog/constants'
import {
  isTermsDialogOpenVar,
  termsTabVar
} from 'features/terms-dialog/store/dialog'
import { Link } from 'react-router-dom'
import { ControllableFormField, XyroLoading } from 'shared/ui'
import { OrSeparator } from 'shared/ui/or-separator'
import { notifyOnAuthError } from 'shared/utils/notify-on-error'
import {
  referrerIdVar,
  wizardFlowTypeVar,
  wizardModeVar,
  wizardStepVar
} from '../../store/wizard.store'
import { WizardFlowType, WizardMode, WizardStep } from '../../types'
import styles from '../../sign-up.module.scss'

interface Props {
  mode: 'signin' | 'signup'
}
export const WizardStepInit: React.FC<Props> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isTermsAgreementClicked, setIsTermsAgreementClicked] = useState(false)
  const [isRememberMeClicked, setIsRememberMeClicked] = useState(false)

  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const referrerId = useReactiveVar(referrerIdVar)

  const { handleSignIn, handleSignUp, signInLoading, signUpLoading } =
    useCreateSession()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setEmail(value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setPassword(value)
  }

  const handleConnectWallet = useCallback(() => {
    wizardFlowTypeVar(WizardFlowType.web3)
    wizardStepVar(WizardStep.walletSelect)
  }, [])

  const handleClickFlowSwitch = () => {
    if (isSignUp) {
      wizardModeVar(WizardMode.signIn)
      isSignInDialogOpenVar(true)
      isSignUpDialogOpenVar(false)
    } else {
      wizardModeVar(WizardMode.signUp)
      isSignUpDialogOpenVar(true)
      isSignInDialogOpenVar(false)
    }
  }

  const handleSubmitEmailSession = async () => {
    try {
      if (isSignUp) {
        const payload =
          referrerId ?
            {
              email,
              password,
              referrerId: referrerId
            }
          : {
              email,
              password
            }

        await handleSignUp(payload)
      } else {
        const payload = {
          email,
          password
        }

        await handleSignIn(payload)
      }

      notifyOnAuthCompleted()

      location.reload()
    } catch (err) {
      notifyOnAuthError(err as ApolloError)
    }
  }

  const handlePasswordVisibilityChange = () => {
    setPasswordVisible(v => !v)
  }

  const openTermsDialog = useCallback(() => {
    isTermsDialogOpenVar(true)
    termsTabVar(TermsDialogTab.TermsAndConditions)
  }, [])

  const openPrivacyDialog = useCallback(() => {
    isTermsDialogOpenVar(true)
    termsTabVar(TermsDialogTab.PrivacyPolicy)
  }, [])

  const isSignUp = mode === 'signup'
  const isCreateAccountButtonDisabled =
    !email ||
    !password ||
    signInLoading ||
    signUpLoading ||
    (isSignUp && !isTermsAgreementClicked)
  const isConnectWalletButtonDisabled = isSignUp && !isTermsAgreementClicked
  const isLoading = signInLoading || signUpLoading

  return (
    <Flex
      direction={'column'}
      gap={'4'}
      width={'100%'}
    >
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        gap={'3'}
        mb={'2'}
      >
        <Text
          size={'7'}
          weight={'bold'}
          className='color-white'
        >
          {isSignUp ? 'Sign up' : 'Welcome back!'}
        </Text>

        <Text
          weight={'medium'}
          size={'3'}
          className='color-gray-light'
        >
          Select method to {isSignUp ? 'sign up' : 'login in to your account'}:
        </Text>
      </Flex>

      <Form style={{ width: '100%' }}>
        <Flex
          direction={'column'}
          gap={'3'}
          width={'100%'}
          mb={'3rem'}
        >
          <Flex
            direction={'column'}
            gap={'1'}
          >
            <Text
              size={'1'}
              className='color-gray-light'
              weight={'bold'}
            >
              EMAIL
            </Text>

            <ControllableFormField
              name='email'
              type='email'
              value={email}
              handleFieldChange={handleEmailChange}
              className={styles.authInputField}
              placeholder='Enter your email'
            />
          </Flex>

          <Flex
            direction={'column'}
            gap={'1'}
            position={'relative'}
          >
            <IconButton
              className={styles.passwordCloseButton}
              type='button'
              variant='ghost'
              onClick={handlePasswordVisibilityChange}
            >
              <EyeClosedIcon color='var(--white)' />
            </IconButton>

            <Text
              size={'1'}
              className='color-gray-light'
              weight={'bold'}
            >
              PASSWORD
            </Text>

            <ControllableFormField
              name='password'
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              handleFieldChange={handlePasswordChange}
              className={styles.authInputField}
              placeholder='Enter your password'
            />
          </Flex>

          <Flex
            align={'center'}
            justify={'between'}
          >
            <Flex
              align={'center'}
              gap={'2'}
            >
              <Flex position={'relative'}>
                <Checkbox
                  className={styles.authCheckBox}
                  checked={isRememberMeClicked}
                  onCheckedChange={v => setIsRememberMeClicked(v as boolean)}
                />

                {isRememberMeClicked && (
                  <CheckIcon
                    className={styles.checkboxTick}
                    color='var(--pink)'
                  />
                )}
              </Flex>

              <Text
                size={'1'}
                weight={'medium'}
                className='color-gray-light'
              >
                Remember me
              </Text>
            </Flex>

            {!isSignUp && (
              <Text
                color='pink'
                size={'1'}
                weight={'bold'}
                className='cursor-pointer'
              >
                Forgot password?
              </Text>
            )}
          </Flex>

          {isSignUp && (
            <Flex
              align={'center'}
              gap={'2'}
            >
              <Flex position={'relative'}>
                <Checkbox
                  className={styles.authCheckBox}
                  checked={isTermsAgreementClicked}
                  onCheckedChange={v =>
                    setIsTermsAgreementClicked(v as boolean)
                  }
                />

                {isTermsAgreementClicked && (
                  <CheckIcon
                    className={styles.checkboxTick}
                    color='var(--pink)'
                  />
                )}
              </Flex>

              <Text
                size={'1'}
                weight={'medium'}
                className='color-gray-light'
              >
                I accept with{' '}
                <Link
                  className={styles.termsLink}
                  to={'#'}
                  onClick={openTermsDialog}
                >
                  Terms of use
                </Link>{' '}
                and{' '}
                <Link
                  className={styles.termsLink}
                  to={'#'}
                  onClick={openPrivacyDialog}
                >
                  Privacy Policy
                </Link>
              </Text>
            </Flex>
          )}
        </Flex>

        <Button
          className={styles.createEmailAccountButton}
          disabled={isCreateAccountButtonDisabled}
          onClick={handleSubmitEmailSession}
        >
          <XyroLoading loading={isLoading}>
            <Text
              size={'2'}
              weight={'bold'}
            >
              {isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}
            </Text>
          </XyroLoading>
        </Button>
      </Form>

      <OrSeparator
        mt='2'
        mb='2'
      />

      <Button
        onClick={handleConnectWallet}
        className={styles.createAccountButton}
        disabled={isConnectWalletButtonDisabled}
      >
        <Text
          className={
            isConnectWalletButtonDisabled ? 'color-black' : 'color-white'
          }
          size={'2'}
          weight={'bold'}
        >
          CONNECT WALLET
        </Text>
      </Button>

      <Flex
        align={'center'}
        justify={'center'}
        gap={'1'}
      >
        <Text
          className='color-gray-light'
          size={'1'}
          weight={'medium'}
        >
          {isSignUp ? 'Already have an account?' : 'Dont’t have an account?'}
        </Text>

        <Text
          color='cyan'
          size={'1'}
          weight={'bold'}
          className='cursor-pointer'
          onClick={handleClickFlowSwitch}
        >
          {isSignUp ? 'Log In' : 'Create one'}
        </Text>
      </Flex>
    </Flex>
  )
}
