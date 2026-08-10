import React from 'react'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { TableSkeleton } from 'shared/skeletons/common-skeletons/table-skeleton'
import { BetsTable } from 'shared/ui'
import { useRewardsLeaderboard } from '../hooks/use-rewards-leaderboard'
import { seasonLeaderboardTableColumns } from './season-leaderboard-columns'
import styles from '../rewards.module.scss'

export const SeasonLeaderboard: React.FC = () => {
  const { topUsers, loading } = useRewardsLeaderboard()

  if (loading) return <TableSkeleton />

  return (
    <Card
      size={'4'}
      className={styles.tableWrapper}
    >
      <Flex
        gap={'6'}
        align={'center'}
        mb={'6'}
        className={styles.tableInfoContainer}
      >
        <Heading
          as='h3'
          size={'7'}
          weight={'medium'}
          className={cn(styles.tableTitle, 'color-white')}
        >
          Season Leaderboard{' '}
          <Text
            size='4'
            color='gray'
            weight={'medium'}
          >
            (Updates every 10 min)
          </Text>
        </Heading>
      </Flex>

      <Flex width={'100%'}>
        <BetsTable
          columns={seasonLeaderboardTableColumns}
          bets={topUsers}
          tableId='rewardsTable'
          pageSize={101}
          className={cn('height-full', styles.leaderBoard)}
          tableContentLineClassname={styles.leaderBoardContent}
        />
      </Flex>
    </Card>
  )
}
