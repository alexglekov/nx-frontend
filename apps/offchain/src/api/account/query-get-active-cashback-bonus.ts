import { gql } from '__generated__'

export const QUERY_GET_ACTIVE_CASHBACK_BONUS = gql(`
  query getActiveCashbackBonus {
    getActiveCashbackBonus {
      active {
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
  }
`)
