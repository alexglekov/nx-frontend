import { useQuery } from '@apollo/client'

export function useGamesCounters() {
  // TODO: remove counters and count games by fetched games

  // const { data, error, loading, refetch } =
  // useQuery<GetSetupGamesCountQuery>(COUNTERS_SETUP_GAMES)

  // const counters = data?.getSetupGamesCount
  const counters = {
    activeGamesCount: 0,
    closeGamesCount: 0
  }

  return {
    counters,
    error: null,
    loading: false,
    refetch: null
  }
}
