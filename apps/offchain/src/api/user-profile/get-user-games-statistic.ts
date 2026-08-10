import { gql } from '__generated__'

export const GET_USER_GAMES_STATISTIC = gql(`
  query getUserGamesStatistic($userId: String!) {
    getUserGamesStatistic(userId: $userId) {
      totalGames
      winPercentage
      earned
      largestWin {
        pnl
        createdAt
        gameType
        amount
      }
    }
  }
`)
