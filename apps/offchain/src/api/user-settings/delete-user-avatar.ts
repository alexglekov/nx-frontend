import { gql } from '__generated__'

export const DELETE_USER_AVATAR = gql(`
  mutation deleteAvatar {
    deleteAvatar {
      ...Me
    }
  }
`)
