import { gql } from '@apollo/client'

export const CHANGE_USER_BIO = gql`
  mutation updateUserBio($bio: String!) {
    updateUser(data: { bio: $bio }) {
      bio
    }
  }
`
