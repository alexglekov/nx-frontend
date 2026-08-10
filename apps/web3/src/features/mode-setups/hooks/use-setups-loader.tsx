import { useQuery } from '@apollo/client'
import { useFragment } from '__generated__'
import { GameStatus } from '__generated__/graphql'
import { FRAGMENT_SETUPS_GAME, GET_SETUPS_GAMES } from 'api/mode-setups'

export function useSetupsLoader() {
  const { data, error, loading, refetch } = useQuery(GET_SETUPS_GAMES, {
    variables: {
      filters: {
        status: [Open, Reject, Close]
      },
      pagination: {
        skip: 0,
        take: 20
      }
    }
  })

  const games = useFragment(FRAGMENT_SETUPS_GAME, data?.getSetupGames.games)

  const openGames = games?.filter(game => [Open].includes(game.status))

  const completedGames = games?.filter(game =>
    [Reject, Close].includes(game.status)
  )

  return {
    openGames,
    completedGames,
    error,
    loading,
    refetch
  }
}

const { Open, Close, Reject } = GameStatus