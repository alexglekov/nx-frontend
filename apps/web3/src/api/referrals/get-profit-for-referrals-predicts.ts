import { gql } from '__generated__'

export const GET_PROFIT_FOR_REFERRALS_REDICTS = gql(`
  query getProfitForReferralsPredicts {
    getProfitForReferralsPredicts {
      availableProfitAmountToWithdraw
      minProfitAmountToWithdraw
    }
  }
`)
