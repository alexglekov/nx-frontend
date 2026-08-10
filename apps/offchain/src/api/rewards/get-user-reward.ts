import { gql } from '__generated__'

export const GET_USER_REWARD = gql(`
  query getUserReward {
    getUserReward {
      ...RewardBase
    }
  }
`)
