import { gql } from '__generated__'

export const FIND_OPPONENTS = gql(`
  query findOpponents($data: FindUsersInput!) {
    findOpponents(data: $data) {
      name
      id
      avatarUris
      wallet {
        address
      }
      level {
        levelId
      }
    }
  }
`)
