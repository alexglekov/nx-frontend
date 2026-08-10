import { gql } from '@apollo/client'

export const CHANGE_PASSWORD = gql`
  mutation updateUserPassword($newPassword: String!) {
    updateUser(data: { password: $newPassword }) {
      id
    }
  }
`
