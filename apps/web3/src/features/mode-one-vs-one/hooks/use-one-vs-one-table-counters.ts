/* eslint-disable max-statements */
import { useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import { SUBSCRIPTION_ONE_VS_ONE_GLOBAL_GAMES_COUNTERS_CHANGED } from 'api/mode-1vs1/subscription-1vs1-global-games-count-changed'
import { SUBSCRIPTION_ONE_VS_ONE_USER_GAMES_COUNTERS_CHANGED } from 'api/mode-1vs1/subscription-1vs1-user-games-count-changed'
import {
  oneVsOneGlobalGamesTotalVar,
  oneVsOnePersonalGamesTotalVar
} from '../store/global-games-store'
import {
  oneVsOneClosedGamesTotalVar,
  oneVsOneCurrentGamesTotalVar,
  oneVsOneExpiredGamesTotalVar
} from '../store/my-games-store'

export const useOneVsOneTableCounters = () => {
  const { data: globalGamesCountersSub } = useSubscription(
    SUBSCRIPTION_ONE_VS_ONE_GLOBAL_GAMES_COUNTERS_CHANGED
  )

  const { data: userGamesCountersSub } = useSubscription(
    SUBSCRIPTION_ONE_VS_ONE_USER_GAMES_COUNTERS_CHANGED
  )

  const privateGamesCountersData =
    userGamesCountersSub?.oneVsOneCountUserGamesChanged?.personal || null
  const currentGamesCountersData =
    userGamesCountersSub?.oneVsOneCountUserGamesChanged?.current || null
  const closedGamesCountersData =
    userGamesCountersSub?.oneVsOneCountUserGamesChanged?.completed || null
  const expiredGamesCountersData =
    userGamesCountersSub?.oneVsOneCountUserGamesChanged?.expired || null
  const globalGamesCountersData =
    globalGamesCountersSub?.oneVsOneCountGlobalGamesChanged?.global || null

  useEffect(() => {
    if (!privateGamesCountersData) return

    oneVsOnePersonalGamesTotalVar(privateGamesCountersData)
  }, [privateGamesCountersData])

  useEffect(() => {
    if (!currentGamesCountersData) return

    oneVsOneCurrentGamesTotalVar(currentGamesCountersData)
  }, [currentGamesCountersData])

  useEffect(() => {
    if (!closedGamesCountersData) return

    oneVsOneClosedGamesTotalVar(closedGamesCountersData)
  }, [closedGamesCountersData])

  useEffect(() => {
    if (!expiredGamesCountersData) return

    oneVsOneExpiredGamesTotalVar(expiredGamesCountersData)
  }, [expiredGamesCountersData])

  useEffect(() => {
    if (!globalGamesCountersData) return

    oneVsOneGlobalGamesTotalVar(globalGamesCountersData)
  }, [globalGamesCountersData])
}
