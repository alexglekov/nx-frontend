import { useEffect, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Level, UserLevel } from '__generated__/graphql'
import { REWARDS_GET_USER_LEVEL } from 'api/rewards/rewards-get-user-level'
import { REWARDS_GET_USER_LEVELS } from 'api/rewards/rewards-get-user-levels'
import { userVar } from 'shared/store/user'

// eslint-disable-next-line max-statements
export const useRewardsLevels = () => {
  const user = useReactiveVar(userVar)

  const [levels, setLevels] = useState<Level[]>([])
  const [fullLevels, setFullLevels] = useState<Level[]>([])
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null)

  const { data: userLevelsQuery, loading: userLevelsLoading } = useQuery(
    REWARDS_GET_USER_LEVELS
  )

  const {
    data: userLevelQuery,
    loading: userLevelLoading,
    refetch: refetchUserLevel
  } = useQuery(REWARDS_GET_USER_LEVEL, {
    variables: {
      userId: user?.id || ''
    },
    skip: !user?.id
  })

  useEffect(() => {
    const userLevelsData = userLevelsQuery?.getLevels

    if (!userLevelsData) return

    setFullLevels(userLevelsData)
  }, [userLevelsQuery?.getLevels])

  useEffect(() => {
    const userLevelData = userLevelQuery?.getUserLevel

    if (!userLevelData) return

    setUserLevel(userLevelData)
  }, [userLevelQuery])

  useEffect(() => {
    if (fullLevels.length === 0 || !userLevel) return

    const currentUserLevel = Number(userLevel.levelId) || 0

    setLevels(fullLevels.slice(currentUserLevel, currentUserLevel + 10))
  }, [fullLevels, userLevel])

  return {
    levels,
    userLevel,
    loading: userLevelsLoading || userLevelLoading,
    refetchUserLevel
  }
}
