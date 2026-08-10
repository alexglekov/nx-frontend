import { useEffect, useMemo } from 'react'
import { useReactiveVar, useSubscription } from '@apollo/client'
import {
  SetupsGamePoolFragment,
  SetupsGameFragment,
  GameStatus
} from '__generated__/graphql'
import { SUBSCRIPTION_SETUPS_GAME_CHANGED } from 'api/mode-setups/subscribe-setup'
import { selectedSetupVar } from '../store/selected-setup'
import { setupsWinnerModalGameVar } from '../store/winner-modal'

export const useSetupGameSubscription = (
  gameId: string,
  pools: {
    takeProfitPool: SetupsGamePoolFragment
    stopLossPool: SetupsGamePoolFragment
  }
) => {
  const { data: subscriptionData } = useSubscription(
    SUBSCRIPTION_SETUPS_GAME_CHANGED,
    {
      variables: {
        gameId
      }
    }
  )

  const selectedSetupGame = useReactiveVar(selectedSetupVar)

  useEffect(() => {
    const setupSubscriptionData =
      subscriptionData?.setupGameChanged as SetupsGameFragment

    if (
      !setupSubscriptionData ||
      setupSubscriptionData.status !== GameStatus.Close ||
      setupSubscriptionData.id !== selectedSetupGame?.id
    )
      return

    setupsWinnerModalGameVar(setupSubscriptionData)
  }, [subscriptionData, selectedSetupGame])

  const { takeProfitPool, stopLossPool } = useMemo(() => {
    const updatedState = subscriptionData?.setupGameChanged || null
    if (!updatedState) return pools

    return { ...pools, ...updatedState }
  }, [pools, subscriptionData?.setupGameChanged])

  return { pools: { takeProfit: takeProfitPool, stopLoss: stopLossPool } }
}
