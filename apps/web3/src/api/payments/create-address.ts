import { gql } from '@apollo/client'

export const CREATE_COIN_ADDRESS = gql`
  mutation createCoinAddress($data: GetCoinAddressInput!) {
    createCoinAddress(data: $data) {
      currency
      address
    }
  }
`
