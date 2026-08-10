import { Maybe } from 'shared/types'
import { WizardMode } from '../types'

// eslint-disable-next-line max-params
export function getVariablesToVerify(
  wizardMode: WizardMode | null,
  walletAddress: string,
  signature: string,
  username: Maybe<string>,
  referrerId?: Maybe<string>,
  isUserDetectedRegistered?: Maybe<boolean>
) {
  if (wizardMode === null) return null

  const signInVariables = {
    walletAddress,
    signature
  }

  const signUpVariables = {
    ...signInVariables,
    username,
    referrerId
  }

  const connectWalletVariables =
    isUserDetectedRegistered ? signInVariables : signUpVariables

  return (
    wizardMode === WizardMode.signIn ? signInVariables
    : wizardMode === WizardMode.signUp ? signUpVariables
    : wizardMode === WizardMode.connectWallet ? connectWalletVariables
    : null
  )
}
