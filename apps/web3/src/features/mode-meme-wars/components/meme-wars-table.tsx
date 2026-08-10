import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Card, Flex } from '@radix-ui/themes'
import { PaginationState } from '@tanstack/react-table'
import { GameStatus, RaceGame } from '__generated__/graphql'
import { BetsTable, XyroTableHeader } from 'shared/components'
import { TableSkeleton } from 'shared/skeletons/common-skeletons/table-skeleton'
import { userVar } from 'shared/store/user'
import { TableRefreshButton } from 'shared/ui/bets-table/components/table-refresh-button'
import { useUserMemeWarsGames } from '../hooks/use-user-meme-wars-games'
import { getMyMemeWarsGamesTableColumns } from './meme-wars-table-columns'
import styles from '../mode-meme-wars.module.scss'

export const MemeWarsTable: React.FC = () => {
  const user = useReactiveVar(userVar)

  const {
    userMemeWarsGames,
    loading,
    refetch,
    MEME_WARS_TABLE_BETS_TAKE,
    memeWarsTableBetsSkip,
    setMemeWarsTableBetsSkip,
    totalPredictsAmount
  } = useUserMemeWarsGames()

  if (!user) return null

  if (loading) return <TableSkeleton />

  const formattedUserMemeWarsGames = userMemeWarsGames.filter(
    g => g.status !== GameStatus.Open
  )

  const pageCount = Math.ceil(totalPredictsAmount / MEME_WARS_TABLE_BETS_TAKE)

  const handlePaginationChange = ({ pageIndex }: PaginationState) => {
    setMemeWarsTableBetsSkip(pageIndex * MEME_WARS_TABLE_BETS_TAKE)
  }

  return (
    <Card
      size={'4'}
      mt={'2'}
      className={styles.tableWrapper}
    >
      <XyroTableHeader headingText='My Games'>
        <TableRefreshButton refetch={refetch} />
      </XyroTableHeader>

      <Flex width={'100%'}>
        <BetsTable
          columns={getMyMemeWarsGamesTableColumns()}
          bets={formattedUserMemeWarsGames as RaceGame[]}
          emptyStateText={`You don't have any completed meme wars games yet`}
          pageCount={pageCount}
          pageSize={MEME_WARS_TABLE_BETS_TAKE}
          pageIndex={memeWarsTableBetsSkip / MEME_WARS_TABLE_BETS_TAKE}
          onPaginationChange={handlePaginationChange}
          manualPagination
        />
      </Flex>
    </Card>
  )
}
