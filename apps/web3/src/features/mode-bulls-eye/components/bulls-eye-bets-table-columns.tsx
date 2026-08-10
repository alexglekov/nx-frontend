import { createColumnHelper } from '@tanstack/react-table'
import { BullseyePredict, PredictStatus } from '__generated__/graphql'
import { Web3Adress } from 'shared/types'
import { TableItemAnyText } from 'shared/ui/bets-table/components/table-items/table-item-any-text'
import { TableItemGameId } from 'shared/ui/bets-table/components/table-items/table-item-game-id'
import { TableItemProfit } from 'shared/ui/bets-table/components/table-items/table-item-profit'
import { ResultTableItem } from 'shared/ui/bets-table/components/table-items/table-item-result'
import { formatToUSD } from 'shared/utils/format-price'
import { zeroAddress } from 'viem'
import styles from '../mode-bulls-eye.module.scss'

const columnHelper = createColumnHelper<BullseyePredict>()

export const getBullsEyeBetsColumns = () => [
  endPriceColumn,

  predictionColumn,

  outcomeColumn,

  placeColumn,

  statusColumn,

  gameIdColumn
]

const endPriceColumn = columnHelper.accessor('game.endPrice', {
  header: 'BTC Price',
  cell: ctx => {
    const formattedPrice = formatToUSD(ctx.getValue() || 0, 2) || ''

    return (
      <TableItemAnyText
        text={formattedPrice}
        className={styles.tableItemPlace}
      />
    )
  }
})

const predictionColumn = columnHelper.accessor('price', {
  header: 'You say',
  cell: ctx => {
    const formattedPrice = formatToUSD(ctx.getValue() || 0, 2) || ''

    return (
      <TableItemAnyText
        text={formattedPrice}
        className={styles.tableItemPlace}
      />
    )
  }
})

const outcomeColumn = columnHelper.accessor('pnl', {
  header: 'Profit',
  cell: ctx => {
    const gameContractAddress = ctx.row.original.game
      ?.contractAddress as Web3Adress

    return (
      <TableItemProfit
        value={ctx.getValue() || 0}
        className={styles.tableItemPlace}
        gameContractAddress={gameContractAddress}
      />
    )
  }
})

const placeColumn = columnHelper.accessor(
  ({ place, game }) => ({
    place,
    game
  }),
  {
    header: 'Place',
    cell: ctx => {
      const { game, place } = ctx.getValue()

      const placeString = `${place || '-'}/${game?.pool?.predictsCount}`

      return (
        <TableItemAnyText
          text={placeString}
          className={styles.tableItemPlace}
        />
      )
    }
  }
)

const statusColumn = columnHelper.accessor(
  ({ status, isExact, pnl }) => ({
    status,
    isExact,
    pnl
  }),
  {
    header: 'Result',
    cell: ctx => {
      const { status, isExact, pnl } = ctx.getValue()

      const defaultResultStatus = isExact ? 'Exact' : status

      const result = Number(pnl) < 0 ? PredictStatus.Loss : defaultResultStatus

      return <ResultTableItem result={result} />
    }
  }
)

const gameIdColumn = columnHelper.accessor('gameId', {
  header: 'Game Id',
  cell: ctx => {
    return <TableItemGameId gameId={ctx.getValue() || zeroAddress} />
  }
})
