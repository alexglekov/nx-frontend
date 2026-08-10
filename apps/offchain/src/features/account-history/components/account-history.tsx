import React from 'react'
import { Flex } from '@radix-ui/themes'
import { BalanceTransactionsTable } from 'features/balance-transactions/components/balance-transactions-table'
import { AccountHistoryTabSwitcher } from './account-history-tab-switcher'

export const AccountHistory: React.FC = () => {
  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'5'}
    >
      <AccountHistoryTabSwitcher />

      <BalanceTransactionsTable />
    </Flex>
  )
}
