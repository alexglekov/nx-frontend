/* eslint-disable max-statements, complexity */

import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useReactiveVar } from '@apollo/client'
import { GameStatus } from '__generated__/graphql'
import { AssetId } from 'shared/types'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { useMemeWarsGameTimer } from '../../mode-meme-wars/hooks/use-meme-wars-game-timer'
import { memeWarsGameVar } from '../../mode-meme-wars/store/meme-wars-game.store'
import { ChartStyle, EntityId, IChartingLibraryWidget } from '../tradingview'

export const useChartRaceMachine = (
  chartInstance: MutableRefObject<IChartingLibraryWidget | null>,
  assets?: AssetId[] | null
) => {
  const [activeSymbol, setActiveSymbol] = useState(0)
  const { timeRemaining } = useMemeWarsGameTimer()
  const activeStudies = useRef<(EntityId | null)[]>([])
  const symbolIntervalId = useRef<NodeJS.Timeout | null>(null)
  const hasActiveListener = useRef(false)
  const prevHandleVisibleRange = useRef<(() => void) | null>(null) // Store previous handler

  const memeWarsGame = useReactiveVar(memeWarsGameVar)

  const activeChart = chartInstance?.current?.activeChart()

  const startTime = memeWarsGame?.stopPredictAt || 0
  const endTime = memeWarsGame?.endAt || 0

  const isOpenState =
    memeWarsGame?.status === GameStatus.Open && timeRemaining > 0

  const handleVisibleRange = useCallback(
    () =>
      activeChart?.setVisibleRange(
        {
          from: startTime / 1000,
          to: endTime / 1000
        },
        { percentRightMargin: 1 }
      ),
    [activeChart, startTime, endTime]
  )

  useEffect(() => {
    if (!activeChart || !assets) return

    activeChart.setZoomEnabled(false)

    activeChart.setScrollEnabled(false)

    chartInstance.current?.applyOverrides({
      'mainSeriesProperties.style': ChartStyle.Line
    })
  }, [activeChart])

  useEffect(() => {
    if (!isOpenState || !assets || !activeChart) return

    symbolIntervalId.current = setInterval(() => {
      const newActiveSymbolIndex =
        isNotNullOrUndef(activeSymbol) ? (activeSymbol + 1) % assets.length : 0

      activeChart.setSymbol(assets[newActiveSymbolIndex])

      setActiveSymbol(newActiveSymbolIndex)
    }, 15000)

    return () => {
      if (symbolIntervalId.current) clearInterval(symbolIntervalId.current)
    }
  }, [activeChart, activeSymbol, assets, isOpenState])

  useEffect(() => {
    if (!memeWarsGame || !chartInstance.current || !activeChart || !assets)
      return

    if (isOpenState) {
      activeStudies.current?.forEach(studyId => {
        if (studyId) activeChart.removeEntity(studyId)
      })

      activeStudies.current = []

      if (
        prevHandleVisibleRange.current &&
        chartInstance?.current?.unsubscribe
      ) {
        chartInstance.current.unsubscribe(
          'onTick',
          prevHandleVisibleRange.current
        )

        hasActiveListener.current = false

        prevHandleVisibleRange.current = null
      }

      activeChart?.setVisibleRange({
        from: startTime / 1000
      })
    }
  }, [assets, handleVisibleRange, memeWarsGame, isOpenState])

  useEffect(() => {
    if (!activeChart || !assets || isOpenState) return

    if ((activeStudies?.current?.length || 0) > 0) {
      return
    }

    activeChart.setSymbol(assets[0])

    clearInterval(symbolIntervalId.current || undefined)

    assets.slice(1).forEach(asset => {
      activeChart
        .createStudy('Compare', true, true, {
          source: 'close',
          symbol: asset
        })
        .then(studyId => {
          activeStudies.current = [...(activeStudies.current || []), studyId]
        })
    })

    // Unsubscribe the previous handler before subscribing a new one
    if (prevHandleVisibleRange.current && chartInstance?.current?.unsubscribe) {
      chartInstance.current.unsubscribe(
        'onTick',
        prevHandleVisibleRange.current
      )
    }

    // Subscribe the new handleVisibleRange function
    chartInstance?.current?.subscribe('onTick', handleVisibleRange)
    hasActiveListener.current = true

    // Store the new function reference
    prevHandleVisibleRange.current = handleVisibleRange
  }, [assets, isOpenState, activeChart])
}
