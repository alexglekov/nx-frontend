import { gql } from '__generated__'

export const MUTATION_CREATE_COINSPAID_DEPOSIT = gql(`
  mutation createCoinspaidDeposit ($data: CreateCoinspaidDepositInput!) {
    createCoinspaidDeposit(data: $data) {
      transactionId
      currency
      depositAddress
    }
  }
`)
