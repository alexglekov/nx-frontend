import React from 'react'
import { Card, Flex, Text } from '@radix-ui/themes'
import { PaginationState } from '@tanstack/react-table'
import { TableSkeleton } from 'shared/skeletons/common-skeletons/table-skeleton'
import { BetsTable } from 'shared/ui'
import { useBalanceOperations } from '../hooks/use-balance-operations'
import { balanceTransactionsTableColumns } from './balance-transactions-table-columns'
import styles from '../balance-transactions.module.scss'

export const BalanceTransactionsTable: React.FC = () => {
  const {
    balanceOperations,
    loading,
    BALANCE_OPERATION_BETS_TAKE,
    balanceOperationsTotal,
    balanceOperationsTableBetsSkip,
    setBalanceOperationsTableBetsSkip,
    isDepositActive
  } = useBalanceOperations()

  if (loading) return <TableSkeleton />

  const pageCount = Math.ceil(
    balanceOperationsTotal / BALANCE_OPERATION_BETS_TAKE
  )

  const handlePaginationChange = ({ pageIndex }: PaginationState) => {
    setBalanceOperationsTableBetsSkip(pageIndex * BALANCE_OPERATION_BETS_TAKE)
  }

  return (
    <Card
      size={'4'}
      className={styles.tableWrapper}
    >
      <Text
        size={'7'}
        className='color-white'
      >
        Transaction History
      </Text>

      <Flex width={'100%'}>
        <BetsTable
          bets={balanceOperations}
          columns={balanceTransactionsTableColumns(isDepositActive)}
          emptyStateText={`There are no games yet`}
          className='height-full'
          pageCount={pageCount}
          pageSize={BALANCE_OPERATION_BETS_TAKE}
          pageIndex={
            balanceOperationsTableBetsSkip / BALANCE_OPERATION_BETS_TAKE
          }
          onPaginationChange={handlePaginationChange}
          manualPagination
        />
      </Flex>
    </Card>
  )
}
