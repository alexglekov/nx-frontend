import { gql } from '__generated__'

export const QUERY_GET_AVAILABLE_CASHBACK_BONUSES = gql(`
  query getAvailableCashbackBonuses {
    getAvailableCashbackBonuses {
      id
      userId
      type
      category
      status
      name
      bonusTemplateId
      createdAt
      burnedAt
      startedAt
      closedAt
      minutesToGame
      amount
      turnover
      turnoverTarget
      multiplerVolume
      reason
      moveToReal
      initialRealBalance
    }
  }
`)
