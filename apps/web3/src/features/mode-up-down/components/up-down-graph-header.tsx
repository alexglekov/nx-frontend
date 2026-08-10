import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import { getGameStatusText } from 'features/mode-bulls-eye/utils/get-game-status-text'
import { PriceGraphAssetIcon } from 'features/price-graph/components/price-graph-asset-icon'
import { DataTestIDs } from 'shared/constants'
import { useAssetPriceSubscription } from 'shared/hooks/use-asset-price-subscription'
import { AssetId } from 'shared/types'
import { upDownGameStateVar } from '../store/game.store'
import { upDownCurrentContractVar } from '../store/up-down-contract-addresses.store'
import { UpDownGraphHeaderAssetPrices } from './up-down-graph-header-asset-prices'
import { UpDownTimer } from './up-down-timer'
import styles from '../mode-up-down.module.scss'

export const UpDownGraphHeader: FC = () => {
  const currentUpDownSmartContract = useReactiveVar(upDownCurrentContractVar)

  const graphAssetId = currentUpDownSmartContract?.meta?.asset || 'BTC'

  const assetPrice = useAssetPriceSubscription(graphAssetId)

  const gameStatus = useReactiveVar(upDownGameStateVar)
  const chartTitle = getGameStatusText(gameStatus)

  return (
    <Flex
      gap={'4'}
      justify={'between'}
      align={'center'}
      position={'relative'}
      pl={'4'}
      pb={{ initial: '0', sm: '6' }}
      direction={{ initial: 'column', sm: 'row' }}
    >
      <Text
        size={'6'}
        weight={'bold'}
        className={classnames(styles.titleText, 'color-white')}
        data-testid={DataTestIDs.upDownGameStatus}
      >
        {chartTitle || 'Wait for the game'}
      </Text>

      <Flex
        justify={{ initial: 'between', sm: 'end' }}
        gap={{ sm: '4' }}
        width={'100%'}
      >
        <Flex
          align={'center'}
          justify={'center'}
          width={'auto'}
          gap={{ initial: '4', sm: '3' }}
        >
          <PriceGraphAssetIcon
            assetId={graphAssetId as AssetId}
            withAssetId={false}
          />

          <UpDownGraphHeaderAssetPrices subscriptionPrice={assetPrice} />
        </Flex>

        <UpDownTimer />
      </Flex>
    </Flex>
  )
}
