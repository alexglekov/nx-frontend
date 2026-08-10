import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { featureFlags } from 'app/app-feature-flags'
import { isUserAccessDeniedVar } from 'shared/store/user'
import { useReferralCodeFromUrl } from '../hooks/use-referral-code-from-url'
import { SignInDialog } from './auth-dialog-sign-in'
import { AuthDialogSignUp } from './auth-dialog-sign-up'

export const Auth = () => {
  useReferralCodeFromUrl()

  const isAuthAccessDenied = useReactiveVar(isUserAccessDeniedVar)

  /** NOTE: Access to authentication is restricted in some countries */
  if (isAuthAccessDenied) return null

  return (
    <Flex
      gap='2'
      align='center'
    >
      <SignInDialog />

      <AuthDialogSignUp />
    </Flex>
  )
}
