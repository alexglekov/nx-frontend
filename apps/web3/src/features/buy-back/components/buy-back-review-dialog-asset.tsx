import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { formatToTether } from 'shared/utils/format-price'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { BuyBackReviewDialogAssetItem } from '../types'

export const BuyBackReviewDialogAsset: React.FC<
  BuyBackReviewDialogAssetItem
> = ({ amount, assetIcon, assetName }) => {
  const assetTitle =
    isNotNullOrUndef(amount) ?
      `${formatToTether(Number(amount), 2)} ${assetName}`
    : assetName

  return (
    <Flex
      gap={'2'}
      align={'center'}
    >
      {assetIcon}

      <Text size={'4'}>{assetTitle}</Text>
    </Flex>
  )
}
