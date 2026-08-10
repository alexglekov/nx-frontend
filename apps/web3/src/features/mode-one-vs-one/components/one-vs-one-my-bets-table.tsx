import { useEffect, useState } from 'react'
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
  ONE_VS_ONE_MY_BETS_TYPES,
  ONE_VS_ONE_TABLE_TAKE_VAR
} from '../constants'
import { useOwnGamesTableLoader } from '../hooks/use-own-games-table-loader'
import { useGame1vs1RejectInvite } from '../hooks/use-reject-invite-game'
import { gameIdViewVar } from '../store/game-view-store'
import {
  oneVsOneClosedGamesTotalVar,
  oneVsOneCurrentGamesTotalVar,
  oneVsOneExpiredGamesTotalVar,
  oneVsOneMyGamesSkipVar,
  oneVsOneMyGamesTableTypeVar
} from '../store/my-games-store'
import { GameViewDialog } from './game-view-dialog'
import { getMyGamesColumns } from './one-vs-one-my-bets-table-columns'
import styles from '../mode-one-vs-one.module.scss'

// eslint-disable-next-line max-statements
export const OneVsOneMyBetsTable: React.FC = () => {
  const user = useReactiveVar(userVar)
  const gameId = useReactiveVar(gameIdViewVar)
  const activeTableType = useReactiveVar(oneVsOneMyGamesTableTypeVar)
  const skip = useReactiveVar(oneVsOneMyGamesSkipVar)

  const totalClosed = useReactiveVar(oneVsOneClosedGamesTotalVar)
  const totalCurrent = useReactiveVar(oneVsOneCurrentGamesTotalVar)
  const totalExpired = useReactiveVar(oneVsOneExpiredGamesTotalVar)

  const { commitCancelGame } = useGame1vs1RejectInvite()

  const {
    games,
    loading: gamesLoading,
    total,
    refetch
  } = useOwnGamesTableLoader()

  const [isTableInitialLoadingPassed, setTableInitialLoadingPassed] =
    useState<boolean>(false)

  useEffect(() => {
    if (isTableInitialLoadingPassed || !gamesLoading) return

    setTableInitialLoadingPassed(true)
  }, [gamesLoading])

  const handleSetActiveTableType = (value: string) => {
    oneVsOneMyGamesTableTypeVar(value)
  }

  const handleOwnGameClick = (game: OneVsOneGameCustomType) => {
    gameIdViewVar(game.id)
    selectedAssetVar(null)
  }

  const handlePaginationChange = ({ pageIndex }: PaginationState) => {
    oneVsOneMyGamesSkipVar(pageIndex * ONE_VS_ONE_TABLE_TAKE_VAR)
  }

  const handleCancelGame = async (game: OneVsOneGameCustomType) => {
    await commitCancelGame(game)
    await refetch()
  }

  const pageIndex = skip / ONE_VS_ONE_TABLE_TAKE_VAR
  const pageCount = Math.ceil(total / ONE_VS_ONE_TABLE_TAKE_VAR)

  if (gamesLoading && !isTableInitialLoadingPassed) return <TableSkeleton />

  const myGamesColumns = getMyGamesColumns(
    activeTableType,
    commitCancelGame,
    user?.id
  )

  return (
    <Card
      size={'4'}
      className={styles.tableWrapper}
    >
      <XyroTableHeader headingText='My games'>
        <BetsTypeSwitcher
          betsTypes={ONE_VS_ONE_MY_BETS_TYPES}
          activeType={activeTableType}
          setActiveType={handleSetActiveTableType}
          betsTypeDataTestIDs={[
            DataTestIDs.buttonOneVsOneSwitchToCurrent,
            DataTestIDs.buttonOneVsOneSwitchToCompleted,
            DataTestIDs.buttonOneVsOneSwitchToExpired
          ]}
          isCounterEnabled
          betsCount={{
            [ONE_VS_ONE_MY_BETS_TYPES.COMPLETED]: totalClosed,
            [ONE_VS_ONE_MY_BETS_TYPES.CURRENT]: totalCurrent,
            [ONE_VS_ONE_MY_BETS_TYPES.EXPIRED]: totalExpired
          }}
        />
      </XyroTableHeader>

      <BetsTable
        columns={myGamesColumns}
        bets={games as OneVsOneGameCustomType[]}
        onDetailsCellClick={handleOwnGameClick}
        emptyStateText={`You don't have any ${activeTableType.toLowerCase()} games yet `}
        tableDataTestId={DataTestIDs.tableOneVsOneUserGames}
        onPaginationChange={handlePaginationChange}
        pageSize={ONE_VS_ONE_TABLE_TAKE_VAR}
        pageIndex={pageIndex}
        pageCount={pageCount}
        manualPagination
        loading={gamesLoading}
      />

      {gameId && <GameViewDialog />}
    </Card>
  )
}
