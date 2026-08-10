import { gql } from '__generated__'

export const QUERY_GET_CASHBACK_SUMMARY = gql(`
  query getCashbackSummary {
    getCashbackSummary {
      period {
        id
        startDate
        endDate
      }
      cashbackAmount
      applicableLevel
      commissionPaid
      txHash
      status
    }
  }
`)
