import { createColumnHelper } from '@tanstack/react-table'
import { Predict } from '__generated__/graphql'
import { Web3Adress } from 'shared/types'
import { TableCellPlayerProfile } from 'shared/ui/bets-table/components/table-items/table-cell-player'
import { TableItemAnyText } from 'shared/ui/bets-table/components/table-items/table-item-any-text'
import { TableItemCountdown } from 'shared/ui/bets-table/components/table-items/table-item-countdown'
import { TableItemMode } from 'shared/ui/bets-table/components/table-items/table-item-mode'
import { TableItemProfit } from 'shared/ui/bets-table/components/table-items/table-item-profit'
import { formatAmountLong } from 'shared/utils/format-price'

const columnHelper = createColumnHelper<Predict>()

export const liveWinsTableColumns = [
  columnHelper.accessor('gameType', {
    header: 'Mode',
    cell: props => {
      const gameType = props.getValue()
      return <TableItemMode type={gameType} />
    }
  }),

  columnHelper.accessor('owner', {
    header: 'Player',
    cell: ctx => <TableCellPlayerProfile user={ctx.getValue() ?? null} />
  }),

  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: props => {
      const gameContractAddress = props.row.original.game
        ?.contractAddress as Web3Adress

      return (
        <TableItemProfit
          value={props.getValue()}
          gameContractAddress={gameContractAddress}
        />
      )
    }
  }),

  columnHelper.accessor(
    ({ pnl, amount }) => ({
      pnl,
      amount
    }),
    {
      header: 'ROI',
      cell: props => {
        const { amount, pnl } = props.getValue()

        if (!amount || !pnl) return null

        const caclulatedROI = (pnl / amount) * 100

        const formattedROI =
          caclulatedROI < 0.01 ? '<0.01' : formatAmountLong(caclulatedROI)

        return <TableItemAnyText text={`${formattedROI}%`} />
      }
    }
  ),

  columnHelper.accessor('pnl', {
    header: 'Profit',
    cell: props => {
      const pnl = props.getValue()
      const gameContractAddress = props.row.original.game
        ?.contractAddress as Web3Adress

      return (
        <TableItemProfit
          value={pnl}
          gameContractAddress={gameContractAddress}
        />
      )
    }
  }),

  columnHelper.accessor('updatedAt', {
    header: 'Time',
    cell: props => <TableItemCountdown timestamp={props.getValue() as number} />
  })
]
