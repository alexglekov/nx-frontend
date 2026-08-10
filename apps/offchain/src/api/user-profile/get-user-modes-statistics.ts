import { gql } from '__generated__'

export const GET_USER_MODES_STATISTICS = gql(`
query statistics($userId: String!) {
  getUserSetupPredictsStatistic(userId: $userId) {
    totalGames
    totalWins
    winPercentage
    earned
  }
  getUserSetupGamesStatistic(userId: $userId) {
    totalPlayersOnGames
    totalGames
    earned
    totalTakeProfitClosedGames
    totalTakeProfitClosedGamesPercentage
    totalStopLossClosedGames
    totalStopLossClosedGamesPercentage
    totalRejectedGames
    totalRejectedGamesPercentage
  }
  getUserBullseyePredictsStatistic(userId: $userId) {
    totalGames
    totalWins
    winPercentage
    earned
  }
  getUserUpDownPredictsStatistic(userId: $userId) {
    totalGames
    totalWins
    winPercentage
    earned
  }
  getUserOneVsOnePredictsStatistic(userId: $userId) {
    totalGames
    totalWins
    winPercentage
    earned
  }
}
`)
