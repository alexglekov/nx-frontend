import { gql } from '__generated__'

export const FRAGMENT_ME = gql(`
  fragment Me on User {
    __typename
    id
    name
    bio
    role
    createdAt
    avatarKeys
    discordRoles
    avatarUris
    isInfluencer
    level {
      levelId
      level {
        name
      }
    }
    wallet {
      address
    }
    hasPlayed
  }
`)
