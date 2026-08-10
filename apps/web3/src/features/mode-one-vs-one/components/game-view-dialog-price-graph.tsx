import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { OneVsOneGame } from '__generated__/graphql'
import PriceGraph from 'features/price-graph'
import { PriceGraphStub } from 'features/price-graph/components/price-graph-stub'
import { AssetId } from 'shared/types'
import { oneVsOneChartTypeVar } from '../store/game-chart-type-store'
import { oneVsOneModalChartAnnotationsVar } from '../store/one-vs-one-modal-chart-annotation'
import styles from '../mode-one-vs-one.module.scss'

interface Props {
  game?: OneVsOneGame
}

export const GameViewDialogPriceGraph: FC<Props> = ({ game }) => {
  const chartAnnotation = useReactiveVar(oneVsOneModalChartAnnotationsVar)
  const currentChartType = useReactiveVar(oneVsOneChartTypeVar)

  return (
    <Flex
      className={styles.chartContainer}
      align={'center'}
      justify={'center'}
    >
      {game?.asset.id ?
        <PriceGraph
          assetId={game.asset.id as AssetId}
          annotations={chartAnnotation}
          startPrice={game.startPrice}
          chartType={currentChartType}
          setChartType={() =>
            oneVsOneChartTypeVar(
              currentChartType === 'gamified' ? 'tradingview' : 'gamified'
            )
          }
          isDark
          withHeader
        />
      : <PriceGraphStub isDark />}
    </Flex>
  )
}
