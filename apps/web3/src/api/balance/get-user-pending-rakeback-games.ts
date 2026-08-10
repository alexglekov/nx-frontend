import { gql } from '__generated__'

export const GET_USER_PENDING_RAKEBACK_GAMES = gql(`
  query getUserPendingRakebackGames($userId: String!) {
    getUserPendingRakebackGames(userId: $userId) {
      gameId
      index
    }
  }  
`)
