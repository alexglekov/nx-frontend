import { MutableRefObject } from 'react'
import { COLOR_WHITE } from 'shared/constants'
import { EntityId, IChartingLibraryWidget } from '../tradingview'
import { VerticalLineConfig, PriceLineConfig } from '../types'

/**
 * Custom hook for managing horizontal and vertical annotations.
 * @param chartInstance - Reference to the TradingView chart instance.
 * @returns An object with methods to create and remove lines.
 */
export const useChartLines = (
  chartInstance: MutableRefObject<IChartingLibraryWidget | null>
) => {
  const activeChart = chartInstance.current?.activeChart()

  /**
   * Creates a price line.
   * @param config - Configuration for the price line and text description.
   * @returns The ID of the created price line.
   */
  const createPriceLine = (config: PriceLineConfig) => {
    if (!activeChart) {
      console.error('No active chart instance.')

      return null
    }

    const priceLineId = activeChart.createShape(
      {
        price: config.price,
        time: activeChart.getVisibleRange().from
      },
      {
        shape: 'horizontal_line',
        text: config.text,
        lock: true,
        disableSelection: true,
        disableSave: true,
        disableUndo: true,
        zOrder: 'top',
        overrides: {
          linestyle: config.lineStyle || 2,
          linewidth: config.lineWidth || 1,
          linecolor: config.color || COLOR_WHITE,
          showLabel: true,
          horzLabelsAlign: 'right'
        }
      }
    )

    return priceLineId
  }

  /**
   * Creates a vertical annotation with a text description.
   * @param config - Configuration for the vertical line and text description.
   * @returns The ID of the created vertical line.
   */
  const createVerticalLine = (config: VerticalLineConfig) => {
    if (!activeChart) {
      console.error('No active chart instance.')

      return null
    }

    const verticalLineId = activeChart.createShape(
      {
        price: 0,
        time: config.timestamp / 1000
      },
      {
        shape: 'vertical_line',
        text: config.text,
        lock: true,
        disableSelection: true,
        disableSave: true,
        disableUndo: true,
        zOrder: 'top',
        overrides: {
          linestyle: config.lineStyle || 2,
          linewidth: config.lineWidth || 1,
          linecolor: config.color || COLOR_WHITE,
          showLabel: true,
          showTime: true,
          vertLabelsAlign: 'top'
        }
      }
    )

    return verticalLineId
  }

  /**
   * Removes an annotation (horizontal or vertical) and its associated text description by ID.
   * @param lineId - The ID of the line to remove.
   */
  const removeLine = (lineId: EntityId) => {
    if (!activeChart) {
      console.error('No active chart instance.')

      return
    }

    activeChart.removeEntity(lineId)
  }

  return { createPriceLine, createVerticalLine, removeLine }
}
