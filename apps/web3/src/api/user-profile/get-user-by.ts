import { gql } from '__generated__'

export const GET_USER_BY_ID = gql(`
  query getUserById($userId: String!) {
    getUserById(userId: $userId) {
      ...Me
    }
  }
`)
