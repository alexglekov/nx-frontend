import { useReactiveVar } from '@apollo/client'
import { Card, Flex } from '@radix-ui/themes'
import { PaginationState } from '@tanstack/react-table'
import { BullseyePredict } from '__generated__/graphql'
import { DataTestIDs, MS_IN_SEC } from 'shared/constants'
import { useInterval } from 'shared/hooks/use-interval'
import { TableSkeleton } from 'shared/skeletons/common-skeletons/table-skeleton'
import { userVar } from 'shared/store/user'
import { XyroTableHeader } from 'shared/ui/bets-table'
import { BetsTable } from 'shared/ui/bets-table/components/bets-table'
import { TableRefreshButton } from 'shared/ui/bets-table/components/table-refresh-button'
import { BULLS_EYE_TABLE_BETS_TAKE } from '../constants'
import { useBullsEyeBetsLoader } from '../hooks/use-bulls-eyes-bets-loader'
import { getBullsEyeBetsColumns } from './bulls-eye-bets-table-columns'
import styles from '../mode-bulls-eye.module.scss'

export const BullsEyeBetsTable = () => {
  const {
    bets,
    loading,
    refetch,
    totalPredictsAmount,
    bullsEyeTableBetsSkip,
    setBullsEyeTableBetsSkip
  } = useBullsEyeBetsLoader()
  const user = useReactiveVar(userVar)

  useInterval(() => {
    refetch()
  }, 10 * MS_IN_SEC)

  if (!user) return null

  if (loading) return <TableSkeleton />

  const pageCount = Math.ceil(totalPredictsAmount / BULLS_EYE_TABLE_BETS_TAKE)

  const handlePaginationChange = ({ pageIndex }: PaginationState) => {
    setBullsEyeTableBetsSkip(pageIndex * BULLS_EYE_TABLE_BETS_TAKE)
  }

  return (
    <Card
      size={'4'}
      className={styles.tableWrapper}
    >
      <XyroTableHeader headingText="Bull's Eye Games">
        <TableRefreshButton refetch={refetch} />
      </XyroTableHeader>

      <Flex width={'100%'}>
        <BetsTable
          columns={getBullsEyeBetsColumns()}
          bets={bets as BullseyePredict[]}
          emptyStateText={`You don't have any bull's eye games yet`}
          tableDataTestId={DataTestIDs.tableUserGamesBullsEye}
          onPaginationChange={handlePaginationChange}
          pageCount={pageCount}
          pageSize={BULLS_EYE_TABLE_BETS_TAKE}
          pageIndex={bullsEyeTableBetsSkip / BULLS_EYE_TABLE_BETS_TAKE}
          manualPagination
        />
      </Flex>
    </Card>
  )
}
