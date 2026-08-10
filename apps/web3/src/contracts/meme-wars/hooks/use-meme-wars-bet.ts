import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { GTM_EVENTS } from 'shared/constants/gtm-events'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { balanceVar } from 'shared/store/balance-store'
import { notificationStateVar } from 'shared/store/notification'
import { userVar } from 'shared/store/user'
import { Web3Adress } from 'shared/types'
import { pushGtmEvent } from 'shared/utils/push-gtm-event'
import { zeroAddress } from 'viem'
import { useAccount } from 'wagmi'
import {
  makeMemeWarsPredict,
  makeMemeWarsPredictWithDeposit,
  makeMemeWarsPredictWithPermit
} from '../calls'

// eslint-disable-next-line max-statements
export const useMemeWarsBet = () => {
  const user = useReactiveVar(userVar)
  const isUserPlayed = user?.hasPlayed || false

  const { smartContractAddress, getContractEntryByAddress } =
    useGetSmartContract('Race')

  const currentMemeWarsSmartContract =
    getContractEntryByAddress(smartContractAddress)

  const currentContractAddress =
    currentMemeWarsSmartContract?.contractAddress || zeroAddress
  const tokenContractAddress =
    currentMemeWarsSmartContract?.meta?.token || zeroAddress

  const { smartContractAddress: treasuryContractAddress } =
    useGetSmartContract('Treasury')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const account = useAccount()

  const balance = useReactiveVar(balanceVar)

  const treasuryDeposit = balance.treasuryDeposit
  const treasuryAllowance = balance.treasuryAllowance
  const balanceAmount = balance.usdtBalance

  const addPredict = async (amount: number, assetId: number) => {
    if (amount <= treasuryDeposit) {
      const result = await makeMemeWarsPredictWithDeposit(
        amount,
        assetId,
        currentContractAddress,
        account
      )

      return result
    }

    if (amount <= treasuryAllowance) {
      const result = await makeMemeWarsPredict(
        amount,
        assetId,
        currentContractAddress
      )

      return result
    }

    const result = await makeMemeWarsPredictWithPermit(
      amount,
      assetId,
      currentContractAddress,
      account,
      tokenContractAddress as Web3Adress,
      treasuryContractAddress
    )

    return result
  }

  // eslint-disable-next-line max-statements
  const addMemeWarsBet = async (amount: number, assetId: number) => {
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

      const tx = await addPredict(amount, assetId)

      if (!isUserPlayed) {
        pushGtmEvent(GTM_EVENTS.firstDepositSuccessful, {
          deposit_currency: 'USDT',
          deposit_value: amount,
          conversion_id: tx,
          userId: user?.id || ''
        })
      } else {
        pushGtmEvent(GTM_EVENTS.depositSuccessful, {
          deposit_currency: 'USDT',
          deposit_value: amount,
          conversion_id: tx,
          userId: user?.id || ''
        })
      }
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
    addMemeWarsBet,
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
