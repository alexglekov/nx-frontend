import { gql } from '__generated__'

export const FRAGMENT_SETUPS_GAME_OWNER = gql(`
  fragment SetupsGameOwner on User {
    __typename
    id
    name
    avatarUris
    level {
      levelId
    }
  }
`)
