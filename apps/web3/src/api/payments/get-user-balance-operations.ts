import { gql } from '@apollo/client'

export const GET_USER_BALANCE_OPERATIONS = gql`
  query getUserBalanceOperations($input: GetBalanceOperationsInput!) {
    getUserBalanceOperations(input: $input) {
      total
      skip
      take
      operations {
        type
        details
        amount
        date
      }
    }
  }
`
