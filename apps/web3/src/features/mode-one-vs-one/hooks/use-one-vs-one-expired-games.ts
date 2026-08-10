import { useCallback } from 'react'
import { useLazyQuery, useReactiveVar } from '@apollo/client'
import {
  GameStatus,
  GetOwnOneVsOneGamesQuery,
  OneVsOneGame
} from '__generated__/graphql'
import { GET_OWN_ONE_VS_ONE_GAMES } from 'api/mode-1vs1/get-own-1vs1-games'
import { ONE_VS_ONE_TABLE_TAKE_VAR } from '../constants'
import {
  oneVsOneExpiredGamesTotalVar,
  oneVsOneExpiredGamesVar,
  oneVsOneMyGamesSkipVar
} from '../store/my-games-store'
import { addOneVsOneGameToStore } from '../utils/add-one-vs-one-game-to-store'

export const useOneVsOneExpiredGames = () => {
  const games = useReactiveVar(oneVsOneExpiredGamesVar)
  const skip = useReactiveVar(oneVsOneMyGamesSkipVar)
  const total = useReactiveVar(oneVsOneExpiredGamesTotalVar)

  const addOneVsOneExpiredGame = useCallback(
    (game: OneVsOneGame) =>
      addOneVsOneGameToStore({
        game,
        games,
        gamesReactiveVar: oneVsOneExpiredGamesVar
      }),
    [games]
  )

  const setOneVsOneExpiredGames = useCallback(
    (newGames: OneVsOneGame[]) => oneVsOneExpiredGamesVar(newGames),
    []
  )

  const [getGames, { loading, error, refetch }] =
    useLazyQuery<GetOwnOneVsOneGamesQuery>(GET_OWN_ONE_VS_ONE_GAMES, {
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      variables: {
        filters: {
          status: [GameStatus.Open],
          isAccepted: false,
          isExpired: true
        },
        pagination: { skip, take: ONE_VS_ONE_TABLE_TAKE_VAR }
      },
      onCompleted: data => {
        if (!data.getOwnOneVsOneGames.games) return

        setOneVsOneExpiredGames(
          data.getOwnOneVsOneGames.games as OneVsOneGame[]
        )
        oneVsOneExpiredGamesTotalVar(data.getOwnOneVsOneGames.total)
      }
    })

  return {
    games,
    total,
    addOneVsOneExpiredGame,
    setOneVsOneExpiredGames,
    getGames,
    loading,
    error,
    refetch
  }
}
