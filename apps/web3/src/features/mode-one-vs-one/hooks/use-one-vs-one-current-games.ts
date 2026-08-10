import { useCallback } from 'react'
import { useLazyQuery, useReactiveVar } from '@apollo/client'
import {
  GameStatus,
  GetOwnOneVsOneGamesQuery,
  OneVsOneGame
} from '__generated__/graphql'
import { GET_OWN_ONE_VS_ONE_GAMES } from 'api/mode-1vs1/get-own-1vs1-games'
import { useGameTimers } from 'shared/hooks/use-game-timers'
import { userVar } from 'shared/store/user'
import { ONE_VS_ONE_TABLE_TAKE_VAR } from '../constants'
import {
  oneVsOneCurrentGamesTotalVar,
  oneVsOneCurrentGamesVar,
  oneVsOneMyGamesSkipVar
} from '../store/my-games-store'
import { addOneVsOneGameToStore } from '../utils/add-one-vs-one-game-to-store'

export const useOneVsOneCurrentGames = () => {
  const games = useReactiveVar(oneVsOneCurrentGamesVar)
  const user = useReactiveVar(userVar)
  const skip = useReactiveVar(oneVsOneMyGamesSkipVar)
  const total = useReactiveVar(oneVsOneCurrentGamesTotalVar)

  const addOneVsOneCurrentGame = useCallback(
    (game: OneVsOneGame) =>
      addOneVsOneGameToStore({
        game,
        games,
        gamesReactiveVar: oneVsOneCurrentGamesVar
      }),
    [games]
  )

  const setOneVsOneCurrentGames = useCallback(
    (newGames: OneVsOneGame[]) => oneVsOneCurrentGamesVar(newGames),
    []
  )

  const [getGames, { loading, error, refetch }] =
    useLazyQuery<GetOwnOneVsOneGamesQuery>(GET_OWN_ONE_VS_ONE_GAMES, {
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      variables: {
        filters: {
          status: [GameStatus.Open],
          opponentId: user?.id,
          isAccepted: true,
          isExpired: false
        },
        pagination: { skip, take: ONE_VS_ONE_TABLE_TAKE_VAR }
      },
      onCompleted: data => {
        if (!data.getOwnOneVsOneGames.games) return

        setOneVsOneCurrentGames(
          data.getOwnOneVsOneGames.games as OneVsOneGame[]
        )
        oneVsOneCurrentGamesTotalVar(data.getOwnOneVsOneGames.total)
      }
    })

  useGameTimers(games, refetch, 'game', 60 * 1e3)

  return {
    games,
    total,
    addOneVsOneCurrentGame,
    setOneVsOneCurrentGames,
    getGames,
    loading,
    error,
    refetch
  }
}
