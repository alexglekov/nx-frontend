import { gql } from '__generated__'

export const REWARDS_GET_USER_LEVELS = gql(`
  query getLevels {
    getLevels {
      id
      name
      commissionsToPay
      cashReward
      pointReward
      cashBackPercent
    }
  }
`)
