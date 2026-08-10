import React from 'react'
import { Flex, Select, Text } from '@radix-ui/themes'
import { AssetId } from 'shared/types'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import styles from '../mode-meme-wars.module.scss'

interface Props {
  feedId: string
}
export const MemeWarsFormAssetSelectItem: React.FC<Props> = ({ feedId }) => {
  const Icon = getAssetIconById(feedId as AssetId)

  return (
    <Select.Item
      value='1'
      className={styles.assetSelectItem}
    >
      <Flex
        align={'center'}
        gap={'2'}
        p='3'
      >
        <Icon />

        <Text>{feedId}</Text>
      </Flex>
    </Select.Item>
  )
}
