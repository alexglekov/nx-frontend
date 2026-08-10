import { gql } from '@apollo/client'

export const CHANGE_USERNAME = gql`
  mutation updateUserName($name: String!) {
    updateUser(data: { name: $name }) {
      name
    }
  }
`
