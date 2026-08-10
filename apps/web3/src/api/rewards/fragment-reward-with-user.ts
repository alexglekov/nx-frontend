import { gql } from '__generated__'

export const FRAGMENT_REWARD_WITH_USER = gql(`
  fragment RewardWithUser on Reward {
    ...RewardBase
    user {
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
  }
`)
