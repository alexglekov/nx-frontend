import { gql } from '__generated__'

export const GET_USER_PENDING_SETUP_GAMES = gql(`
  query getUserPendingSetupGames($userId: String!) {
    getUserPendingSetupGames(userId: $userId)
  }  

`)
