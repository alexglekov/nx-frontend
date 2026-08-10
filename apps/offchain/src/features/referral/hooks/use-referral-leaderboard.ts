import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  GetReferralLeaderboardQuery,
  OffchainReferralUserLevel
} from '__generated__/graphql'
import { GET_REFERRAL_LEADERBOARD } from 'api/referrals/query-get-referral-leaderboard'

export const useRewardsLeaderboard = () => {
  const [topUsers, setTopUsers] = useState<OffchainReferralUserLevel[]>([])
  const [hasLoadedMore, setHasLoadedMore] = useState(false)

  const { data, loading, refetch } = useQuery<GetReferralLeaderboardQuery>(
    GET_REFERRAL_LEADERBOARD,
    {
      variables: { pagination: { skip: 0, take: 10 } }
    }
  )

  const usersLeaderboard = data?.getReferralLeaderboard

  useEffect(() => {
    if (!usersLeaderboard) return

    const usersList = usersLeaderboard.leaders || []

    setTopUsers(usersList as OffchainReferralUserLevel[])
  }, [usersLeaderboard])

  const loadMore = () => {
    setHasLoadedMore(true)

    void refetch({ pagination: { skip: 0, take: 100 } })
  }

  return {
    topUsers,
    loading,
    hasLoadedMore,
    loadMore
  }
}
