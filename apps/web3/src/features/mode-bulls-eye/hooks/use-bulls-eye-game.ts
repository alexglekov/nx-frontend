import { useEffect, useMemo } from 'react'
import { useQuery, useReactiveVar, useSubscription } from '@apollo/client'
import { BullseyeGame } from '__generated__/graphql'
import { GET_CURRENT_BULLS_EYE_GAME } from 'api/mode-bulls-eye/get-current-bulls-eye-game'
import { SUBSCRIPTION_BULLS_EYE_GAME } from 'api/mode-bulls-eye/subscription-bulls-eye-game'
import { useNotifyHighGasFee } from 'shared/hooks/use-notify-high-gas-fee'
import { zeroAddress } from 'viem'
import { bullsEyeCurrentContractAddressVar } from '../store/bulls-eye-contract-addresses.store'
import { bullsEyeGameVar } from '../store/game.store'
import { useBullsEyeBetsLoader } from './use-bulls-eyes-bets-loader'

// eslint-disable-next-line max-statements
export const useBullsEyeGame = () => {
  const currentBullsEyeSmartContract = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )

  const { refetch: refetchBullsEyeBets } = useBullsEyeBetsLoader()

  const { data: bullsEyeGameQuery, error: bullsEyeGameQueryError } = useQuery(
    GET_CURRENT_BULLS_EYE_GAME,
    {
      fetchPolicy: 'no-cache',
      variables: {
        data: {
          contractAddress:
            currentBullsEyeSmartContract?.contractAddress || zeroAddress
        }
      }
    }
  )

  const { data: bullsEyeGameSubscription } = useSubscription(
    SUBSCRIPTION_BULLS_EYE_GAME,
    {
      fetchPolicy: 'no-cache',
      variables: {
        contractAddress:
          currentBullsEyeSmartContract?.contractAddress || zeroAddress
      }
    }
  )

  useNotifyHighGasFee(bullsEyeGameQueryError || null)

  const bullsEyeGameQueryData = bullsEyeGameQuery?.getCurrentBullseyeGame
  const bullsEyeGameSubscriptionData =
    bullsEyeGameSubscription?.bullseyeGameChanged

  const game = useMemo(() => {
    return {
      ...bullsEyeGameQueryData,
      ...bullsEyeGameSubscriptionData
    } as BullseyeGame
  }, [bullsEyeGameQueryData, bullsEyeGameSubscriptionData])

  useEffect(() => {
    if (!game) return

    bullsEyeGameVar(game)
  }, [game])

  useEffect(() => {
    refetchBullsEyeBets()
  }, [refetchBullsEyeBets])
}
