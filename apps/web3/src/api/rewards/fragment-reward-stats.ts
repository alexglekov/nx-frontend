import { gql } from '__generated__'

export const FRAGMENT_REWARD_STATS = gql(`
  fragment RewardStats on Reward {
    __typename
    referralRewards
    currentPlace
    rewardsForChallenges
    lastPlaceOnLeaderboard
  }
`)
