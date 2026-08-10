import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Card, Flex } from '@radix-ui/themes'
import { PaginationState } from '@tanstack/react-table'
import { UpDownPredict } from '__generated__/graphql'
import { DataTestIDs, MS_IN_SEC } from 'shared/constants'
import { useInterval } from 'shared/hooks/use-interval'
import { TableSkeleton } from 'shared/skeletons/common-skeletons/table-skeleton'
import { userVar } from 'shared/store/user'
import { BetsTable } from 'shared/ui'
import { XyroTableHeader } from 'shared/ui/bets-table'
import { TableRefreshButton } from 'shared/ui/bets-table/components/table-refresh-button'
import { useUpDownBetsLoader } from '../hooks/use-up-down-bets-loader'
import { getCompletedUpDownTableColumns } from './completed-up-downs-table-columns'
import styles from '../mode-up-down.module.scss'

export const CompletedUpDownsTable: React.FC = () => {
  const {
    bets,
    loading,
    refetch,
    UP_DOWN_TABLE_BETS_TAKE,
    totalPredictsAmount,
    upDownTableBetsSkip,
    setUpDownTableBetsSkip
  } = useUpDownBetsLoader()
  const user = useReactiveVar(userVar)

  useInterval(() => {
    refetch()
  }, 10 * MS_IN_SEC)

  if (!user) return null

  if (loading) return <TableSkeleton />

  const pageCount = Math.ceil(totalPredictsAmount / UP_DOWN_TABLE_BETS_TAKE)

  const handlePaginationChange = ({ pageIndex }: PaginationState) => {
    setUpDownTableBetsSkip(pageIndex * UP_DOWN_TABLE_BETS_TAKE)
  }

  return (
    <Card
      size={'4'}
      className={styles.tableWrapper}
    >
      <XyroTableHeader headingText='Up/Down Games'>
        <TableRefreshButton refetch={refetch} />
      </XyroTableHeader>

      <Flex width={'100%'}>
        <BetsTable
          columns={getCompletedUpDownTableColumns()}
          bets={bets as UpDownPredict[]}
          emptyStateText={`You don't have any completed Up/Downs yet `}
          tableDataTestId={DataTestIDs.tableUserGamesUpDown}
          onPaginationChange={handlePaginationChange}
          pageCount={pageCount}
          pageSize={UP_DOWN_TABLE_BETS_TAKE}
          pageIndex={upDownTableBetsSkip / UP_DOWN_TABLE_BETS_TAKE}
          manualPagination
        />
      </Flex>
    </Card>
  )
}
