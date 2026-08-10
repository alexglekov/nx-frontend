/* eslint-disable max-params, max-statements, max-depth, max-lines */

import { GET_PRICES_RANGE } from 'api/prices/price-range'
import { apolloClient } from 'app/apollo-client'
import { selectedAssetVar } from 'shared/store/selected-asset'
import { AssetId } from 'shared/types'
import { getAssetById } from 'shared/utils/get-asset-by-id'
import { getAssetNameById } from 'shared/utils/get-asset-name-by-id'
import { GET_BARS_QUERY } from '../list-candles'
import { Bar, ResolutionString, SubscribeBarsCallback } from '../tradingview'
import {
  DatafeedErrorCallback,
  HistoryCallback,
  LibrarySymbolInfo,
  OnReadyCallback,
  ResolveCallback
} from '../tradingview/charting_library/datafeed-api'
import { PeriodParamsWithOptionalCountback } from '../tradingview/datafeeds/udf/src/history-provider'
import { subscribeOnStream, unsubscribeFromStream } from './streaming'
import {
  reverseTransformResolution,
  transformResolutions
} from './transform-resolution'

const lastBarsCache = new Map<string | undefined, Bar>()

const datafeed = {
  onReady: (callback: OnReadyCallback) => {
    const selectedAsset = selectedAssetVar()

    const supportedResolutions = transformResolutions(
      selectedAsset?.supportedResolutions || []
    )

    setTimeout(() => {
      callback({
        supported_resolutions: [
          '1T' as ResolutionString,
          ...supportedResolutions
        ],
        supports_marks: false,
        supports_timescale_marks: false
      })
    }, 0)
  },
  resolveSymbol: (
    symbolName: string,
    onSymbolResolvedCallback: ResolveCallback,
    onResolveErrorCallback: DatafeedErrorCallback
  ) => {
    const assetName = getAssetNameById(symbolName as AssetId | 'XYRO')
    const asset = getAssetById(symbolName as AssetId)

    const assetPrecision = asset?.precision || 2

    const supportedResolutions = transformResolutions(
      asset?.supportedResolutions || []
    )

    setTimeout(() => {
      onSymbolResolvedCallback({
        type: 'crypto',
        listed_exchange: 'XYRO',
        format: 'price',
        name: symbolName,
        description: `${assetName.toUpperCase()} / US DOLLAR`,
        session: '24x7',
        ticker: symbolName,
        has_intraday: true,
        has_daily: true,
        has_weekly_and_monthly: true,
        has_seconds: true,
        intraday_multipliers: [
          '1',
          '2',
          '5',
          '15',
          '30',
          '60',
          '120',
          '240',
          '480',
          '720'
        ],
        seconds_multipliers: ['5', '15', '30'],
        daily_multipliers: ['1'],
        weekly_multipliers: ['1'],
        monthly_multipliers: ['1'],
        timezone: 'Etc/UTC',
        minmov: 1,
        has_ticks: true,
        pricescale: 10 ** assetPrecision,
        supported_resolutions: [
          '1T' as ResolutionString,
          ...supportedResolutions
        ],
        exchange: 'XYRO'
      })
    }, 0)
  },

  getBars: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParamsWithOptionalCountback,
    onHistoryCallback: HistoryCallback,
    onErrorCallback: DatafeedErrorCallback
  ) => {
    const { from, to, firstDataRequest } = periodParams

    const isTickResolution = resolution === '1T'
    const resolutionInSeconds = reverseTransformResolution(resolution)

    if (isTickResolution) {
      apolloClient
        .query({
          query: GET_PRICES_RANGE,
          variables: {
            data: {
              assetId: symbolInfo.ticker as string,
              startDate: new Date(from * 1000).toString(),
              endDate: new Date(to * 1000).toString()
            }
          }
        })
        .then(response => {
          const bars: Bar[] = []
          const data = response.data.priceRange
          if (data && data.length > 0) {
            for (let i = 0; i <= data.length - 1; i++) {
              const bar = data[i]
              bars.push({
                time: bar.timestamp,
                low: bar.formattedValue,
                high: bar.formattedValue,
                open: bar.formattedValue,
                close: bar.formattedValue
              })
            }
          }

          if (firstDataRequest && bars.length > 0) {
            lastBarsCache.set(symbolInfo.ticker, {
              ...bars[bars.length - 1]
            })
          }

          onHistoryCallback(bars, { noData: bars.length === 0 })
        })
        .catch(error => {
          onErrorCallback(error)
        })

      return
    }

    apolloClient
      .query({
        query: GET_BARS_QUERY,
        variables: {
          data: {
            assetId: symbolInfo.ticker as string,
            startDate: (from as number) * 1000,
            endDate: (to as number) * 1000,
            timeframe: resolutionInSeconds
          }
        }
      })
      .then(response => {
        const bars: Bar[] = []
        const data = response.data.listCandles
        if (data && data.length > 0) {
          for (let i = data.length - 1; i >= 0; i--) {
            const bar = data[i]
            bars.push({
              time: bar.openTime,
              low: bar.low,
              high: bar.high,
              open: bar.open,
              close: bar.close
            })
          }
        }

        if (firstDataRequest && bars.length > 0) {
          lastBarsCache.set(symbolInfo.ticker, {
            ...bars[bars.length - 1]
          })
        }

        onHistoryCallback(bars, { noData: bars.length === 0 })
      })
      .catch(error => {
        onErrorCallback(error)
      })
  },

  subscribeBars: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onRealtimeCallback: SubscribeBarsCallback,
    subscriberUID: string,
    onResetCacheNeededCallback: () => void
  ) => {
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback,
      lastBarsCache.get(symbolInfo.ticker)
    )
  },

  unsubscribeBars: (subscriberUID: string) => {
    unsubscribeFromStream(subscriberUID)
  }
}

export default datafeed
