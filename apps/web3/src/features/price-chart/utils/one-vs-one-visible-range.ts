import { MutableRefObject } from 'react'
import { MS_IN_SEC } from 'shared/constants'
import { IChartingLibraryWidget } from '../tradingview'

interface OneVsOneVisibleRange {
  startTimestamp?: number
  endTimestamp?: number
  firstPrice: number
  secondPrice: number
  chartInstance: MutableRefObject<IChartingLibraryWidget | null>
}

export const setOneVsOneVisibleRange = ({
  startTimestamp,
  endTimestamp,
  secondPrice,
  firstPrice,
  chartInstance
}: OneVsOneVisibleRange) => {
  const activeChart = chartInstance.current?.activeChart()

  if (!activeChart) {
    return
  }

  if (startTimestamp && endTimestamp) {
    void activeChart.setVisibleRange(
      {
        from: startTimestamp / MS_IN_SEC,
        to: endTimestamp / MS_IN_SEC
      },
      { percentRightMargin: 0 }
    )

    const priceScale = activeChart.getPanes()[0].getRightPriceScales()[0]

    const minPrice = Math.min(firstPrice, secondPrice) * 0.99
    const maxPrice = Math.max(firstPrice, secondPrice) * 1.01

    priceScale.setVisiblePriceRange({ from: minPrice, to: maxPrice })
  }
}
