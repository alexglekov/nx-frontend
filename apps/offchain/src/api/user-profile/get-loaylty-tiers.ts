import { gql } from '__generated__'

export const GET_LOYALTY_TIERS = gql(`
  query loyaltyTiers {
    loyaltyTiers {
      tier
      levels {
        lvl
        turnover
        cashback
        wager
        prize {
          type
          amount
          wager
        }
      }
    }
  }
`)
