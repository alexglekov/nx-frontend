import { gql } from '__generated__'

export const GET_USER_BETS_STATISTIC = gql(`
  query getUserBetsStatistic($userId: String!) {
    getUserBetsStatistic(data: { userId: $userId }) {
      totalBets
      totalBetsAmount
      winrate
      largestWin
    }
  }
`)
