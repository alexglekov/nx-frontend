import { gql } from '__generated__'

export const GET_USER_REWARD_STATS = gql(`
  query getUserRewardStats {
    getUserReward {
      ...RewardStats
    }
  }
`)
