import { gql } from '__generated__'

export const REWARDS_GET_USER_LEVEL = gql(`
  query getUserLevel($userId: String!) {
    getUserLevel(userId: $userId) {
      id
      commissionsPaid
      levelId
      userId
      claimedOnLevel
      isCashBackReceived
      requestedOnCashBackValue
      txHash
      level {
        id
        name
        commissionsToPay
        cashReward
        pointReward
        cashBackPercent
      }
      progressPercent
    }
  }
`)
