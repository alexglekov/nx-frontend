import { gql } from '__generated__'

export const GET_USER_BY_ID = gql(`
  query getUserById($userId: String!) {
    getUserById(userId: $userId) {
      ...Me
    }
    getLoyaltyProgressByUserId(userId: $userId) {
      lvl
      tier
      amount
      userId
    }
  }
`)
