import { useEffect, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { useFragment } from '__generated__'
import {
  GetUserRewardQuery,
  Maybe,
  Reward,
  RewardBaseFragment,
  User
} from '__generated__/graphql'
import { FRAGMENT_REWARD_BASE } from 'api/rewards/fragment-reward-base'
import { GET_USER_REWARD } from 'api/rewards/get-user-reward'
import { SUBSCRIPTION_USER_REWARD } from 'api/rewards/subscription-user-reward'

export const useRewardsBalance = (user: Maybe<User>) => {
  const [userRewards, setUserRewards] =
    useState<Maybe<RewardBaseFragment>>(null)

  const { data, loading, refetch } =
    useQuery<GetUserRewardQuery>(GET_USER_REWARD)
  const userRewardData = useFragment(FRAGMENT_REWARD_BASE, data?.getUserReward)

  const { data: subscriptionData } = useSubscription(SUBSCRIPTION_USER_REWARD, {
    shouldResubscribe: true,
    variables: {
      userId: user?.id
    } as any
  })

  useEffect(() => {
    if (!user) return

    refetch()
  }, [user, refetch])

  useEffect(() => {
    if (!userRewardData) return

    setUserRewards(userRewardData)
  }, [data?.getUserReward, userRewardData])

  useEffect(() => {
    const updatedReward = subscriptionData?.rewardChanged as Reward
    if (!updatedReward) return

    setUserRewards(updatedReward)
  }, [subscriptionData])

  return {
    userRewards,
    loading
  }
}
