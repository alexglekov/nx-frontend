/* eslint-disable max-statements */
import { useCallback } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { VERIFY_METAMASK } from 'api/auth/verify-metamask-signature'
import { reconnectWs } from 'app/apollo-middlewares'
import { WELCOME_QUERY_NAME } from 'shared/constants'
import { isBetaWelcomeDialogOpenedVar } from 'shared/store/dialogs'
import { toQueryParams } from 'shared/utils/clean-query-params'
import {
  isUserDetectedRegisteredVar,
  referrerIdVar,
  userNameVar,
  walletAddressVar,
  walletSignatureVar,
  wizardModeVar
} from '../store/wizard.store'
import { WizardMode } from '../types'
import { getVariablesToVerify } from '../utils/get-variables-to-verify'
import { notifyOnVerifyingError } from '../utils/notify'
import { resetWizardState } from '../utils/reset-wizard-state'
import { useUser } from './use-user'

export function useVerifyWallet() {
  const { refetchUser } = useUser()
  const wizardMode = useReactiveVar(wizardModeVar)
  const walletSignature = useReactiveVar(walletSignatureVar)
  const walletAddress = useReactiveVar(walletAddressVar)
  const walletUsername = useReactiveVar(userNameVar)
  const referrerId = useReactiveVar(referrerIdVar)
  const isUserDetectedRegistered = useReactiveVar(isUserDetectedRegisteredVar)

  const [verifyMetamaskSignature, { loading }] = useMutation(VERIFY_METAMASK)

  // eslint-disable-next-line max-statements
  const verifyWallet = useCallback(async () => {
    if (!walletAddress || !walletSignature)
      throw new Error('Wallet data is missing')
    if (wizardMode === WizardMode.signUp && !walletUsername)
      throw new Error('Username is missing')

    const variables = getVariablesToVerify(
      wizardMode,
      walletAddress,
      walletSignature,
      walletUsername,
      referrerId,
      isUserDetectedRegistered
    )

    if (!variables) throw new Error('No variables to verify')

    verifyMetamaskSignature({
      variables,
      onError: e => {
        notifyOnVerifyingError(e)
        resetWizardState(wizardMode)
      },
      onCompleted: () => {
        refetchUser()
        reconnectWs()

        if (
          wizardMode === WizardMode.signUp ||
          (wizardMode === WizardMode.connectWallet && !isUserDetectedRegistered)
        ) {
          toQueryParams(WELCOME_QUERY_NAME)
          isBetaWelcomeDialogOpenedVar(true)
        }
      }
    })
  }, [
    verifyMetamaskSignature,
    refetchUser,
    referrerId,
    walletAddress,
    walletSignature,
    walletUsername,
    wizardMode,
    isUserDetectedRegistered
  ])

  return {
    loading,
    verifyWallet
  }
}
