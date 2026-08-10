import { gql } from '__generated__'

export const GET_REVENUE_TXS = gql(`
  query getRevenueTxs {
    getRevenueTxs {
      revenueTxs {
        txhash
        token
        amount
        timestamp
      }
    }
  }
`)
