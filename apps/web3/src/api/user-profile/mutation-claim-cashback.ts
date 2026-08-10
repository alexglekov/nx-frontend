import { gql } from '__generated__'

export const MUTATION_CLAIM_CASHBACK = gql(`
  mutation claimCashback($periodId: String!) {
    claimCashback(periodId: $periodId) {
      id
      userLevelId
      status
      amount
      commissionsPaid
      cashbackPeriodId
      txHash
      userLevel {
        id
        commissionsPaid
        levelId
        userId
        claimedOnLevel
        isCashBackReceived
        requestedOnCashBackValue
        txHash
        progressPercent
      }
      period {
        id
        startDate
        endDate
      }
    }
  }
`)
