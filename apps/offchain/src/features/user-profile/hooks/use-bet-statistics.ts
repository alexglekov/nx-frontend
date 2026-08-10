import { useQuery } from '@apollo/client'
import { GetUserGamesStatisticQuery } from '__generated__/graphql'
import { GET_USER_GAMES_STATISTIC } from 'api/user-profile/get-user-games-statistic'

export function useHomeBetStatistics(userId?: string) {
  const { data, loading, error } = useQuery<GetUserGamesStatisticQuery>(
    GET_USER_GAMES_STATISTIC,
    {
      variables: {
        userId: userId ?? ''
      },
      skip: !userId
    }
  )

  const statistics = data?.getUserGamesStatistic

  return {
    statistics,
    loading,
    error
  }
}
