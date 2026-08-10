import { gql } from '__generated__'

export const FRAGMENT_REWARD_BASE = gql(`
  fragment RewardBase on Reward {
    id
    rewards
    currentPlace
    placeChange
  }
`)
