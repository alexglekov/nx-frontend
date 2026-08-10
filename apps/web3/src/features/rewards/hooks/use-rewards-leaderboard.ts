import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetTopUsersRewardsQuery, Reward } from '__generated__/graphql'
import { GET_TOP_USERS_REWARDS } from 'api/rewards/get-top-users-rewards'

export const useRewardsLeaderboard = () => {
  const [topUsers, setTopUsers] = useState<Reward[]>([])

  const { data, loading } = useQuery<GetTopUsersRewardsQuery>(
    GET_TOP_USERS_REWARDS
  )

  const usersRewardsData = data?.getTopUsersRewards

  useEffect(() => {
    if (!usersRewardsData) return

    const usersList = usersRewardsData.rewards || []
    const currentUserData = usersRewardsData.myReward || {}

    const userListWithCurrentUser = [
      currentUserData,
      // TODO: Remvoe filter once it will be fixed from server side
      ...usersList.filter(r => r?.id !== currentUserData?.id)
    ]

    setTopUsers(userListWithCurrentUser as Reward[])
  }, [usersRewardsData])

  return {
    topUsers,
    loading
  }
}
