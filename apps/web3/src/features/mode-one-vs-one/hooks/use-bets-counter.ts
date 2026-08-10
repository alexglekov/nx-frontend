import { useQuery } from '@apollo/client'
import { GetOneVsOneGamesCountQuery } from '__generated__/graphql'
import { COUNTERS_1VS1_GAMES } from 'api/mode-1vs1/get-1vs1-counters'

export function useBets1vs1Counters() {
  const { data, error, loading, refetch } =
    useQuery<GetOneVsOneGamesCountQuery>(COUNTERS_1VS1_GAMES)

  const counters = data?.getOneVsOneGamesCount

  return {
    counters,
    error,
    loading,
    refetch
  }
}
