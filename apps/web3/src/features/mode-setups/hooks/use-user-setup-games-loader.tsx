import { useEffect } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { useFragment } from '__generated__'
import {
  CreatedSetupGameSubscription,
  GameStatus,
  SetupsGameFragment
} from '__generated__/graphql'
import { FRAGMENT_SETUPS_GAME, GET_SETUPS_USER_GAMES } from 'api/mode-setups'
import { SETUPS_GAME_CREATED } from 'api/mode-setups/subscription-setups-game-created'
import { userVar } from 'shared/store/user'
import { CREATED_SETUPS_TAKE_VAR, CreatedSetupsTableType } from '../constants'
import {
  createdSetupsTableTypeVar,
  skipCreatedSetupsVar
} from '../store/created-setups-store'

/* eslint-disable max-statements */
export function useUserSetupGamesLoader(skipLoading?: boolean) {
  const activeType = useReactiveVar(createdSetupsTableTypeVar)
  const skip = useReactiveVar(skipCreatedSetupsVar)
  const user = useReactiveVar(userVar)

  const isActive = activeType === CreatedSetupsTableType.Active

  const variables = {
    filters: {
      isExpired: !isActive,
      status:
        isActive ? [GameStatus.Open] : [GameStatus.Close, GameStatus.Reject]
    },
    pagination: {
      skip,
      take: CREATED_SETUPS_TAKE_VAR
    }
  }

  const { loading, refetch, error, subscribeToMore, data } = useQuery(
    GET_SETUPS_USER_GAMES,
    {
      variables,
      fetchPolicy: 'cache-and-network',
      skip: skipLoading
    }
  )

  useEffect(() => {
    if (skipLoading) return

    const unsubscribe = subscribeToMore<CreatedSetupGameSubscription>({
      document: SETUPS_GAME_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData?.data?.setupGameCreated || !isActive) return prev

        const newGame = subscriptionData.data
          .setupGameCreated as SetupsGameFragment

        if (newGame.ownerId !== user?.id) return prev

        const currentGames = prev.getUserSetupGames
          .games as SetupsGameFragment[]

        if (currentGames[0]?.id === newGame.id) return prev

        const updatedGames =
          skip === 0 ?
            currentGames.length < CREATED_SETUPS_TAKE_VAR ?
              [newGame, ...currentGames]
            : [newGame, ...currentGames.slice(0, currentGames.length - 1)]
          : currentGames

        return {
          ...prev,
          getUserSetupGames: {
            ...prev.getUserSetupGames,
            games: updatedGames,
            total: prev.getUserSetupGames.total + 1
          }
        }
      }
    })

    return () => unsubscribe()
  }, [subscribeToMore])

  const readonlyData = useFragment(
    FRAGMENT_SETUPS_GAME,
    data?.getUserSetupGames?.games ?? []
  )

  const total = data?.getUserSetupGames?.total ?? 0

  return {
    result: [...readonlyData],
    loading,
    error,
    refetch,
    total
  }
}
