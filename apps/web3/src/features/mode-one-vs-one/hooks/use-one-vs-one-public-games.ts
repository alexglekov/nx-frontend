import { useCallback } from 'react'
import { useLazyQuery, useReactiveVar } from '@apollo/client'
import {
  GameStatus,
  GetOneVsOneGamesQuery,
  OneVsOneGame
} from '__generated__/graphql'
import { GET_ONE_VS_ONE_GAMES } from 'api/mode-1vs1/get-1vs1-games'
import { useGameTimers } from '../../../shared/hooks/use-game-timers'
import { ONE_VS_ONE_TABLE_TAKE_VAR } from '../constants'
import {
  oneVsOneGlobalGamesTotalVar,
  oneVsOneGlobalGamesVar,
  oneVsOneOpenGamesSkipVar
} from '../store/global-games-store'
import { addOneVsOneGameToStore } from '../utils/add-one-vs-one-game-to-store'

export const useOneVsOnePublicGames = () => {
  const games = useReactiveVar(oneVsOneGlobalGamesVar)
  const skip = useReactiveVar(oneVsOneOpenGamesSkipVar)
  const total = useReactiveVar(oneVsOneGlobalGamesTotalVar)

  const addOneVsOnePublicGame = useCallback(
    (game: OneVsOneGame) =>
      addOneVsOneGameToStore({
        game,
        games,
        gamesReactiveVar: oneVsOneGlobalGamesVar
      }),
    [games]
  )

  const setOneVsOnePublicGames = useCallback(
    (newGames: OneVsOneGame[]) => oneVsOneGlobalGamesVar(newGames),
    []
  )

  const [getGames, { loading, error, refetch }] =
    useLazyQuery<GetOneVsOneGamesQuery>(GET_ONE_VS_ONE_GAMES, {
      onCompleted: data => {
        if (!data?.getOneVsOneGames.games) return

        setOneVsOnePublicGames(data.getOneVsOneGames.games as OneVsOneGame[])
        oneVsOneGlobalGamesTotalVar(data.getOneVsOneGames.total)
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'no-cache',
      variables: {
        filters: {
          isExpired: false,
          isPrivate: false,
          isAccepted: false,
          status: [GameStatus.Open],
          opponentId: null
        },
        pagination: {
          skip,
          take: ONE_VS_ONE_TABLE_TAKE_VAR
        }
      }
    })

  useGameTimers(games, refetch, 'predict')

  return {
    games,
    total,
    addOneVsOnePublicGame,
    setOneVsOnePublicGames,
    getGames,
    loading,
    error,
    refetch
  }
}
