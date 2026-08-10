import { gql } from '__generated__'

export const QUERY_GET_COMPLETED_BONUSES = gql(`
  query getCompletedBonuses {
    getCompletedBonuses {
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
