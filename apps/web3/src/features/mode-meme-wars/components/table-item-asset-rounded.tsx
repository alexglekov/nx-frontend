import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { AssetId } from 'shared/types'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'

interface Props {
  assetFeedId: string
}
export const TableItemAssetRounded: React.FC<Props> = ({ assetFeedId }) => {
  const Icon = getAssetIconById(assetFeedId as AssetId)

  return (
    <Flex
      align={'center'}
      height={'100%'}
      gap={'2'}
    >
      <Icon />

      <Text
        size='2'
        className='color-white'
      >
        {assetFeedId}
      </Text>
    </Flex>
  )
}
