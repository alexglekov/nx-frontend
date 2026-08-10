import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Maybe } from '__generated__/graphql'
import { DEFAULT_CONTRACT_VERSION } from 'contracts/constants'
import { upDownButtonsPendingVar } from 'features/mode-up-down/store/game.store'
import { upDownCurrentContractVar } from 'features/mode-up-down/store/up-down-contract-addresses.store'
import { GTM_EVENTS } from 'shared/constants/gtm-events'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { balanceVar } from 'shared/store/balance-store'
import { notificationStateVar } from 'shared/store/notification'
import { userVar } from 'shared/store/user'
import { pushGtmEvent } from 'shared/utils/push-gtm-event'
import { zeroAddress } from 'viem'
import { useAccount } from 'wagmi'
import { Web3Adress } from '../../../shared/types'
import {
  makeUpDownPredict,
  makeUpDownPredictWithDeposit,
  makeUpDownPredictWithPermit
} from '../calls'

// eslint-disable-next-line max-statements
export const useAddUpDownBet = () => {
  const user = useReactiveVar(userVar)
  const isUserPlayed = user?.hasPlayed || false

  const currentUpDownSmartContract = useReactiveVar(upDownCurrentContractVar)

  const currentContractAddress =
    currentUpDownSmartContract?.contractAddress || zeroAddress
  const currectContractVersion =
    currentUpDownSmartContract?.version || DEFAULT_CONTRACT_VERSION
  const isGameForXyroToken =
    currentUpDownSmartContract?.smartContractForXyroToken || false
  const tokenContractAddress =
    currentUpDownSmartContract?.meta?.token || zeroAddress

  const { smartContractAddress: treasuryContractAddress } =
    useGetSmartContract('Treasury')
  const { smartContractAddress: xyroTokenContractAddress } =
    useGetSmartContract('XyroToken')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const account = useAccount()

  const balance = useReactiveVar(balanceVar)

  const treasuryDeposit =
    isGameForXyroToken ? balance.xyroDeposit : balance.treasuryDeposit
  const treasuryAllowance =
    isGameForXyroToken ? balance.xyroAllowance : balance.treasuryAllowance
  const balanceAmount =
    isGameForXyroToken ? balance.xyroBalance : balance.usdtBalance

  const addPredict = async (amount: number, isUp: boolean) => {
    if (amount <= treasuryDeposit) {
      const result = await makeUpDownPredictWithDeposit(
        account,
        isUp,
        amount,
        currentContractAddress,
        currectContractVersion,
        isGameForXyroToken
      )

      return result
    }

    if (amount <= treasuryAllowance) {
      const result = await makeUpDownPredict(
        account,
        isUp,
        amount,
        currentContractAddress,
        currectContractVersion,
        isGameForXyroToken
      )

      return result
    }

    const result = await makeUpDownPredictWithPermit(
      account,
      isUp,
      amount,
      currentContractAddress,
      tokenContractAddress as Web3Adress,
      treasuryContractAddress,
      currectContractVersion,
      isGameForXyroToken
    )

    return result
  }

  // eslint-disable-next-line max-statements, complexity
  const addUpDownBet = async (
    amount: number,
    isUp: boolean,
    token?: Maybe<string>
  ) => {
    if (!account) {
      notifyOnError(`First login to your account`)

      return
    }

    if (balanceAmount + treasuryDeposit < amount) {
      notifyOnError(`Insufficient funds`)

      return
    }

    try {
      setIsLoading(true)

      const result = await addPredict(amount, isUp)

      if (!isUserPlayed) {
        pushGtmEvent(GTM_EVENTS.firstDepositSuccessful, {
          deposit_value: amount,
          deposit_currency:
            token === xyroTokenContractAddress ? 'XYRO' : 'USDT',
          conversion_id: result,
          userId: user?.id || ''
        })
      } else {
        pushGtmEvent(GTM_EVENTS.depositSuccessful, {
          deposit_value: amount,
          deposit_currency:
            token === xyroTokenContractAddress ? 'XYRO' : 'USDT',
          conversion_id: result,
          userId: user?.id || ''
        })
      }

      if (result) {
        upDownButtonsPendingVar(true)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err?.shortMessage || err?.message || 'Something went wrong...'

      setError(errorMessage)
      notifyOnError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    addUpDownBet,
    isLoading,
    error
  }
}

const notifyOnError = (text?: string) =>
  notificationStateVar({
    isOpen: true,
    description: text,
    title: 'Error!',
    type: 'error'
  })
