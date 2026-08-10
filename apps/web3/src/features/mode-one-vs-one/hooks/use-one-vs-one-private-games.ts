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
  oneVsOnePersonalGamesVar,
  oneVsOneOpenGamesSkipVar,
  oneVsOnePersonalGamesTotalVar
} from '../store/global-games-store'
import { addOneVsOneGameToStore } from '../utils/add-one-vs-one-game-to-store'

export const useOneVsOnePrivateGames = () => {
  const games = useReactiveVar(oneVsOnePersonalGamesVar)
  const user = useReactiveVar(userVar)
  const skip = useReactiveVar(oneVsOneOpenGamesSkipVar)
  const total = useReactiveVar(oneVsOnePersonalGamesTotalVar)

  const addOneVsOnePrivateGame = useCallback(
    (game: OneVsOneGame) =>
      addOneVsOneGameToStore({
        game,
        games,
        gamesReactiveVar: oneVsOnePersonalGamesVar
      }),
    [games]
  )
  const setOneVsOnePrivateGames = useCallback(
    (newGames: OneVsOneGame[]) => oneVsOnePersonalGamesVar(newGames),
    []
  )

  const [getGames, { error, loading, refetch }] =
    useLazyQuery<GetOwnOneVsOneGamesQuery>(GET_OWN_ONE_VS_ONE_GAMES, {
      onCompleted: data => {
        if (!data.getOwnOneVsOneGames.games) return

        setOneVsOnePrivateGames(
          data.getOwnOneVsOneGames.games as OneVsOneGame[]
        )
        oneVsOnePersonalGamesTotalVar(data.getOwnOneVsOneGames.total)
      },
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      variables: {
        filters: {
          isExpired: false,
          isPrivate: true,
          isAccepted: false,
          status: [GameStatus.Open],
          opponentId: user?.id
        },
        pagination: {
          skip: skip,
          take: ONE_VS_ONE_TABLE_TAKE_VAR
        }
      }
    })

  return {
    games,
    total,
    addOneVsOnePrivateGame,
    setOneVsOnePrivateGames,
    getGames,
    error,
    loading,
    refetch
  }
}
