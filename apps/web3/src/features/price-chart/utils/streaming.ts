/* eslint-disable max-params, max-statements, max-depth */

import {
  AssetPriceChangedSubscription,
  AssetPriceChangedSubscriptionVariables
} from '__generated__/graphql'
import { SUBSCRIPTION_ASSET_PRICE_CHANGED } from 'api/prices/subscription-asset-price-changed'
import { apolloClient } from 'app/apollo-client'
import { Bar, ResolutionString, SubscribeBarsCallback } from '../tradingview'
import { LibrarySymbolInfo } from '../tradingview/charting_library/datafeed-api'
import { SubscriptionItem } from '../types'

const channelToSubscription = new Map<string | undefined, SubscriptionItem>()

function getNextBarTime(resolution: ResolutionString, barTime?: number) {
  if (!barTime) {
    barTime = new Date().getTime()
  }

  const amount = parseInt(resolution)
  const date = new Date(barTime)

  if (resolution.endsWith('T')) {
    return date.getTime()
  } else if (resolution.endsWith('S')) {
    date.setSeconds(date.getSeconds() + amount)
  } else if (resolution.endsWith('D')) {
    date.setMinutes(date.getDay() + amount)
  } else {
    // NOTE: Handler for minutes and hours
    date.setMinutes(date.getMinutes() + amount)
  }

  return date.getTime()
}

const handleStreamingData = (
  data: AssetPriceChangedSubscription['assetPriceChanged'],
  subscriberUID: string
) => {
  const {
    assetId: channelString,
    formattedValue: tradePrice,
    timestamp: tradeTime
  } = data

  const subscriptionItem = channelToSubscription.get(subscriberUID)

  if (!subscriptionItem) {
    return
  }

  const lastDailyBar = subscriptionItem.lastDailyBar

  if (!lastDailyBar) {
    return
  }

  const nextDailyBarTime = getNextBarTime(
    subscriptionItem.resolution,
    subscriptionItem.resolution.includes('T') ? tradeTime : lastDailyBar.time
  )

  const shouldUseNewBar =
    tradeTime >= nextDailyBarTime || subscriptionItem.resolution.includes('T')

  let bar: Bar

  if (shouldUseNewBar) {
    bar = {
      time: nextDailyBarTime,
      open: tradePrice,
      high: tradePrice,
      low: tradePrice,
      close: tradePrice
    }
  } else {
    bar = {
      ...lastDailyBar,
      high: Math.max(lastDailyBar?.high || 0, tradePrice),
      low: Math.min(lastDailyBar?.low || 0, tradePrice),
      close: tradePrice
    }
  }

  subscriptionItem.lastDailyBar = bar

  subscriptionItem.handlers.forEach(handler => handler.callback(bar))
  channelToSubscription.set(subscriberUID, subscriptionItem)
}

export const subscribeOnStream = (
  symbolInfo: LibrarySymbolInfo,
  resolution: ResolutionString,
  onRealtimeCallback: SubscribeBarsCallback,
  subscriberUID: string,
  onResetCacheNeededCallback: () => void,
  lastDailyBar?: Bar
) => {
  const channelString = symbolInfo.ticker

  let subscriptionItem = channelToSubscription.get(subscriberUID)

  if (!subscriptionItem || subscriptionItem.resolution !== resolution) {
    subscriptionItem = {
      resolution,
      lastDailyBar,
      handlers: [{ id: subscriberUID, callback: onRealtimeCallback }],
      apolloSubscription: null
    }

    const apolloSubscription = apolloClient
      .subscribe<
        AssetPriceChangedSubscription,
        AssetPriceChangedSubscriptionVariables
      >({
        query: SUBSCRIPTION_ASSET_PRICE_CHANGED,
        variables: { assetId: channelString || '' }
      })
      .subscribe({
        next({ data }) {
          if (data && data.assetPriceChanged) {
            handleStreamingData(data.assetPriceChanged, subscriberUID)
          }
        },
        error(err) {
          console.error(
            `[stream] Apollo subscription error for ${subscriberUID}:`,
            err
          )
        }
      })

    subscriptionItem.apolloSubscription = apolloSubscription

    channelToSubscription.set(subscriberUID, subscriptionItem)
    return
  }

  const handler = {
    id: subscriberUID,
    callback: onRealtimeCallback
  }
  subscriptionItem.handlers.push(handler)
}

export const unsubscribeFromStream = (subscriberUID: string) => {
  for (const [
    channelString,
    subscriptionItem
  ] of channelToSubscription.entries()) {
    const handlerIndex = subscriptionItem.handlers.findIndex(
      handler => handler.id === subscriberUID
    )

    if (handlerIndex !== -1) {
      if (subscriptionItem.apolloSubscription) {
        subscriptionItem.apolloSubscription.unsubscribe()

        channelToSubscription.delete(channelString)
      }
    }
  }
}
