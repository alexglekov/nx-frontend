import { useEffect, useLayoutEffect, useMemo } from 'react'
import { useReactiveVar } from '@apollo/client'
import { ONE_VS_ONE_MY_BETS_TYPES } from '../constants'
import { oneVsOneMyGamesTableTypeVar } from '../store/my-games-store'
import { useOneVsOneClosedGames } from './use-one-vs-one-closed-games'
import { useOneVsOneCurrentGames } from './use-one-vs-one-current-games'
import { useOneVsOneExpiredGames } from './use-one-vs-one-expired-games'

// eslint-disable-next-line max-statements
export function useOwnGamesTableLoader() {
  const activeTableType = useReactiveVar(oneVsOneMyGamesTableTypeVar)

  const {
    games: currentGames,
    getGames: getCurrentGames,
    loading: loadingExactPrice,
    error: errorExact,
    total: totalCurrent,
    refetch: refetchCurrent
  } = useOneVsOneCurrentGames()

  const {
    games: closedGames,
    getGames: getClosedGames,
    loading: loadingClosed,
    error: errorClosed,
    total: totalClosed,
    refetch: refetchClosed
  } = useOneVsOneClosedGames()

  const {
    games: expiredGames,
    getGames: getExpiredGames,
    loading: loadingExpired,
    error: errorExpired,
    total: totalExpired,
    refetch: refetchExpired
  } = useOneVsOneExpiredGames()

  useLayoutEffect(() => {
    getCurrentGames()
    getExpiredGames()
    getClosedGames()
  }, [getCurrentGames, getExpiredGames, getClosedGames])

  useEffect(() => {
    if (activeTableType === ONE_VS_ONE_MY_BETS_TYPES.CURRENT) {
      getCurrentGames()
      return
    }

    if (activeTableType === ONE_VS_ONE_MY_BETS_TYPES.EXPIRED) {
      getExpiredGames()
      return
    }

    getClosedGames()
  }, [activeTableType, getCurrentGames, getClosedGames, getExpiredGames])

  const games = useMemo(() => {
    if (activeTableType === ONE_VS_ONE_MY_BETS_TYPES.CURRENT) {
      return currentGames
    }

    if (activeTableType === ONE_VS_ONE_MY_BETS_TYPES.COMPLETED) {
      return closedGames
    }

    return expiredGames
  }, [activeTableType, closedGames, currentGames, expiredGames])

  const refetch = useMemo(() => {
    if (activeTableType === ONE_VS_ONE_MY_BETS_TYPES.CURRENT) {
      return refetchCurrent
    }

    if (activeTableType === ONE_VS_ONE_MY_BETS_TYPES.COMPLETED) {
      return refetchClosed
    }

    return refetchExpired
  }, [activeTableType, refetchClosed, refetchCurrent, refetchExpired])

  const total = useMemo(() => {
    if (activeTableType === ONE_VS_ONE_MY_BETS_TYPES.CURRENT) {
      return totalCurrent
    }

    if (activeTableType === ONE_VS_ONE_MY_BETS_TYPES.COMPLETED) {
      return totalClosed
    }

    return totalExpired
  }, [activeTableType, totalCurrent, totalClosed, totalExpired])

  const loading = loadingExactPrice || loadingClosed || loadingExpired

  const error =
    Boolean(errorExact) || Boolean(errorClosed) || Boolean(errorExpired)

  return {
    games,
    total,
    error,
    loading,
    refetch,
    getClosedGames,
    getCurrentGames,
    getExpiredGames
  }
}
