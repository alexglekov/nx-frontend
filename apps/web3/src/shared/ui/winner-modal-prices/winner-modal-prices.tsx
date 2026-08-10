import { FC } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { PriceGraphAssetIcon } from 'features/price-graph/components/price-graph-asset-icon'
import { RadixColorType } from 'shared/types'
import { formatToUSD } from 'shared/utils/format-price'
import styles from './winner-modal-prices.module.scss'

interface Props {
  startPrice?: number
  endPrice?: number
  color?: RadixColorType
}

export const WinnersModalPrices: FC<Props> = ({
  startPrice,
  endPrice,
  color = 'gray'
}) => {
  if (!startPrice && !endPrice) return null

  const colorMap = {
    'color-gray-light': color === 'gray',
    'color-pink': color === 'pink',
    'color-green': color === 'green'
  }

  return (
    <Flex
      align={'center'}
      justify={'center'}
      gap={'3'}
      mt={'2'}
    >
      <PriceGraphAssetIcon
        assetId={'BTC'}
        withAssetId={false}
      />
      <Flex
        className={styles.winnerModalPricesContainer}
        direction={'column'}
      >
        {startPrice && (
          <Flex
            align={'center'}
            justify={'between'}
          >
            <Text
              className='color-gray-light'
              size={'2'}
              weight={'regular'}
            >
              Start Price:
            </Text>

            <Text
              className='color-white'
              size={'2'}
              weight={'light'}
            >
              {formatToUSD(startPrice)}
            </Text>
          </Flex>
        )}

        {endPrice && (
          <Flex
            align={'center'}
            justify={'between'}
          >
            <Text
              className='color-gray-light'
              size={'2'}
              weight={'regular'}
            >
              Finish Price:
            </Text>

            <Text
              className={cn(colorMap)}
              size={'2'}
              weight={'light'}
            >
              {formatToUSD(endPrice)}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
