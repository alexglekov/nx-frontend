import React from 'react'
import { Card, Flex, Heading } from '@radix-ui/themes'
import { XyroPulseDot } from 'shared/components'
import { TableSkeleton } from 'shared/skeletons/common-skeletons/table-skeleton'
import { BetsTable } from 'shared/ui'
import { useLiveWinsBets } from '../hooks/use-live-wins-bets'
import { liveWinsTableColumns } from './live-wins-table-columns'
import styles from '../home.module.scss'

export const LiveWinsTable: React.FC = () => {
  const { bets, loading } = useLiveWinsBets()

  if (loading) return <TableSkeleton />

  return (
    <Card
      size={'4'}
      className={styles.lastBetsTableWrapper}
    >
      <Flex
        gap={'6'}
        align={'center'}
        mb={'6'}
        className={styles.lastBetsTableInfoContainer}
      >
        <XyroPulseDot />

        <Heading
          size={'7'}
          as='h3'
          className={styles.liveWinsTableTitle}
        >
          Live wins
        </Heading>
      </Flex>

      <Flex width={'100%'}>
        <BetsTable
          bets={bets}
          columns={liveWinsTableColumns}
          emptyStateText={`There are no games yet`}
          pageSize={10}
          className='height-full'
        />
      </Flex>
    </Card>
  )
}
