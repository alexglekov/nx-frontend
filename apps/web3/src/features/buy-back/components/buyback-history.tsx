import React from 'react'
import { Flex, Heading } from '@radix-ui/themes'
import cn from 'classnames'
import { TableSkeleton } from 'shared/skeletons/common-skeletons/table-skeleton'
import { BetsTable } from 'shared/ui'
import { useGetBuybackTXS } from '../hooks/use-get-buyback-txs'
import { buybackHistoryTableColumns } from './buyback-history-columns'
import styles from '../buy-back.module.scss'

export const BuybackHistory: React.FC = () => {
  const { buybackTXS, loading } = useGetBuybackTXS('xyro')

  if (loading) return <TableSkeleton />

  return (
    <Flex
      className={styles.cardWrapper}
      direction={'column'}
      gap={'1'}
    >
      <Flex mb={'6'}>
        <Heading
          as='h3'
          size={'7'}
          weight={'medium'}
          className={cn(styles.tableTitle, 'color-white')}
        >
          Buyback Transactions
        </Heading>
      </Flex>

      <Flex width={'100%'}>
        <BetsTable
          columns={buybackHistoryTableColumns()}
          bets={buybackTXS}
          tableId='rewardsTable'
          pageSize={5}
        />
      </Flex>
    </Flex>
  )
}
