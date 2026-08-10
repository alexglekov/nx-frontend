import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { assetsGlobalVar } from 'shared/store/assets-store'
import { AssetId } from 'shared/types'
import { getAssetByFeedId } from 'shared/utils/get-asset-by-feed-id'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import { getAssetNameById } from 'shared/utils/get-asset-name-by-id'
import styles from './table.module.scss'

interface Props {
  feedId: string
  isCentered?: boolean
  isShortTextShown?: boolean
}

export const TableItemAsset: FC<Props> = ({
  feedId,
  isCentered = true,
  isShortTextShown = true
}) => {
  const assets = useReactiveVar(assetsGlobalVar)
  const currentAsset = getAssetByFeedId(feedId, assets)
  const currentAssetId = currentAsset ? (currentAsset.id as AssetId) : 'BTC'
  const AssetIcon = getAssetIconById(currentAssetId)
  const assetName = getAssetNameById(currentAssetId)

  return (
    <Flex
      align={isCentered ? 'center' : 'start'}
      height={'100%'}
      gap={'2'}
      className={styles.tableItemAsset}
    >
      <AssetIcon />

      <Text
        size={'3'}
        weight={'regular'}
      >
        {assetName}
      </Text>
      {isShortTextShown ? (
        <Text
          size={'3'}
          weight={'light'}
          className={styles.tableItemAssetShortName}
        >
          {currentAssetId}
        </Text>
      ) : null}
    </Flex>
  )
}
