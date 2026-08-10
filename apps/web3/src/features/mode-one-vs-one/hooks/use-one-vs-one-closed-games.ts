import { useCallback } from 'react'
import { useLazyQuery, useReactiveVar } from '@apollo/client'
import {
  GameStatus,
  GetOwnOneVsOneGamesQuery,
  OneVsOneGame
} from '__generated__/graphql'
import { GET_OWN_ONE_VS_ONE_GAMES } from 'api/mode-1vs1/get-own-1vs1-games'
import { userVar } from 'shared/store/user'
import { ONE_VS_ONE_TABLE_TAKE_VAR } from '../constants'
import {
  oneVsOneClosedGamesTotalVar,
  oneVsOneClosedGamesVar,
  oneVsOneMyGamesSkipVar
} from '../store/my-games-store'
import { addOneVsOneGameToStore } from '../utils/add-one-vs-one-game-to-store'

export const useOneVsOneClosedGames = () => {
  const games = useReactiveVar(oneVsOneClosedGamesVar)
  const user = useReactiveVar(userVar)
  const skip = useReactiveVar(oneVsOneMyGamesSkipVar)
  const total = useReactiveVar(oneVsOneClosedGamesTotalVar)

  const addOneVsOneClosedGame = useCallback(
    (game: OneVsOneGame) =>
      addOneVsOneGameToStore({
        game,
        games,
        gamesReactiveVar: oneVsOneClosedGamesVar
      }),
    [games]
  )

  const setOneVsOneClosedGames = useCallback(
    (newGames: OneVsOneGame[]) => oneVsOneClosedGamesVar(newGames),
    []
  )

  const [getGames, { loading, error, refetch }] =
    useLazyQuery<GetOwnOneVsOneGamesQuery>(GET_OWN_ONE_VS_ONE_GAMES, {
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      variables: {
        filters: {
          status: [GameStatus.Close],
          opponentId: user?.id,
          isAccepted: true
        },
        pagination: { skip, take: ONE_VS_ONE_TABLE_TAKE_VAR }
      },
      onCompleted: data => {
        if (!data.getOwnOneVsOneGames.games) return

        setOneVsOneClosedGames(data.getOwnOneVsOneGames.games as OneVsOneGame[])
        oneVsOneClosedGamesTotalVar(data.getOwnOneVsOneGames.total)
      }
    })

  return {
    games,
    total,
    addOneVsOneClosedGame,
    setOneVsOneClosedGames,
    getGames,
    loading,
    error,
    refetch
  }
}
