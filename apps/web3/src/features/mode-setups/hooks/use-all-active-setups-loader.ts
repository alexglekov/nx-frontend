import { useEffect } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { useFragment } from '__generated__'
import {
  CreatedSetupGameSubscription,
  GameStatus,
  GetSetupGamesQuery,
  SetupsGameFragment
} from '__generated__/graphql'
import { FRAGMENT_SETUPS_GAME, GET_SETUPS_GAMES } from 'api/mode-setups'
import { SETUPS_GAME_CREATED } from 'api/mode-setups/subscription-setups-game-created'
import { useGameTimers } from 'shared/hooks/use-game-timers'
import { useResponsive } from 'shared/hooks/use-responsive'
import { isChatOpenedVar } from 'shared/store/chat-state-store'
import {
  ACTIVE_SETUPS_TAKE_VAR,
  ACTIVE_SETUPS_TAKE_VAR_WITH_CHAT
} from '../constants'
import { skipAllSetupsVar } from '../store/setups-list-store'

// NOTE: SkipLoading to refuse double subscription
/* eslint-disable max-statements */
export const useAllActiveSetupsLoader = (skipLoading?: boolean) => {
  const skip = useReactiveVar(skipAllSetupsVar)
  const isChatOpened = useReactiveVar(isChatOpenedVar)
  const [isLargeDesctop] = useResponsive(['xxl', 'xxxl'])

  // TODO: Remove on refactoring
  const take =
    !isLargeDesctop && isChatOpened ?
      ACTIVE_SETUPS_TAKE_VAR_WITH_CHAT
    : ACTIVE_SETUPS_TAKE_VAR

  const variables = {
    filters: {
      status: [GameStatus.Open],
      isExpired: false
    },
    pagination: {
      take,
      skip
    }
  }

  const { refetch, loading, data, subscribeToMore } =
    useQuery<GetSetupGamesQuery>(GET_SETUPS_GAMES, {
      variables,
      fetchPolicy: 'cache-and-network',
      skip: skipLoading
    })

  useEffect(() => {
    refetch()
  }, [take])

  useEffect(() => {
    if (skipLoading) return

    const unsubscribe = subscribeToMore<CreatedSetupGameSubscription>({
      document: SETUPS_GAME_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData?.data?.setupGameCreated) return prev

        const newGame = subscriptionData.data.setupGameCreated

        const games = prev?.getSetupGames?.games ?? []
        const updatedGames =
          skip === 0 ?
            games.length < take ?
              [newGame, ...games]
            : [newGame, ...games.slice(0, games.length - 1)]
          : games

        const updatedTotal = prev.getSetupGames.total + 1

        return {
          ...prev,
          getSetupGames: {
            ...prev.getSetupGames,
            games: updatedGames,
            total: updatedTotal
          }
        }
      }
    })

    return () => unsubscribe()
  }, [subscribeToMore])

  const setups = useFragment(
    FRAGMENT_SETUPS_GAME,
    data?.getSetupGames.games ?? []
  )

  useGameTimers<SetupsGameFragment>(setups, refetch, 'predict')

  const total = data?.getSetupGames?.total ?? 0

  return {
    setups,
    total,
    loading,
    refetch
  }
}
