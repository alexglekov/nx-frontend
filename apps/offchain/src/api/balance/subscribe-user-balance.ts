import { gql } from '__generated__'

export const SUBSCRIBE_USER_BALANCE = gql(`
  subscription userBalanceChanged {
    userBalanceChanged {
      id
      accountId
      userId
      amount
      bonusAmount
      bonusAccountId
      createdAt
    }
  }
`)
