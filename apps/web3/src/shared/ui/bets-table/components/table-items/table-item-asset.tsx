import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { AssetId } from 'shared/types'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import { getAssetNameById } from 'shared/utils/get-asset-name-by-id'
import styles from '../../table.module.scss'

interface Props {
  asset: AssetId
  isShortTextShown?: boolean
  isCentered?: boolean
}
export const TableItemAsset: React.FC<Props> = ({
  asset,
  isShortTextShown = true,
  isCentered = true
}) => {
  const AssetIcon = getAssetIconById(asset)
  const assetName = getAssetNameById(asset)

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
          {asset}
        </Text>
      ) : null}
    </Flex>
  )
}
