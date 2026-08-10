import { useCallback, useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Card } from '@radix-ui/themes'
import { PaginationState } from '@tanstack/react-table'
import { SetupsPredictFragment } from '__generated__/graphql'
import { useClaimRetrievedSetup } from 'features/mode-setups/hooks/use-claim-retrieved-setup'
import {
  joinedSetupsTableTypeVar,
  skipJoinedPredictsVar
} from 'features/mode-setups/store/joined-setups-store'
import { useNavigate } from 'react-router-dom'
import { DataTestIDs } from 'shared/constants'
import { TableSkeleton } from 'shared/skeletons/common-skeletons/table-skeleton'
import { BetsTable } from 'shared/ui'
import { TableRefreshButton } from 'shared/ui/bets-table/components/table-refresh-button'
import { XyroTableHeader } from 'shared/ui/bets-table/components/xyro-table-header'
import { BetsTypeSwitcher } from 'shared/ui/bets-type-switcher/bets-type-switcher'
import {
  JOINED_SETUPS_TAKE_VAR,
  SetupsPredictsTableType
} from '../../constants'
import { useGamesCounters } from '../../hooks/use-games-counters'
import { useJoinedSetupsLoader } from '../../hooks/use-joined-setups-loader'
import { isViewGameDialogOpenVar } from '../../store/dialogs'
import { getJoinedSetupsTableColumns } from './setups-bets-table-columns'
import styles from '../../mode-setups.module.scss'

const { Current, Completed } = SetupsPredictsTableType

// eslint-disable-next-line max-statements
export const SetupsJoinedGamesTable: React.FC = () => {
  const navigate = useNavigate()
  const activeType = useReactiveVar(joinedSetupsTableTypeVar)
  const skip = useReactiveVar(skipJoinedPredictsVar)

  const handleActiveTypeChange = useCallback((type: string) => {
    joinedSetupsTableTypeVar(type as SetupsPredictsTableType)
  }, [])

  const { loading, refetch, result, total } = useJoinedSetupsLoader()

  const { counters, loading: countersLoading } = useGamesCounters()

  const { handleClaim } = useClaimRetrievedSetup()

  const [isTableInitialLoadingPassed, setTableInitialLoadingPassed] =
    useState<boolean>(false)

  useEffect(() => {
    if (isTableInitialLoadingPassed || !loading) return

    setTableInitialLoadingPassed(true)
  }, [loading])

  const betsCount = {
    [Current]: counters?.activeGamesCount ?? 0,
    [Completed]: counters?.closeGamesCount ?? 0
  }

  const handleBetDetailsClick = (predict: SetupsPredictFragment) => {
    const url = new URL(window.location.href)

    if (!('game' in predict) || !predict.game?.id) return null
    url.searchParams.set('gameId', predict.game.id)

    const newPathnameWithId = url.pathname + '?' + url.searchParams

    navigate(newPathnameWithId)
    isViewGameDialogOpenVar(true)
  }

  if ((loading || countersLoading) && !isTableInitialLoadingPassed)
    return <TableSkeleton />

  const joinedSetupsTableColumns = getJoinedSetupsTableColumns(
    activeType,
    handleClaim
  )
  const pageCount = Math.ceil(total / JOINED_SETUPS_TAKE_VAR)

  const handlePaginationChange = ({ pageIndex }: PaginationState) => {
    skipJoinedPredictsVar(pageIndex * JOINED_SETUPS_TAKE_VAR)
  }

  const emptyStateText = `You don't have any ${activeType.toLowerCase()} games yet `

  return (
    <Card
      size={'4'}
      className={styles.tableWrapper}
    >
      <XyroTableHeader headingText='Joined Setups'>
        <BetsTypeSwitcher
          betsTypes={SetupsPredictsTableType}
          activeType={activeType}
          setActiveType={handleActiveTypeChange}
          betsCount={betsCount}
          isCounterEnabled={false}
          betsTypeDataTestIDs={[
            DataTestIDs.buttonSetupsSwitchToCurrent,
            DataTestIDs.buttonSetupsSwitchToCompleted,
            DataTestIDs.buttonSetupsSwitchToUnclaimed
          ]}
        />

        <TableRefreshButton refetch={refetch} />
      </XyroTableHeader>

      <BetsTable
        bets={result}
        columns={joinedSetupsTableColumns}
        emptyStateText={emptyStateText}
        onDetailsCellClick={handleBetDetailsClick}
        tableDataTestId={DataTestIDs.tableSetupsJoinedSetups}
        openDetailsButtonDataTestID={DataTestIDs.buttonSetupsOpenDetails}
        onPaginationChange={handlePaginationChange}
        pageSize={JOINED_SETUPS_TAKE_VAR}
        pageIndex={skip / JOINED_SETUPS_TAKE_VAR}
        pageCount={pageCount}
        manualPagination
        loading={loading}
      />
    </Card>
  )
}
