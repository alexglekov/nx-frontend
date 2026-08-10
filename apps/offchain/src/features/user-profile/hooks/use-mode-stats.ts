import { useQuery } from '@apollo/client'
import {
  User,
  UserBullseyePredictsStatistic,
  UserOneVsOneExactPricePredictsStatistic,
  UserSetupGamesStatistic,
  UserSetupPredictsStatistic,
  UserUpDownPredictsStatistic
} from '__generated__/graphql'
import { GET_USER_MODES_STATISTICS } from 'api/user-profile/get-user-modes-statistics'
import { GameModes } from 'shared/types'

type GetModesStatisticsQueryResult = {
  getUserSetupPredictsStatistic: UserSetupPredictsStatistic
  getUserSetupGamesStatistic: UserSetupGamesStatistic
  getUserBullseyePredictsStatistic: UserBullseyePredictsStatistic
  getUserUpDownPredictsStatistic: UserUpDownPredictsStatistic
  getUserOneVsOnePredictsStatistic: UserOneVsOneExactPricePredictsStatistic
}

const { bullsEye, oneVsOne, setups, upDown } = GameModes

export const useModeStats = (userId: User['id']) => {
  const { data, loading } = useQuery<GetModesStatisticsQueryResult>(
    GET_USER_MODES_STATISTICS,
    {
      variables: {
        userId
      }
    }
  )

  const modesStatsData = {
    [bullsEye]: data?.getUserBullseyePredictsStatistic,
    [oneVsOne]: data?.getUserOneVsOnePredictsStatistic,
    [setups]: data?.getUserSetupPredictsStatistic,
    [upDown]: data?.getUserUpDownPredictsStatistic
  }

  const createdSetupsData = data?.getUserSetupGamesStatistic

  return {
    modesStatsData,
    createdSetupsData,
    loading
  }
}
