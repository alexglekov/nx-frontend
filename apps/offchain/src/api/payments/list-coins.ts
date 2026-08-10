import { gql } from '@apollo/client'

export const GET_COINS_LIST = gql`
  query coinList {
    coinList {
      id
      type
      currency
      minimumAmount
      depositFeePercent
      withdrawalFeePercent
    }
  }
`
