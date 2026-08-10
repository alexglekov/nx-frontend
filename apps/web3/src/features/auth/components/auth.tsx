import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { featureFlags } from 'app/app-feature-flags'
import { isUserAccessDeniedVar } from 'shared/store/user'
import { useReferralCodeFromUrl } from '../hooks/use-referral-code-from-url'
import { AuthDialogConnectWallet } from './auth-dialog-connect-wallet'
import { SignInDialog } from './auth-dialog-sign-in'
import { AuthDialogSignUp } from './auth-dialog-sign-up'

const { isMainNetFeature } = featureFlags

export const Auth = () => {
  useReferralCodeFromUrl()

  const isAuthAccessDenied = useReactiveVar(isUserAccessDeniedVar)

  /** NOTE: Access to authentication is restricted in some countries */
  if (isAuthAccessDenied) return null

  if (isMainNetFeature) return <AuthDialogConnectWallet />

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
