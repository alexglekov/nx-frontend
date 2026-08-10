import { useEffect, useState } from 'react'
import { useReactiveVar, useSubscription } from '@apollo/client'
import { AssetPriceChangedSubscription } from '__generated__/graphql'
import { SUBSCRIPTION_ASSET_PRICE_CHANGED } from 'api/prices/subscription-asset-price-changed'
import { selectedAssetVar } from 'shared/store/selected-asset'
import { zeroAddress } from 'viem'

export const useChosenAssetUpdater = () => {
  const selectedAsset = useReactiveVar(selectedAssetVar)

  const [currentAssetPrice, setCurrentAssetPrice] = useState(
    selectedAsset?.price?.formattedValue || 0
  )

  const [selectedAssetPayload, setSelectedAssetPayload] = useState(
    selectedAsset?.price?.payload || zeroAddress
  )

  const { data: assetPriceSubscribtion } =
    useSubscription<AssetPriceChangedSubscription>(
      SUBSCRIPTION_ASSET_PRICE_CHANGED,
      {
        variables: {
          assetId: selectedAsset?.id
        },
        skip: !selectedAsset?.id,
        fetchPolicy: 'no-cache',
        onError: console.warn // NOTE: don't throw errors in case of nullable assetId
      }
    )

  useEffect(() => {
    const assetPrice =
      assetPriceSubscribtion?.assetPriceChanged?.formattedValue || null

    const assetPayload =
      assetPriceSubscribtion?.assetPriceChanged?.payload || null

    if (assetPrice) {
      setCurrentAssetPrice(assetPrice)
    }

    if (assetPayload) {
      /* eslint-disable */
      setSelectedAssetPayload(assetPayload)
    }
  }, [assetPriceSubscribtion?.assetPriceChanged])

  return {
    currentAssetPrice,
    selectedAssetPayload
  }
}
