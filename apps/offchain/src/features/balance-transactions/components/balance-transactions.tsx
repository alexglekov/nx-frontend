import React from 'react'
import { Flex } from '@radix-ui/themes'
import { BalanceTransactionsCTATab } from './balance-transactions-cta-tab'
import { BalanceTransactionsTable } from './balance-transactions-table'

export const BalanceTransactions: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      align={'center'}
      gap={'2'}
    >
      <BalanceTransactionsCTATab />

      <BalanceTransactionsTable />
    </Flex>
  )
}
