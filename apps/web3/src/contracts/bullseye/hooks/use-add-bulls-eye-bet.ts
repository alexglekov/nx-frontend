/* eslint-disable max-statements */
import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Maybe } from '__generated__/graphql'
import { DEFAULT_CONTRACT_VERSION } from 'contracts/constants'
import { bullsEyeCurrentContractAddressVar } from 'features/mode-bulls-eye/store/bulls-eye-contract-addresses.store'
import { GTM_EVENTS } from 'shared/constants/gtm-events'
import { useAssetPriceSubscription } from 'shared/hooks/use-asset-price-subscription'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { balanceVar } from 'shared/store/balance-store'
import { notificationStateVar } from 'shared/store/notification'
import { userVar } from 'shared/store/user'
import { pushGtmEvent } from 'shared/utils/push-gtm-event'
import { zeroAddress } from 'viem'
import { useAccount } from 'wagmi'
import {
  makeBullsEyePredict,
  makeBullsEyePredictFromTreasury,
  makeBullsEyePredictWithPermit
} from '../calls'

const ASSET_PRICE_PERCENT = 0.05 // 5% price of current BTC asset price

// eslint-disable-next-line complexity
export const useAddBullsEyeBet = () => {
  const user = useReactiveVar(userVar)
  const isUserPlayed = user?.hasPlayed || false

  const currentBullsEyeSmartContract = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )

  const assetId = currentBullsEyeSmartContract?.meta?.asset || 'BTC'

  const currentContractAddress =
    currentBullsEyeSmartContract?.contractAddress || zeroAddress
  const currectContractVersion =
    currentBullsEyeSmartContract?.version || DEFAULT_CONTRACT_VERSION
  const isTokenXyro =
    currentBullsEyeSmartContract?.smartContractForXyroToken || false

  const { smartContractAddress: usdcContractAddress } =
    useGetSmartContract('USDC')
  const { smartContractAddress: treasuryContractAddress } =
    useGetSmartContract('Treasury')
  const { smartContractAddress: xyroContractAddress } =
    useGetSmartContract('XyroToken')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const account = useAccount()

  const balance = useReactiveVar(balanceVar)

  const assetPrice = useAssetPriceSubscription(assetId)

  const tokenContractAddress =
    isTokenXyro ? xyroContractAddress : usdcContractAddress

  const treasuryDeposit =
    isTokenXyro ? balance.xyroDeposit : balance.treasuryDeposit
  const treasuryAllowance =
    isTokenXyro ? balance.xyroAllowance : balance.treasuryAllowance
  const balanceAmount = isTokenXyro ? balance.xyroBalance : balance.usdtBalance

  const makePredict = async (pricePrediction: number, betAmount: number) => {
    if (betAmount <= treasuryDeposit) {
      return await makeBullsEyePredictFromTreasury(
        pricePrediction,
        currentContractAddress,
        currectContractVersion,
        isTokenXyro
      )
    }

    if (betAmount <= treasuryAllowance) {
      return await makeBullsEyePredict(
        pricePrediction,
        currentContractAddress,
        currectContractVersion,
        isTokenXyro
      )
    }

    return await makeBullsEyePredictWithPermit(
      account,
      pricePrediction,
      betAmount,
      currentContractAddress,
      tokenContractAddress,
      treasuryContractAddress,
      currectContractVersion,
      isTokenXyro
    )
  }

  // eslint-disable-next-line max-statements, complexity
  const addBullsEyeBet = async (
    pricePrediction: number,
    betAmount: number,
    token?: Maybe<string>
  ) => {
    const assetPricePercent = assetPrice * ASSET_PRICE_PERCENT

    if (!account) {
      notifyOnError(`First login to your account`)

      return
    }

    if (balanceAmount + treasuryDeposit < betAmount) {
      notifyOnError(`Insufficient funds`)

      return
    }

    if (pricePrediction < assetPrice - assetPricePercent) {
      notifyOnError(`Your bet price in too low`)

      return
    }

    if (pricePrediction > assetPrice + assetPricePercent) {
      notifyOnError('Your bet price in too high')
      return
    }

    try {
      setIsLoading(true)

      const tx = await makePredict(pricePrediction, betAmount)

      if (!isUserPlayed) {
        pushGtmEvent(GTM_EVENTS.firstDepositSuccessful, {
          deposit_value: betAmount,
          deposit_currency: token === xyroContractAddress ? 'XYRO' : 'USDT',
          conversion_id: tx,
          userId: user?.id || ''
        })
      } else {
        pushGtmEvent(GTM_EVENTS.depositSuccessful, {
          deposit_value: betAmount,
          deposit_currency: token === xyroContractAddress ? 'XYRO' : 'USDT',
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
    addBullsEyeBet,
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
