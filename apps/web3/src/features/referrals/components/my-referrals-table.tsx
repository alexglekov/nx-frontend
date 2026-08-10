import React from 'react'
import { Card, Flex, Heading } from '@radix-ui/themes'
import cn from 'classnames'
import { BetsTable } from 'shared/components'
import { TableSkeleton } from 'shared/skeletons/common-skeletons/table-skeleton'
import { useReferralsWithdrawTransactions } from '../hooks/use-referrals-withdaraw-transactions'
import { myReferralsTableColumns } from './my-referrals-table-columns'
import styles from '../referrals.module.scss'

export const MyReferralsTable: React.FC = () => {
  const { loading, referralsWithdrawTransactions } =
    useReferralsWithdrawTransactions()

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
          My Referrals
        </Heading>
      </Flex>

      <Flex width={'100%'}>
        <BetsTable
          bets={referralsWithdrawTransactions}
          columns={myReferralsTableColumns}
          pageSize={5}
          className={'height-full'}
          tableContentLineClassname={styles.leaderBoardContent}
          emptyStateText='No refferal transactions yet :('
        />
      </Flex>
    </Card>
  )
}
