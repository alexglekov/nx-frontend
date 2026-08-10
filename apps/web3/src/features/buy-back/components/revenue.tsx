import { useMemo } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { formatToUSD } from 'shared/utils/format-price'
import { StaticChart } from '../../price-graph/components/static-chart'
import { MultiChartData } from '../../price-graph/types'
import { useGetBuybackTXS } from '../hooks/use-get-buyback-txs'
import { useGetRevenueTXS } from '../hooks/use-get-revenue-txs'
import styles from '../buy-back.module.scss'

export const Revenue: React.FC = () => {
  const {
    formattedTimeValueMultichartData: revenueChartData,
    total24XYRORevenue
  } = useGetRevenueTXS()
  const { formattedTimeValueMultichartData: buyBackChartData } =
    useGetBuybackTXS('usdt')

  const chartData: MultiChartData = useMemo(
    () => ({
      series1: {
        color: 'green',
        data: revenueChartData
      },
      series2: {
        color: 'pink',
        data: buyBackChartData
      }
    }),
    [revenueChartData, buyBackChartData]
  )

  return (
    <Flex
      className={cn(styles.cardWrapper, styles.cardStats)}
      direction={'column'}
      gap={'5'}
    >
      <Flex
        direction={'column'}
        gap={'3'}
      >
        <Text
          className={styles.cardHeaderText}
          weight={'medium'}
        >
          24H Revenue
        </Text>

        <Flex
          direction={'column'}
          gap={'1'}
        >
          <Text
            className={'color-white'}
            weight={'medium'}
            size={'7'}
          >
            {formatToUSD(total24XYRORevenue)}
          </Text>

          <Text
            className={styles.tokenInfoChangeText}
            weight={'medium'}
          >
            Buyback 10%
          </Text>
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
