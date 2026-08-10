import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Flex, Grid, Text } from '@radix-ui/themes'
import { assetsGlobalVar } from 'shared/store/assets-store'
import { formatToUSD } from 'shared/utils/format-price'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import { MemeWarsWinnerListGameDetailAsset } from '../types'
import styles from '../mode-meme-wars.module.scss'

interface Props {
  asset: MemeWarsWinnerListGameDetailAsset
  index: number
}
// eslint-disable-next-line max-statements
export const MemeWarsWinnerModalModalGameDetailsItem: React.FC<Props> = ({
  asset,
  index
}) => {
  const assetsList = useReactiveVar(assetsGlobalVar)

  const AssetIcon = getAssetIconById(asset.name)

  const assetPrecision =
    assetsList?.find(asset => asset.id === asset.name)?.precision || 3

  const isBigAssetPrecision = assetPrecision > 3

  const formattedStartPrice = formatToUSD(asset.startPrice, assetPrecision)
  const formattedEndPrice = formatToUSD(asset.endPrice, assetPrecision)

  const difference = ((asset.endPrice / asset.startPrice - 1) * 100).toFixed(2)

  const isPriceGrown = asset.endPrice > asset.startPrice

  const percentageTextColor = isPriceGrown ? 'color-green' : 'color-pink'
  const percentageMark = isPriceGrown ? '+' : ''

  const finalPercentageText = `${percentageMark}${difference}%`

  return (
    <Grid
      columns={'1fr 2.5fr 3.5fr 1.2fr'}
      gap={'3'}
      align={'start'}
      width={'100%'}
      className={styles.gameDetailsItem}
    >
      <Text
        size={'3'}
        className='color-gray-light'
      >
        #{index}
      </Text>

      <Flex
        align={'center'}
        gap={'1'}
      >
        <AssetIcon />

        <Text
          weight={'bold'}
          className='color-white'
          size={'3'}
        >
          {asset.name}
        </Text>
      </Flex>

      <Flex
        align={'center'}
        gap={'1'}
      >
        <Text
          size={isBigAssetPrecision ? '2' : '3'}
          className='color-white'
          weight={'medium'}
        >
          {formattedStartPrice}
        </Text>
        <ArrowRightIcon />
        <Text
          size={isBigAssetPrecision ? '2' : '3'}
          className='color-white'
          weight={'medium'}
        >
          {formattedEndPrice}
        </Text>
      </Flex>

      <Flex className={styles.gameDetailsItemDiffContainer}>
        <Text
          className={percentageTextColor}
          weight={'regular'}
          size={'2'}
        >
          {finalPercentageText}
        </Text>
      </Flex>
    </Grid>
  )
}
