import { Text } from '@radix-ui/themes'
import { createColumnHelper } from '@tanstack/react-table'
import { SetupsGameFragment } from '__generated__/graphql'
import { AssetId } from 'shared/types'
import { TableItemAnyText } from 'shared/ui/bets-table/components/table-items/table-item-any-text'
import { TableItemAsset } from 'shared/ui/bets-table/components/table-items/table-item-asset'
import { TableItemCreatedAt } from 'shared/ui/bets-table/components/table-items/table-item-created-at'
import { TableItemGameId } from 'shared/ui/bets-table/components/table-items/table-item-game-id'
import { ResultTableItem } from 'shared/ui/bets-table/components/table-items/table-item-result'
import { TableItemUntilFinish } from 'shared/ui/bets-table/components/table-items/table-item-until-finish'
import { zeroAddress } from 'viem'
import { TableItemTarget } from '../../../../shared/ui/bets-table/components/table-items/table-item-target'
import { CreatedSetupsTableType } from '../../constants'
import { TableItemPoolSize } from './table-item-pool-size'

const columnHelper = createColumnHelper<SetupsGameFragment>()

/* eslint-disable max-lines */
export const getCreatedSetupsColumns = (activeType: CreatedSetupsTableType) => [
  columnHelper.accessor('asset.id', {
    header: 'Asset',
    cell: ctx => {
      const assetId = ctx.getValue()

      return (
        <TableItemAsset
          asset={assetId as AssetId}
          isShortTextShown={false}
          isCentered={false}
        />
      )
    }
  }),
  columnHelper.accessor(game => game, {
    header: 'Setup',
    cell: ctx => {
      const { stopLoss, startPrice, takeProfit } = ctx.getValue()

      return (
        <TableItemTarget
          stopLoss={stopLoss}
          takeProfit={takeProfit}
          startPrice={startPrice ?? null}
        />
      )
    }
  }),

  columnHelper.accessor(
    ({ takeProfitPool, stopLossPool }) => ({ takeProfitPool, stopLossPool }),
    {
      header: 'TP Games %',
      cell: ctx => {
        const { takeProfitPool, stopLossPool } = ctx.getValue()
        const total = takeProfitPool.poolAmount + stopLossPool.poolAmount
        const totalFormatted =
          total ?
            `${Math.round((takeProfitPool.poolAmount / total) * 100)}%`
          : '0%'
        return (
          <TableItemAnyText
            text={totalFormatted}
            isCentered={false}
          />
        )
      }
    }
  ),
  columnHelper.accessor(
    ({ takeProfitPool, stopLossPool }) => ({
      takeProfitPool,
      stopLossPool
    }),
    {
      header: 'SL Games %',
      cell: ctx => {
        const { takeProfitPool, stopLossPool } = ctx.getValue()
        const total = takeProfitPool.poolAmount + stopLossPool.poolAmount
        const totalFormatted =
          total ?
            `${Math.round((stopLossPool.poolAmount / total) * 100)}%`
          : '0%'
        return (
          <TableItemAnyText
            text={totalFormatted}
            isCentered={false}
          />
        )
      }
    }
  ),

  columnHelper.accessor('startAt', {
    header: 'Created',
    cell: ctx => {
      const timestamp = ctx.getValue()
      if (!timestamp) return <Text size={'3'}>-</Text>
      return <TableItemCreatedAt timestamp={timestamp} />
    }
  }),

  activeType === CreatedSetupsTableType.Active ?
    untilFinishTableColumn
  : poolSizeTableColumn,

  ResultTableColumn,

  columnHelper.accessor('ownerProfit', {
    header: 'Earned',
    cell: ctx => {
      const ownerProfit = ctx.getValue()

      return (
        <TableItemAnyText
          text={ownerProfit?.toFixed(2) ?? 0}
          isCentered={false}
        />
      )
    }
  }),

  gameIdColumn
]

const ResultTableColumn = columnHelper.accessor('status', {
  header: 'Result',
  cell: ctx => {
    const status = ctx.getValue()

    return <ResultTableItem result={status} />
  }
})

const untilFinishTableColumn = columnHelper.accessor('endAt', {
  header: 'Until finish',
  cell: ctx => {
    const timestamp = ctx.getValue() || 0
    const timeRemain = timestamp - Date.now()
    return (
      <TableItemUntilFinish
        time={timeRemain}
        isCentered={false}
        textSize='3'
      />
    )
  }
})

const poolSizeTableColumn = columnHelper.accessor(
  ({ takeProfitPool, stopLossPool }) => ({
    takeProfitPool,
    stopLossPool
  }),
  {
    header: 'Pool size',
    cell: ctx => {
      const { takeProfitPool, stopLossPool } = ctx.getValue()
      const totalAmount = takeProfitPool.poolAmount + stopLossPool.poolAmount
      const totalBets =
        takeProfitPool.predictsCount + stopLossPool.predictsCount

      return (
        <TableItemPoolSize
          totalAmount={totalAmount}
          totalBets={totalBets}
        />
      )
    }
  }
)

const gameIdColumn = columnHelper.accessor('id', {
  header: 'Game Id',
  cell: ctx => {
    return <TableItemGameId gameId={ctx.getValue() || zeroAddress} />
  }
})
