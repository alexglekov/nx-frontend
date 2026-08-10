import { gql } from '@apollo/client'

export const GET_COIN_ADDRESSES = gql`
  query listCoinAddresses {
    listCoinAddresses {
      currency
      address
    }
  }
`
