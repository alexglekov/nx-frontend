import { createColumnHelper } from '@tanstack/react-table'
import { GameStatus, PredictStatus, RaceGame } from '__generated__/graphql'
import {
  ResultTableItem,
  TableItemAnyText,
  TableItemProfit
} from 'shared/ui/bets-table'
import { TableItemAssetRounded } from './table-item-asset-rounded'

const columnHelper = createColumnHelper<RaceGame>()

export const getMyMemeWarsGamesTableColumns = () => [
  winnerAssetItemTableColumn,

  predictTableColumn,

  profitTableColumn,

  resultTableColumn
]

const winnerAssetItemTableColumn = columnHelper.accessor('wonFeedId', {
  header: 'Winner',
  cell: ctx => {
    const winAssetId = ctx.getValue()

    if (!winAssetId) return <TableItemAnyText text={'---'} />

    return <TableItemAssetRounded assetFeedId={ctx.getValue() || ''} />
  }
})

const predictTableColumn = columnHelper.accessor('myPredicts', {
  header: 'Predict',
  cell: ctx => {
    const myPredicts = ctx.getValue() as RaceGame['myPredicts']

    const totalAmount = myPredicts?.reduce(
      (sum, p) => (sum = sum + p?.amount),
      0
    )

    return <TableItemProfit value={totalAmount} />
  }
})

const profitTableColumn = columnHelper.accessor('myPredicts', {
  header: 'Profit',
  cell: ctx => {
    const myPredicts = ctx.getValue() as RaceGame['myPredicts']

    const totalPNL = myPredicts?.reduce(
      (sum, p) => (sum = sum + (p?.pnl || 0)),
      0
    )

    return <TableItemProfit value={totalPNL} />
  }
})

const resultTableColumn = columnHelper.accessor(game => game, {
  header: 'Result',
  cell: ctx => {
    const game = ctx.getValue() as RaceGame

    const { myPredicts, status } = game || {}

    const totalAmount = myPredicts?.reduce(
      (sum, p) => (sum = sum + p?.amount),
      0
    )

    const totalPNL = myPredicts?.reduce(
      (sum, p) => (sum = sum + (p?.pnl || 0)),
      0
    )

    const playedGamePredictsResult =
      totalPNL > totalAmount ? PredictStatus.Won : PredictStatus.Loss

    const result =
      status !== GameStatus.Reject ?
        playedGamePredictsResult
      : PredictStatus.Reject

    return <ResultTableItem result={result} />
  }
})
