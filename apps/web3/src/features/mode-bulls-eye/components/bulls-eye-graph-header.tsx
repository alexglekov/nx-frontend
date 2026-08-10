import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { PriceGraphAssetIcon } from 'features/price-graph/components/price-graph-asset-icon'
import { PriceGraphAssetPrice } from 'features/price-graph/components/price-graph-asset-price'
import { DataTestIDs } from 'shared/constants'
import { useAssetPriceSubscription } from 'shared/hooks/use-asset-price-subscription'
import { AssetId } from 'shared/types'
import { bullsEyeCurrentContractAddressVar } from '../store/bulls-eye-contract-addresses.store'
import { bullsEyeGameStateVar } from '../store/game.store'
import { getGameStatusText } from '../utils/get-game-status-text'
import { BullsEyeTimer } from './bulls-eye-timer'
import styles from '../mode-bulls-eye.module.scss'

export const BullsEyeGraphHeader: React.FC = () => {
  const currentBullsEyeSmartContract = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )

  const graphAssetId = currentBullsEyeSmartContract?.meta?.asset || 'BTC'

  const assetPrice = useAssetPriceSubscription(graphAssetId)

  const gameState = useReactiveVar(bullsEyeGameStateVar)

  const gameStateStatus = getGameStatusText(gameState || null)

  return (
    <Flex
      gap={'4'}
      justify={'between'}
      align={'center'}
      position={'relative'}
      className={styles.headerWrapper}
      pl={'4'}
      direction={{ initial: 'column', sm: 'row' }}
      pb={{ initial: '4', sm: '1' }}
    >
      <Text
        size={'6'}
        weight={{ xs: 'bold', initial: 'medium' }}
        className={cn(styles.titleText, 'color-white')}
        data-testid={DataTestIDs.bullsEyeGraphHeaderStatus}
      >
        {gameStateStatus || 'Wait for the game'}
      </Text>

      <Flex
        width={{ sm: 'auto', initial: '100%' }}
        justify={{ initial: 'between', sm: 'end' }}
        gap={{ sm: '4' }}
      >
        <Flex
          align={'center'}
          justify={'center'}
          width={'auto'}
          gap={'3'}
        >
          <PriceGraphAssetIcon
            assetId={graphAssetId as AssetId}
            withAssetId={false}
          />

          <PriceGraphAssetPrice
            price={assetPrice}
            dataTestID={DataTestIDs.bullsEyeGraphAssetPrice}
          />
        </Flex>

        <BullsEyeTimer />
      </Flex>
    </Flex>
  )
}
