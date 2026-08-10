/* eslint-disable max-lines */
import { Flex, Text } from '@radix-ui/themes'
import { createColumnHelper, Row } from '@tanstack/react-table'
import {
  Maybe,
  OneVsOnePredict,
  OneVsOneGameCustomType,
  Web3Adress
} from 'shared/types'
import { TableItemAction } from 'shared/ui/bets-table'
import { TableItemGameId } from 'shared/ui/bets-table/components/table-items/table-item-game-id'
import { TableItemProfit } from 'shared/ui/bets-table/components/table-items/table-item-profit'
import { TableItemUntilFinish } from 'shared/ui/bets-table/components/table-items/table-item-until-finish'
import { TableItemAsset } from 'shared/ui/table/table-item-asset'
import { TableItemPredictDirection } from 'shared/ui/table/table-item-predict-direction'
import { TableItemResult } from 'shared/ui/table/table-item-result'
import { UserProfileNameWithAvatar } from 'shared/ui/user-profile-link'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { zeroAddress } from 'viem'
import { ONE_VS_ONE_MY_BETS_TYPES } from '../constants'
import {
  getOneVsOneOpponent,
  get1vs1OpponentPredict,
  get1vs1UserPredict
} from '../utils/get-bet-and-user'

const columnHelper = createColumnHelper<OneVsOneGameCustomType>()

export const getMyGamesColumns = (
  activeType: string,
  onCancel?: (game: OneVsOneGameCustomType) => Promise<void>,
  userId?: string
) => {
  const baseColumns = [
    columnHelper.accessor('feedId', {
      header: 'Asset',
      cell: ctx => {
        return <TableItemAsset feedId={ctx.getValue()} />
      }
    }),

    columnHelper.accessor('ownerPredict', {
      header: 'My prediction',
      cell: ({ row }: { row: Row<OneVsOneGameCustomType> }) => {
        const predict = get1vs1UserPredict(
          row.original,
          userId
        ) as OneVsOnePredict

        const isEmpty = !predict || !isNotNullOrUndef(predict.price)

        if (isEmpty) {
          return (
            <Flex
              height={'100%'}
              align={'center'}
            >
              <Text weight={'bold'}>-</Text>
            </Flex>
          )
        }
        return (
          predict?.amount && <TableItemPredictDirection predict={predict} />
        )
      }
    }),
    getOpponentColumn(userId ?? null, activeType),
    getOpponentSayColumn(activeType, userId),

    columnHelper.accessor('ownerPredict.amount', {
      header: 'Amount',
      cell: ({ row }: { row: Row<OneVsOneGameCustomType> }) => {
        const amount = row.original.ownerPredict.amount
        const tokenContractAddress = row.original.token as Web3Adress

        return (
          <TableItemProfit
            value={amount}
            tokenContractAddress={tokenContractAddress}
          />
        )
      }
    }),

    getUntilOrProfitColumn(activeType, userId),

    getResultColumnOrNull(activeType, userId),

    getCancelColumn(activeType, onCancel),

    columnHelper.accessor('ownerPredict.gameId', {
      header: 'Game Id',
      cell: ctx => {
        return <TableItemGameId gameId={ctx.getValue() || zeroAddress} />
      }
    })
  ].filter(isNotNullOrUndef)

  return baseColumns
}

const getResultColumnOrNull = (activeType: string, userId?: string) =>
  userId && activeType !== ONE_VS_ONE_MY_BETS_TYPES.CURRENT ?
    getResultColumn(userId)
  : null

const getUntilOrProfitColumn = (activeType: string, userId?: string) =>
  userId ?
    activeType === ONE_VS_ONE_MY_BETS_TYPES.CURRENT ?
      getUntilColumn()
    : getProfitColumn(userId)
  : null

const getOpponentColumn = (userId: Maybe<string>, activeType: string) =>
  activeType !== ONE_VS_ONE_MY_BETS_TYPES.EXPIRED ?
    columnHelper.accessor(game => game, {
      header: 'VS',
      cell: ctx => {
        const game = ctx.getValue()

        if (!game?.opponent) {
          return (
            <Flex
              height={'100%'}
              align={'center'}
            >
              <Text weight={'bold'}>-</Text>
            </Flex>
          )
        }

        // NOTE: bad part, it causing app falling
        // TODO: investigate and fix it
        const opponent = getOneVsOneOpponent(game, userId ?? undefined)
        return (
          opponent && (
            <UserProfileNameWithAvatar
              avatarSize={'3'}
              iconsTextGap={'1'}
              avatarUrl={opponent?.avatarUris?.[0]}
              name={opponent?.name}
              userLevel={opponent?.level?.levelId || 0}
            />
          )
        )
      }
    })
  : null

const getUntilColumn = () =>
  columnHelper.accessor('endAt', {
    header: 'Until finish',
    cell: ({ row }) => {
      const endAt = row?.original?.endAt
      const until = endAt ? endAt - Date.now() : 0

      return endAt && <TableItemUntilFinish time={until} />
    }
  })

const getProfitColumn = (userId: string) =>
  columnHelper.accessor(game => game, {
    header: 'P&L',
    cell: ({ row }: { row: Row<OneVsOneGameCustomType> }) => {
      const game = row.original
      const predict = get1vs1UserPredict(game, userId)
      const tokenContractAddress = game.token as Web3Adress

      return (
        <TableItemProfit
          value={predict?.pnl}
          tokenContractAddress={tokenContractAddress}
        />
      )
    }
  })

const getResultColumn = (userId: string) =>
  columnHelper.accessor(game => game, {
    header: 'Result',
    cell: ({ row }: { row: Row<OneVsOneGameCustomType> }) => {
      const { stopPredictAt } = row.original
      const predict = get1vs1UserPredict(row.original, userId)
      if (!predict) return null

      const until = stopPredictAt ? stopPredictAt - Date.now() : 0
      return (
        <TableItemResult
          status={predict.status}
          until={until}
        />
      )
    }
  })

const getCancelColumn = (
  activeType: string,
  onCancel?: (game: OneVsOneGameCustomType) => Promise<void>
) =>
  activeType === ONE_VS_ONE_MY_BETS_TYPES.EXPIRED ?
    columnHelper.accessor(game => game, {
      header: 'Cancel',
      cell: ({ row }: { row: Row<OneVsOneGameCustomType> }) => {
        if (!onCancel) return

        return (
          <Flex
            align={'center'}
            height={'100%'}
            width={'14rem'}
          >
            <TableItemAction
              type={'deny'}
              action={() => onCancel(row.original)}
              title={'Cancel'}
              withLoader
            />
          </Flex>
        )
      }
    })
  : null

const getOpponentSayColumn = (activeType: string, userId?: string) =>
  activeType !== ONE_VS_ONE_MY_BETS_TYPES.EXPIRED ?
    columnHelper.accessor(game => game, {
      header: 'Opponent say',
      cell: ({ row }: { row: Row<OneVsOneGameCustomType> }) => {
        const predict = get1vs1OpponentPredict(
          row.original,
          userId
        ) as OneVsOnePredict

        const isEmpty = !predict || !isNotNullOrUndef(predict.price)

        if (isEmpty) {
          return (
            <Flex
              height={'100%'}
              align={'center'}
            >
              <Text weight={'bold'}>-</Text>
            </Flex>
          )
        }

        return (
          predict?.amount && <TableItemPredictDirection predict={predict} />
        )
      }
    })
  : null
