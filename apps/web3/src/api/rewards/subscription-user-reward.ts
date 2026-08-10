import { gql } from '__generated__'

export const SUBSCRIPTION_USER_REWARD = gql(`
  subscription rewardChanged {
    rewardChanged {
      ...RewardBase
    }
  }
`)
