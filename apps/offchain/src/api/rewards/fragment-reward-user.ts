import { gql } from '__generated__'

export const FRAGMENT_REWARD_USER = gql(`
  fragment RewardUser on User {
    id    
    bio
    name
    avatarKeys
    discordRoles
    isInfluencer
    createdAt
    updatedAt
    avatarUris
  }
`)
