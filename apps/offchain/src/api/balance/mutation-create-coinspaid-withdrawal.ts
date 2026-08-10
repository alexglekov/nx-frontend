import { gql } from '__generated__'

export const MUTATION_CREATE_COINSPAID_WITHDRAWAL = gql(`
  mutation createCoinspaidWithdrawal ($data: CreateCoinspaidWithdrawalInput!) {
    createCoinspaidWithdrawal(data: $data) {
      transactionId
      currency
      status
      requestedAmount
      processingAmount
    }
  }
`)
