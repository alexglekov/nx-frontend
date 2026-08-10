/* eslint-disable max-statements */
import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { APP_CHAIN, wagmiConfig } from 'app/wagmi-config'
import {
  isConnectWalletDialogOpenVar,
  isConnectWalletOpenVar
} from 'features/auth/store/dialogs'
import { WalletStateStatus } from 'shared/constants'
import { userVar } from 'shared/store/user'
import { notifyOnUnknownError } from 'shared/utils/notify-on-error'
import { addChain, SwitchChainErrorType } from 'viem/actions'
import { useAccount, useSwitchChain } from 'wagmi'
import { wizardModeVar } from '../../features/auth/store/wizard.store'
import { WizardMode } from '../../features/auth/types'

export const useWallet = () => {
  const user = useReactiveVar(userVar)
  const [isLoading, setIsLoading] = useState(false)

  const { chainId: userChainId, isConnected } = useAccount()
  const { switchChainAsync } = useSwitchChain()

  const isChainIdValid = APP_CHAIN.id === userChainId
  const isWalletReady = isConnected && isChainIdValid

  const title = getTitleByUserConditions(
    Boolean(user),
    isConnected,
    isChainIdValid
  )

  const walletStateKey = getStatusKeyByUserConditions(
    Boolean(user),
    isConnected,
    isChainIdValid
  )

  const handlePrepareWallet = async () => {
    setIsLoading(true)

    if (!user) {
      isConnectWalletDialogOpenVar(true)
      wizardModeVar(WizardMode.connectWallet)
    }

    if (!isConnected) {
      isConnectWalletOpenVar(true)
      setIsLoading(false)
      return
    }

    if (!isChainIdValid) {
      await switchChainAsync({ chainId: APP_CHAIN.id })
        .catch((error: SwitchChainErrorType) => {
          notifyOnUnknownError(error)
          addChain(wagmiConfig.getClient(), { chain: APP_CHAIN })
        })
        .finally(() => {
          setIsLoading(false)
        })
      return
    }
  }

  return {
    isReady: isWalletReady,
    isChainIdValid,
    isConnected,
    title,
    handlePrepareWallet,
    loading: isLoading,
    walletStateKey
  }
}

const getTitleByUserConditions = (
  user: boolean,
  isConnected: boolean,
  isChainIdValid: boolean
) => {
  if (!user) return 'Sign in to Play'

  if (!isConnected) return 'Connect wallet'

  if (!isChainIdValid) return 'Switch chain'

  return null
}

const { signInToPlay, connectWallet, switchChain } = WalletStateStatus

const getStatusKeyByUserConditions = (
  user: boolean,
  isConnected: boolean,
  isChainIdValid: boolean
) => {
  if (!user) return signInToPlay

  if (!isConnected) return connectWallet

  if (!isChainIdValid) return switchChain

  return null
}
