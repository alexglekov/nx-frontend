import { gql } from '__generated__'

export const GET_USER_BY_ADDRESS = gql(`
  query getUserByAddress($address: String!) {
    getUserByAddress(address: $address) {
      id
    }
  }
`)
