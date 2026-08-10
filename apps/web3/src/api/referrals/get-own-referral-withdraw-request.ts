import { gql } from '__generated__'

export const GET_OWN_REFERRAL_WITHDRAW_REQUEST = gql(`
  query getOwnReferralWithdrawRequests {
    getOwnReferralWithdrawRequests(
      filters: {}
      pagination: { skip: 0, take: 5 }
    ) {
      skip
      take
      total
      requests {
        id
        status
        amount
        cancelReason
        transactionHash
        createdAt
        updatedAt
        user {
          wallet {
            address
          }
        }
      }
    }
  }
`)
