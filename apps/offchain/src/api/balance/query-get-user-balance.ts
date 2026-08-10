import { gql } from '__generated__'

export const QUERY_GET_USER_BALANCE = gql(`
  query getUserBalance {
    getUserBalance {
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
