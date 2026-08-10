import { gql } from '@apollo/client'

export const GET_PAYMENT_TRANSACTIONS = gql`
  query listTransactions($data: ListTransactionsInput!) {
    listTransactions(data: $data) {
      id
      txid
      confirmations
      status
      createdAt
      type
      currency
      amount
      amountUsd
      address
      fees
    }
  }
`
