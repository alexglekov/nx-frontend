/* eslint-disable max-lines */
import { ApolloError, useLazyQuery, useReactiveVar } from '@apollo/client'
import { User } from '__generated__/graphql'
import { GET_METAMASK_CHALLENGE } from 'api/auth/get-challenge'
import { GET_USER_BY_ADDRESS } from 'api/general/get-user-by-address'
import { featureFlags } from 'app/app-feature-flags'
import { SPECIAL_REFERRAL_CODE_TO_TRACK } from 'shared/constants'
import { GTM_EVENTS } from 'shared/constants/gtm-events'
import { useQueryParams } from 'shared/hooks/use-query'
import { useResponsive } from 'shared/hooks/use-responsive'
import { globalOverlayLoadingVar } from 'shared/store/global-overlay-state-store'
import { notificationStateVar } from 'shared/store/notification'
import { isUserAuthLoadingVar } from 'shared/store/user'
import { notifyWithArbitraryErrorMessage } from 'shared/utils/notify-on-error'
import { pushGtmEvent } from 'shared/utils/push-gtm-event'
import { useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { CONNECTION_UNKWOWN_ERROR } from '../constants'
import {
  isConnectWalletDialogOpenVar,
  isSignInDialogOpenVar,
  isSignUpDialogOpenVar
} from '../store/dialogs'
import {
  isUserDetectedRegisteredVar,
  walletAddressVar,
  walletSignatureVar,
  wizardFlowTypeVar,
  wizardModeVar,
  wizardStepVar
} from '../store/wizard.store'
import {
  ConnectorProvider,
  WizardFlowType,
  WizardMode,
  WizardStep
} from '../types'
import { getWizardNextStep } from '../utils/get-wizard-next-step'
import { notifyOnChallengeError } from '../utils/notify'
import { resetWizardState } from '../utils/reset-wizard-state'

const { isMainNetFeature } = featureFlags

// eslint-disable-next-line max-statements
export const useConnectWallet = () => {
  const [isMobile] = useResponsive('xs')

  const [getUserByAddress, { loading: userDataLoading }] =
    useLazyQuery(GET_USER_BY_ADDRESS)

  const [getWalletChallenge, { loading: queryLoading }] = useLazyQuery(
    GET_METAMASK_CHALLENGE
  )

  const query = useQueryParams()
  const referralCode = query.get('referralCode') || ''

  const wizardMode = useReactiveVar(wizardModeVar)
  const wizardFlowType = useReactiveVar(wizardFlowTypeVar)
  const wizardStep = useReactiveVar(wizardStepVar)

  const { connectAsync } = useConnect({
    mutation: {
      retry: (failureCount: number, error: Error) => {
        if (
          error.message ===
          "Cannot read properties of undefined (reading 'getChainId')"
        ) {
          notifyOnError(
            'Invalid RPC. Please change your RPC or try again later'
          )
          return false
        }

        if (CONNECTION_UNKWOWN_ERROR.test(error?.message)) return true

        return false
      }
    }
  })

  const { disconnect } = useDisconnect()

  const { signMessageAsync } = useSignMessage()

  /* eslint-disable-next-line max-statements */
  const handleConnection = async (provider: ConnectorProvider) => {
    if (!provider) return
    let errorMessage: string | null = 'Wallet was not connected'

    const account = await connectAsync({
      connector: provider.connector
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).catch((error: any) => {
      if (error?.details || error?.message) {
        if (
          error?.message &&
          String(error.message)
            .toLowerCase()
            .includes('websocket connection failed')
        ) {
          errorMessage =
            'Connection was not established. Try to reconnect or use VPN'
        } else if (
          error?.message &&
          error.message.toLowerCase().includes('user closed modal')
        ) {
          errorMessage = null
        } else {
          errorMessage = error?.details || error?.message
        }
      }

      resetWizardState(wizardMode)
      disconnect()
    })

    const walletAddress = account?.accounts?.[0]

    if (!walletAddress && errorMessage) {
      notifyOnInfo(errorMessage)
    }

    return walletAddress
  }

  // eslint-disable-next-line max-statements
  const handleAuthWallet = async (provider: ConnectorProvider) => {
    if (isMainNetFeature) {
      handleConnectWalletMainNet(provider)
      return
    }

    const walletAddress = await handleConnection(provider)

    if (!walletAddress) return

    const queryVariables = {
      walletAddress
    }
    const { data } = await getWalletChallenge({
      variables: queryVariables,
      onError: (e: ApolloError) => {
        notifyOnChallengeError(e)
      }
    })
    if (!data?.getMetamaskChallenge) throw new Error('No challenge')

    const { challenge } = data?.getMetamaskChallenge

    const signature = await signMessageAsync({ message: challenge }).catch(
      (e: ApolloError) => {
        if (e.message.includes('switch chain')) {
          notifyOnInfo(
            'Please, swith your chain to Arbitrum manually and try again'
          )

          disconnect()
          throw new Error('Wallet was not connected')
        }

        notifyOnError(e.message)
        disconnect()
      }
    )

    if (!(signature && walletAddress)) {
      notifyWithArbitraryErrorMessage(
        'Cannot connect to your wallet. Please, retry'
      )
      return
    }

    walletSignatureVar(signature)
    walletAddressVar(walletAddress)

    const nextStep = getWizardNextStep(wizardMode, wizardFlowType, wizardStep)

    wizardStepVar(nextStep || WizardStep.init)

    if (wizardMode === WizardMode.signUp) {
      isSignUpDialogOpenVar(true)
    } else {
      isSignInDialogOpenVar(true)
    }
  }

  const handleConnectWallet = (provider: ConnectorProvider) => {
    handleConnection(provider)
  }

  // eslint-disable-next-line max-statements
  const handleConnectWalletMainNet = async (provider: ConnectorProvider) => {
    isUserAuthLoadingVar(true)

    handleConnection(provider)
      .then(async walletAddress => {
        if (!walletAddress) return

        const queryVariables = {
          walletAddress
        }
        const { data } = await getWalletChallenge({
          variables: queryVariables,
          onError: (e: ApolloError) => {
            notifyOnChallengeError(e)
          }
        })

        if (!data?.getMetamaskChallenge) throw new Error('No challenge')

        const { challenge } = data?.getMetamaskChallenge

        const signature = await signMessageAsync({ message: challenge }).catch(
          (e: ApolloError) => {
            if (e.message.includes('switch chain')) {
              notifyOnInfo(
                'Please, swith your chain to Arbitrum manually and try again'
              )

              disconnect()

              throw new Error('Wallet was not connected')
            }

            notifyOnError(e.message)
            disconnect()
          }
        )

        return { signature, walletAddress }
      })
      // eslint-disable-next-line max-statements
      .then(async data => {
        const { signature, walletAddress } = data || {}

        if (!(signature && walletAddress)) {
          notifyWithArbitraryErrorMessage(
            'Cannot connect to your wallet. Please, retry'
          )
          return
        }

        walletSignatureVar(signature)
        walletAddressVar(walletAddress)

        if (isMobile) {
          globalOverlayLoadingVar(true)
        }

        const queryUserData = await getUserByAddress({
          variables: {
            address: walletAddress
          },
          onCompleted: () => isMobile && globalOverlayLoadingVar(false),
          onError: () => {
            isMobile && globalOverlayLoadingVar(false)
          }
        })

        const userData = queryUserData.data?.getUserByAddress as User

        const isUserExists = Boolean(userData?.id)

        if (isUserExists) {
          isUserDetectedRegisteredVar(true)

          wizardStepVar(WizardStep.done)
        } else {
          wizardFlowTypeVar(WizardFlowType.web3)

          wizardStepVar(WizardStep.name)

          if (referralCode === SPECIAL_REFERRAL_CODE_TO_TRACK) {
            pushGtmEvent(GTM_EVENTS.uniqueReferrerRegister, {
              code: referralCode,
              conversion_id: walletAddress
            })
          } else {
            pushGtmEvent(GTM_EVENTS.registrationComplete, {
              conversion_id: walletAddress
            })
          }

          // eslint-disable-next-line no-console
          console.log('User does not exist')
        }

        isConnectWalletDialogOpenVar(true)
      })
      .finally(() => isUserAuthLoadingVar(false))
  }

  return {
    handleAuthWallet,
    handleConnectWallet,
    loading: queryLoading || userDataLoading
  }
}

const notifyOnInfo = (message: string) => {
  notificationStateVar({
    isOpen: true,
    type: 'info',
    title: 'Info',
    description: message
  })
}

const notifyOnError = (message: string) => {
  notificationStateVar({
    isOpen: true,
    type: 'error',
    title: 'Error!',
    description: message
  })
}
