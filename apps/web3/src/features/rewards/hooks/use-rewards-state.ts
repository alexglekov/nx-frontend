import { useEffect, useState } from 'react'
import { useQuery, useReactiveVar, useSubscription } from '@apollo/client'
import { GetUserSeasonStateQuery, Season } from '__generated__/graphql'
import { GET_USER_SEASON_STATE } from 'api/rewards/get-user-season-state'
import { SUBSCRIPTION_USER_SEASON_STATE } from 'api/rewards/subscription-user-season-state'
import { challengeModalStateVar } from '../store/challenge-modal'

export const useRewardsState = () => {
  const [seasonState, setSeasonState] = useState<Season | null>(null)
  const challengeModalState = useReactiveVar(challengeModalStateVar)

  const {
    data,
    loading: seasonStateLoading,
    refetch: refetchSeasonState
  } = useQuery<GetUserSeasonStateQuery>(GET_USER_SEASON_STATE)

  const { data: seasonSubscribeData } = useSubscription(
    SUBSCRIPTION_USER_SEASON_STATE
  )

  useEffect(() => {
    const seasonStateData = data?.getUserSeasonState || null

    if (!seasonStateData) return

    setSeasonState(seasonStateData as Season | null)
  }, [data?.getUserSeasonState])

  useEffect(() => {
    const data = seasonSubscribeData?.userSeasonChanged || null

    if (!data) return

    setSeasonState(data as Season | null)
  }, [seasonSubscribeData])

  useEffect(() => {
    if (!challengeModalState) return

    const updatedChallenge = seasonState?.challenges.find(
      el => el.id === challengeModalState.id
    )

    if (!updatedChallenge) return

    challengeModalStateVar(updatedChallenge)
  }, [seasonState])

  return {
    seasonState,
    seasonStateLoading,
    refetchSeasonState
  }
}
