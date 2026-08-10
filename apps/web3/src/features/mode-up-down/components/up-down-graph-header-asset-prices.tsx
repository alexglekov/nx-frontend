import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { formatToUSD } from 'shared/utils/format-price'
import { upDownGameVar } from '../store/game.store'
import styles from '../mode-up-down.module.scss'

interface Props {
  subscriptionPrice: number
}
export const UpDownGraphHeaderAssetPrices: React.FC<Props> = ({
  subscriptionPrice
}) => {
  const game = useReactiveVar(upDownGameVar)

  const startPrice = game?.startPrice || 0
  const endPrice = game?.endPrice || 0

  const formattedStartPrice =
    startPrice ?
      formatToUSD(startPrice)
    : formatToUSD(subscriptionPrice) || '$-.--'
  const formattedEndPrice =
    endPrice ? formatToUSD(endPrice)
    : startPrice ? formatToUSD(subscriptionPrice)
    : '$-.--'

  return (
    <Flex
      direction={'column'}
      gap={'1'}
      className={styles.upDownGraphHeaderPricesContainer}
    >
      <Flex
        align={'center'}
        gap={'1'}
        justify={'between'}
      >
        <Text
          className='color-gray-light'
          size={'2'}
          weight={'regular'}
        >
          Start price:
        </Text>

        <Text
          className='color-white'
          size={'2'}
          weight={'light'}
          data-testid={DataTestIDs.upDownAssetPriceSP}
        >
          {formattedStartPrice}
        </Text>
      </Flex>

      <Flex
        align={'center'}
        gap={'2'}
        justify={'between'}
      >
        <Text
          className='color-gray-light'
          size={'2'}
          weight={'regular'}
        >
          Finish price:
        </Text>

        <Text
          className={cn('color-white', {
            ['color-pink']: startPrice && subscriptionPrice < startPrice,
            ['color-green']: startPrice && subscriptionPrice > startPrice
          })}
          size={'2'}
          weight={'light'}
          data-testid={DataTestIDs.upDownAssetPriceFP}
        >
          {formattedEndPrice}
        </Text>
      </Flex>
    </Flex>
  )
}
