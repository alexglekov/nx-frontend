import React from 'react'
import { Card, Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/table-core'
import Skeleton from 'react-loading-skeleton'
import { BetsTable } from '../../ui/bets-table/components/bets-table'
import styles from './skeletons.module.scss'
import { getTableSekeletonColumns } from './table-skeleton-columns'

export const TableSkeleton: React.FC = () => {
  return (
    <Card
      size={'4'}
      style={{ width: '100%' }}
    >
      <Flex
        gap={'6'}
        align={'center'}
        mb={'6'}
      >
        <Skeleton
          width={'45rem'}
          height={'6rem'}
        />
      </Flex>
      <Flex width={'100%'}>
        <BetsTable<unknown>
          bets={[{}, {}, {}, {}, {}] as unknown[]}
          columns={getTableSekeletonColumns() as ColumnDef<unknown, any>[]}
          pageSize={5}
          className={styles.tableSkeletonContainer}
        />
      </Flex>
    </Card>
  )
}
