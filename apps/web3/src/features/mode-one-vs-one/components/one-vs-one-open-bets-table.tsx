/* eslint-disable max-statements */
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Card } from '@radix-ui/themes'
import { PaginationState } from '@tanstack/react-table'
import { DataTestIDs } from 'shared/constants'
import { TableSkeleton } from 'shared/skeletons/common-skeletons/table-skeleton'
import { selectedAssetVar } from 'shared/store/selected-asset'
import { userVar } from 'shared/store/user'
import { OneVsOneGameCustomType } from 'shared/types'
import { BetsTable } from 'shared/ui'
import { XyroTableHeader } from 'shared/ui/bets-table'
import { BetsTypeSwitcher } from 'shared/ui/bets-type-switcher/bets-type-switcher'
import {
  ONE_VS_ONE_OPEN_BETS_TYPES,
  ONE_VS_ONE_TABLE_TAKE_VAR
} from '../constants'
import { useOneVsOneCreatedGamesEvents } from '../hooks/use-one-vs-one-created-games-events'
import { useOpenGamesTableLoader } from '../hooks/use-open-games-table-loader'
import { useGame1vs1RejectInvite } from '../hooks/use-reject-invite-game'
import { gameIdViewVar } from '../store/game-view-store'
import {
  oneVsOneOpenGamesSkipVar,
  oneVsOneOpenBetsTableTypeVar,
  oneVsOnePersonalGamesTotalVar,
  oneVsOneGlobalGamesTotalVar
} from '../store/global-games-store'
import { getOpenGamesColumns } from './one-vs-one-open-bets-table-columns'
import styles from '../mode-one-vs-one.module.scss'

export const OneVsOneOpenBetsTable: React.FC = () => {
  const activeType = useReactiveVar(oneVsOneOpenBetsTableTypeVar)
  const user = useReactiveVar(userVar)
  const skip = useReactiveVar(oneVsOneOpenGamesSkipVar)

  const totalPrivate = useReactiveVar(oneVsOnePersonalGamesTotalVar)
  const totalPublic = useReactiveVar(oneVsOneGlobalGamesTotalVar)

  const { games, loading: betsLoading, total } = useOpenGamesTableLoader()

  const [isTableInitialLoadingPassed, setTableInitialLoadingPassed] =
    useState<boolean>(false)

  useEffect(() => {
    if (isTableInitialLoadingPassed || !betsLoading) return

    setTableInitialLoadingPassed(true)
  }, [betsLoading])

  const { commitCancelGame } = useGame1vs1RejectInvite()

  const pageIndex = skip / ONE_VS_ONE_TABLE_TAKE_VAR
  const pageCount = Math.ceil(total / ONE_VS_ONE_TABLE_TAKE_VAR)

  useOneVsOneCreatedGamesEvents()

  const handleSetActiveType = (value: string) => {
    oneVsOneOpenBetsTableTypeVar(value)
  }

  const handleGlobalGameClick = (game: OneVsOneGameCustomType) => {
    gameIdViewVar(game.id)
    selectedAssetVar(null)
  }

  const handleAccept = useCallback(
    (event: SyntheticEvent, game: OneVsOneGameCustomType) => {
      gameIdViewVar(game.id)
    },
    []
  )

  const handleReject = useCallback(
    (event: SyntheticEvent, game: OneVsOneGameCustomType) => {
      event.stopPropagation()
      if (user?.id === game.ownerId) {
        commitCancelGame(game as OneVsOneGameCustomType)
        return
      }
    },
    [commitCancelGame, user]
  )

  const handlePaginationChange = useCallback(
    ({ pageIndex }: PaginationState) => {
      oneVsOneOpenGamesSkipVar(pageIndex * ONE_VS_ONE_TABLE_TAKE_VAR)
    },
    []
  )

  const openGamesColumns = getOpenGamesColumns({
    userId: user?.id,
    onAccept: handleAccept,
    onReject: handleReject
  })

  if (betsLoading && !isTableInitialLoadingPassed) return <TableSkeleton />

  return (
    <Card
      size={'4'}
      className={styles.tableWrapper}
    >
      <XyroTableHeader headingText='Open games'>
        {Boolean(user) && (
          <BetsTypeSwitcher
            betsTypeDataTestIDs={[
              DataTestIDs.buttonOneVsOneSwitchToGlobal,
              DataTestIDs.buttonOneVsOneSwitchToPersonal
            ]}
            betsTypes={ONE_VS_ONE_OPEN_BETS_TYPES}
            activeType={activeType}
            setActiveType={handleSetActiveType}
            isCounterEnabled
            betsCount={{
              [ONE_VS_ONE_OPEN_BETS_TYPES.GLOBAL]: totalPublic,
              [ONE_VS_ONE_OPEN_BETS_TYPES.PERSONAL]: totalPrivate
            }}
          />
        )}
      </XyroTableHeader>

      <BetsTable
        columns={openGamesColumns}
        bets={games as OneVsOneGameCustomType[]}
        onDetailsCellClick={handleGlobalGameClick}
        detailsTitle={'Open to join game'}
        openDetailsButtonDataTestID={DataTestIDs.buttonOneVsOneOpenDetails}
        emptyStateText={`You don't have any ${activeType.toLowerCase()} games yet `}
        tableDataTestId={DataTestIDs.tableOneVsOneOpenGames}
        onPaginationChange={handlePaginationChange}
        pageSize={ONE_VS_ONE_TABLE_TAKE_VAR}
        pageIndex={pageIndex}
        pageCount={pageCount}
        manualPagination
        loading={betsLoading}
      />
    </Card>
  )
}
