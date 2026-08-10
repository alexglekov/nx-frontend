import { useMemo } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { XyroTokenRounded } from 'shared/icons'
import { StaticChart } from '../../price-graph/components/static-chart'
import { MultiChartData } from '../../price-graph/types'
import { useGetBuybackTXS } from '../hooks/use-get-buyback-txs'
import styles from '../buy-back.module.scss'

export const BuybackedStats: React.FC = () => {
  const { formattedTimeValueMultichartData, total24BuyBacked } =
    useGetBuybackTXS('xyro')

  const chartData: MultiChartData = useMemo(
    () => ({
      series1: {
        color: 'green',
        data: formattedTimeValueMultichartData
      }
    }),
    [formattedTimeValueMultichartData]
  )

  const buybackedData = useMemo(
    () => ({
      buybacked24h: total24BuyBacked.toFixed(2),
      buybackedTotal: 0
    }),
    [total24BuyBacked]
  )

  return (
    <Flex
      className={cn(styles.cardWrapper, styles.cardStats)}
      direction={'column'}
      gap={'3'}
    >
      <Flex
        direction={'column'}
        gap={'2'}
      >
        <Text
          className={styles.cardHeaderText}
          weight={'medium'}
        >
          24H $XYRO Buybacked
        </Text>

        <Flex
          direction={'column'}
          gap={'2'}
        >
          <Flex
            align={'center'}
            gap={'2'}
          >
            <XyroTokenRounded
              width={'4rem'}
              height={'4rem'}
            />

            <Text
              className={'color-white'}
              weight={'medium'}
              size={'7'}
            >
              {buybackedData.buybacked24h}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <StaticChart
        chartData={chartData}
        height={200}
        isScalingEnabled={false}
      />
    </Flex>
  )
}
