import { ApolloError, useSubscription } from '@apollo/client'
import { AssetPriceChangedSubscription } from '__generated__/graphql'
import { SUBSCRIPTION_ASSET_PRICE_CHANGED } from 'api/prices/subscription-asset-price-changed'
import { notificationStateVar } from 'shared/store/notification'
import { useResponsive } from './use-responsive'

// TODO: inspect the error on a try to use state inside subscription: useState, useRef, useReactiveVar
export const useAssetPriceSubscription = (assetId = 'BTC') => {
  const [isMobile] = useResponsive('xs')

  const { data } = useSubscription<AssetPriceChangedSubscription>(
    SUBSCRIPTION_ASSET_PRICE_CHANGED,
    {
      variables: { assetId },
      // TODO: Remove this solution when we'll fix problem with IOS power-saving mode.
      // Now we just reload the page and this fix prevent this message to be shown to user before reload
      onError: isMobile ? () => null : notifyOnError,
      skip: !assetId
    }
  )

  const btcPrice = data?.assetPriceChanged?.formattedValue
  return Number(btcPrice)
}

const notifyOnError = (err: ApolloError) =>
  notificationStateVar({
    isOpen: true,
    title: 'Asset price is not loaded',
    description: err.message,
    type: 'warning'
  })
