import { gql } from '@apollo/client'

export const GET_COINS_RATES = gql`
  query coinRates {
    coinRates {
      from
      to
      rate
    }
  }
`
