import { gql } from '__generated__'

// TODO: use Me fragment
export const FRAGMENT_ME_SOCIAL = gql(`
  fragment MeSocial on User {
    __typename
    id
    name
    bio
    avatarKeys
    discordRoles
    avatarUris
    isInfluencer
    wallet {
      address
    }
    discord {
      id
      name
      roles
    }
    twitter {
      id
      name
    }
  }
`)
