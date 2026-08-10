import React from 'react'
import { Card, Text } from '@radix-ui/themes'
import { EmptyGraph } from 'features/price-graph/components/empty-graph'
import { StaticChart } from 'features/price-graph/components/static-chart'
import { useWinrateData } from '../hooks/use-winrate-data'
import styles from '../user-profile.module.scss'

interface Props {
  userId: string
}

export const WinrateGraph: React.FC<Props> = ({ userId }) => {
  const { winrateData, loading } = useWinrateData(userId)

  if (winrateData.length < 2) {
    return (
      <Card
        size={'3'}
        className={styles.emptyBalanceGraphWrapper}
      >
        <Text
          size={'7'}
          className={styles.balanceGraphTitle}
        >
          Winrate
        </Text>
        <EmptyGraph
          title='You haven’t played yet'
          secondaryText='Play games to see graph!'
          customChartBGClassname={styles.emptyGraphWrapper}
          loading={loading}
        />
      </Card>
    )
  }

  return (
    <Card
      size={'3'}
      className={styles.balanceGraphWrapper}
    >
      <Text
        size={'7'}
        className={styles.balanceGraphTitle}
      >
        Winrate (Last Week)
      </Text>
      <StaticChart
        chartData={{ series1: { data: winrateData, color: 'blue' } }}
        isPercentScale={true}
      />
    </Card>
  )
}
