import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import PriceGraph from 'features/price-graph'
import { useResponsive } from 'shared/hooks/use-responsive'
import { AssetId } from 'shared/types'
import { ChartStyle, ResolutionString } from '../../price-chart/tradingview'
import {
  memeWarsGameStateVar,
  memeWarsGameVar
} from '../store/meme-wars-game.store'
import { getGameStatusText } from '../utils/get-game-status-text'
import { MemeWarsAssetInfoList } from './meme-wars-asset-info-list'
import { MemeWarsFormHeader } from './meme-wars-form-header'
import { MemeWarsGraphWinnerModal } from './meme-wars-graph-winner-modal'
import { MemeWarsTimer } from './meme-wars-timer'
import styles from '../mode-meme-wars.module.scss'

export const MemeWarsGraph: React.FC = () => {
  const [isMobile] = useResponsive('xs')
  const memeWarsGame = useReactiveVar(memeWarsGameVar)
  const memeWarsGameState = useReactiveVar(memeWarsGameStateVar)
  const assets = memeWarsGame?.feedsIds || []

  const chartTitle = getGameStatusText(memeWarsGameState) || 'Wait for the game'

  return (
    <Flex
      className={styles.memeWarsGraph}
      width={'100%'}
      direction={'column'}
      pt={{ initial: '3', sm: '0' }}
      position={'relative'}
    >
      <MemeWarsGraphWinnerModal />

      {Boolean(isMobile) && <MemeWarsFormHeader />}

      <MemeWarsAssetInfoList />

      <Flex
        mb={'2'}
        justify={'between'}
        align={'center'}
        px={{ initial: '5', sm: '0' }}
      >
        <Text
          size={'6'}
          weight={'bold'}
          className={classnames(styles.titleText, 'color-white')}
        >
          {chartTitle}
        </Text>

        {Boolean(isMobile) && <MemeWarsTimer />}
      </Flex>

      <PriceGraph
        assetId={assets as AssetId[]}
        chartType={'tradingview'}
        resolution={'1T' as ResolutionString}
        chartLineType={ChartStyle.Line}
        withPadding={false}
      />
    </Flex>
  )
}
