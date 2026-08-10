import React from 'react'
import { Button, Card, Flex, Heading, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { TableSkeleton } from 'shared/skeletons/common-skeletons/table-skeleton'
import { BetsTable, XyroLoading } from 'shared/ui'
import { DataTestIDs } from '../../../shared/constants'
import { useRewardsLeaderboard } from '../hooks/use-referral-leaderboard'
import { leaderboardTableColumns } from './leaderboard-columns'
import styles from '../referral.module.scss'

export const SeasonLeaderboard: React.FC = () => {
  const { loadMore, topUsers, loading, hasLoadedMore } = useRewardsLeaderboard()

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
          Leaderboard
        </Heading>
      </Flex>

      <Flex width={'100%'}>
        <BetsTable
          columns={leaderboardTableColumns}
          bets={topUsers}
          tableId='rewardsTable'
          pageSize={101}
          className={cn('height-full', styles.leaderBoard)}
        />
      </Flex>

      {!hasLoadedMore && (
        <Flex
          width={'100%'}
          justify={'center'}
        >
          <Button
            disabled={loading}
            size='3'
            type='button'
            variant='ghost'
            onClick={loadMore}
            className={styles.showMoreBtn}
          >
            <XyroLoading
              loading={loading}
              iconSize='0'
              variant='dark'
            >
              <Text
                className={'color-pink'}
                size={'2'}
                weight={'bold'}
              >
                SHOW MORE
              </Text>
            </XyroLoading>
          </Button>
        </Flex>
      )}
    </Card>
  )
}
