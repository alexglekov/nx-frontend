import { Flex } from '@radix-ui/themes'
import React from 'react'
import { TableSkeleton } from '../common-skeletons/table-skeleton'

export const BalanceTransactionsPageSkeleton: React.FC = () => {
  return (
    <Flex
      direction='column'
      gap='2'
    >
      <TableSkeleton />

      <TableSkeleton />

      <TableSkeleton />
    </Flex>
  )
}
