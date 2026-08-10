import { createColumnHelper } from '@tanstack/react-table'
import { Reward } from '__generated__/graphql'
import cn from 'classnames'
import { TableCellPlayerProfile } from 'shared/ui/bets-table/components/table-items/table-cell-player'
import { TableItemAnyText } from 'shared/ui/bets-table/components/table-items/table-item-any-text'
import { TableItemProfit } from 'shared/ui/bets-table/components/table-items/table-item-profit'
import styles from '../rewards.module.scss'

const columnHelper = createColumnHelper<Reward>()

export const seasonLeaderboardTableColumns = [
  columnHelper.accessor(
    ({ currentPlace, user }) => ({
      currentPlace,
      user
    }),
    {
      header: 'Place',
      cell: props => {
        const { currentPlace, user } = props.getValue()

        if (!currentPlace) return null

        return (
          <TableItemAnyText
            className={cn(styles.tableCurrentPlace, 'color-white')}
            text={`#${currentPlace}`}
            userId={user?.id || ''}
          />
        )
      }
    }
  ),

  columnHelper.accessor('user', {
    header: 'Player',
    cell: ctx => (
      <TableCellPlayerProfile
        user={ctx.getValue() ?? null}
        className='color-white'
      />
    )
  }),

  columnHelper.accessor('placeChange', {
    header: 'Place change, 10m',
    cell: props => {
      const placheChange = props.getValue()

      if (!placheChange) {
        return <TableItemAnyText text={'-'} />
      }

      return (
        <TableItemAnyText
          text={placheChange}
          className={placheChange > 0 ? 'color-green' : 'color-pink'}
        />
      )
    }
  }),

  columnHelper.accessor('rewards', {
    header: 'Rewards',
    cell: ctx => {
      const profit = Number(ctx.getValue().toFixed(0)) || 0

      return (
        <TableItemProfit
          value={profit}
          variant='xyro'
          tokenColor={'yellow'}
        />
      )
    }
  })
]
