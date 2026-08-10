import { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Card, Flex } from '@radix-ui/themes'
import { PaginationState } from '@tanstack/react-table'
import { useSetupsChanged } from 'features/mode-setups/hooks/use-setups-changed'
import {
  createdSetupsTableTypeVar,
  skipCreatedSetupsVar
} from 'features/mode-setups/store/created-setups-store'
import { DataTestIDs } from 'shared/constants'
import { TableSkeleton } from 'shared/skeletons/common-skeletons/table-skeleton'
import { BetsTable, BetsTypeSwitcher } from 'shared/ui'
import { TableRefreshButton } from 'shared/ui/bets-table/components/table-refresh-button'
import { XyroTableHeader } from 'shared/ui/bets-table/components/xyro-table-header'
import {
  CREATED_SETUPS_TAKE_VAR,
  CreatedSetupsTableType
} from '../../constants'
import { useUserSetupGamesLoader } from '../../hooks/use-user-setup-games-loader'
import { getCreatedSetupsColumns } from './setups-created-games-table-columns'
import styles from '../../mode-setups.module.scss'

// eslint-disable-next-line max-statements
export const SetupsCreatedGamesTable: React.FC = () => {
  const activeType = useReactiveVar(createdSetupsTableTypeVar)
  const skip = useReactiveVar(skipCreatedSetupsVar)

  useSetupsChanged()

  const { result, loading, refetch, total } = useUserSetupGamesLoader()

  const [isTableInitialLoadingPassed, setTableInitialLoadingPassed] =
    useState<boolean>(false)

  useEffect(() => {
    if (isTableInitialLoadingPassed || !loading) return

    setTableInitialLoadingPassed(true)
  }, [loading])

  if (loading && !isTableInitialLoadingPassed) return <TableSkeleton />

  const pageCount = Math.ceil(total / CREATED_SETUPS_TAKE_VAR)

  const createdSetupsColumns = getCreatedSetupsColumns(activeType)

  const handlePaginationChange = ({ pageIndex }: PaginationState) => {
    skipCreatedSetupsVar(pageIndex * CREATED_SETUPS_TAKE_VAR)
  }

  return (
    <Card
      size={'4'}
      className={styles.tableWrapper}
    >
      <Flex
        direction={'column'}
        gap='4'
        className={styles.tableInfoContainer}
      >
        <XyroTableHeader headingText='Created Setups'>
          <BetsTypeSwitcher
            activeType={activeType}
            setActiveType={(newValue: string) =>
              createdSetupsTableTypeVar(newValue as CreatedSetupsTableType)
            }
            betsTypes={CreatedSetupsTableType}
            isCounterEnabled={false}
            betsTypeDataTestIDs={[
              DataTestIDs.buttonSetupsSwitchToActive,
              DataTestIDs.buttonSetupsSwitchToClosed
            ]}
          />

          <TableRefreshButton refetch={refetch} />
        </XyroTableHeader>

        <BetsTable
          columns={createdSetupsColumns}
          bets={result}
          emptyStateText={`You don't have any ${activeType.toLowerCase()} setups yet `}
          tableDataTestId={DataTestIDs.tableSetupsCreatedSetups}
          openDetailsButtonDataTestID={DataTestIDs.buttonSetupsOpenDetails}
          // NOTE: Options required for pagination
          onPaginationChange={handlePaginationChange}
          pageSize={CREATED_SETUPS_TAKE_VAR}
          pageIndex={skip / CREATED_SETUPS_TAKE_VAR}
          pageCount={pageCount}
          manualPagination
          loading={loading}
        />
      </Flex>
    </Card>
  )
}
