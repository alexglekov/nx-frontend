import { gql } from '@apollo/client'

export const CHANGE_AVATAR = gql`
  mutation updateAvatar($file: Upload!) {
    updateAvatar(file: $file) {
      avatarKeys
      avatarUris
    }
  }
`
