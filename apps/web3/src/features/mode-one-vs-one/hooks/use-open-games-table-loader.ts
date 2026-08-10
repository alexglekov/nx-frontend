import { useEffect, useLayoutEffect, useMemo } from 'react'
import { useReactiveVar } from '@apollo/client'
import { ONE_VS_ONE_OPEN_BETS_TYPES } from '../constants'
import { oneVsOneOpenBetsTableTypeVar } from '../store/global-games-store'
import { useOneVsOnePrivateGames } from './use-one-vs-one-private-games'
import { useOneVsOnePublicGames } from './use-one-vs-one-public-games'

/* eslint-disable-next-line max-statements */
export function useOpenGamesTableLoader() {
  const activeTableType = useReactiveVar(oneVsOneOpenBetsTableTypeVar)

  const {
    games: globalGames,
    getGames: getExactPriceGames,
    loading: loadingExactPrice,
    error: errorExact,
    refetch: refetchGlobal,
    total: totalPublic
  } = useOneVsOnePublicGames()

  const {
    games: personalGames,
    getGames: getOwnExactPriceGames,
    error: errorOwnExactPrice,
    loading: loadingOwnExact,
    refetch: refetchPersonal,
    total: totalPrivate
  } = useOneVsOnePrivateGames()

  const games = useMemo(() => {
    if (activeTableType === ONE_VS_ONE_OPEN_BETS_TYPES.GLOBAL) {
      return globalGames
    }

    return personalGames
  }, [globalGames, personalGames, activeTableType])

  const loading = useMemo(
    () => loadingExactPrice || loadingOwnExact,
    [loadingExactPrice, loadingOwnExact]
  )

  const total = useMemo(
    () =>
      activeTableType === ONE_VS_ONE_OPEN_BETS_TYPES.GLOBAL ?
        totalPublic
      : totalPrivate,
    [activeTableType, totalPrivate, totalPublic]
  )

  const error = useMemo(
    () => Boolean(errorExact) && Boolean(errorOwnExactPrice),
    [errorExact, errorOwnExactPrice]
  )

  const refetch = useMemo(
    () =>
      activeTableType === ONE_VS_ONE_OPEN_BETS_TYPES.GLOBAL ?
        refetchGlobal
      : refetchPersonal,
    [activeTableType, refetchGlobal, refetchPersonal]
  )

  useLayoutEffect(() => {
    getExactPriceGames()
    getOwnExactPriceGames()
  }, [getExactPriceGames, getOwnExactPriceGames])

  useEffect(() => {
    if (activeTableType === ONE_VS_ONE_OPEN_BETS_TYPES.GLOBAL) {
      getExactPriceGames()
    } else {
      getOwnExactPriceGames()
    }
  }, [activeTableType, getExactPriceGames, getOwnExactPriceGames])

  return {
    games,
    error,
    total,
    loading,
    getExactPriceGames,
    getOwnExactPriceGames,
    refetch
  }
}
