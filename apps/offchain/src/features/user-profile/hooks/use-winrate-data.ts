import { useQuery } from '@apollo/client'
import { GET_WINRATE_DATA } from 'api/user-profile/get-winrate-data'
import { useMemo } from 'react'
import { transformWinrateDataToChartData } from '../utils/transform-winrate-data-to-chart-data'

export const useWinrateData = (userId: string) => {
  const { data, loading } = useQuery(GET_WINRATE_DATA, {
    variables: {
      data: {
        userId,
        period: 'WEEK'
      }
    },
    fetchPolicy: 'no-cache'
  })

  const winrateData = useMemo(() => {
    if (!data?.getUserGamesWinratesHistory) return []
    return transformWinrateDataToChartData(
      data?.getUserGamesWinratesHistory?.average
    )
  }, [data?.getUserGamesWinratesHistory])

  return {
    winrateData,
    loading
  }
}
