import { gql } from '@apollo/client'

export const ADD_1VS1_BET = gql`
  mutation addOneVsOneBet($data: AddOneVsOneBetInput!) {
    addOneVsOneBet(data: $data) {
      ownerId
      type
      amount
      fee
      result
      outcome
      price
      isUp
      priceResult
      isUpResult
    }
  }
`
