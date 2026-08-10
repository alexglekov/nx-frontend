import { createColumnHelper } from '@tanstack/react-table'
import { OffchainReferralUserLevel } from '__generated__/graphql'
import cn from 'classnames'
import { TableCellPlayerProfile } from 'shared/ui/bets-table/components/table-items/table-cell-player'
import { TableItemAnyText } from 'shared/ui/bets-table/components/table-items/table-item-any-text'
import { formatToUSD } from 'shared/utils/format-price'
import styles from '../referral.module.scss'

const columnHelper = createColumnHelper<OffchainReferralUserLevel>()

export const leaderboardTableColumns = [
  columnHelper.accessor(
    ({ leaderboardPosition, user }) => ({
      leaderboardPosition,
      user
    }),
    {
      header: 'Place',
      cell: props => {
        const { leaderboardPosition, user } = props.getValue()

        if (!leaderboardPosition) return null

        return (
          <TableItemAnyText
            className={cn(styles.tableCurrentPlace, 'color-white')}
            text={`#${leaderboardPosition}`}
            userId={user?.id || ''}
          />
        )
      }
    }
  ),

  columnHelper.accessor('user', {
    header: 'Username',
    cell: ctx => (
      <TableCellPlayerProfile
        user={ctx.getValue() ?? null}
        className='color-white'
      />
    )
  }),

  columnHelper.accessor('totalSeasonDepositedReferrals', {
    header: 'Deposited friends',
    cell: props => {
      const totalReferrals = props.getValue()

      return <TableItemAnyText text={totalReferrals} />
    }
  }),

  columnHelper.accessor('levelId', {
    header: 'Level',
    cell: ctx => {
      const level = ctx.getValue() || 0

      return <TableItemAnyText text={level} />
    }
  }),

  columnHelper.accessor('availableForWithdrawal', {
    header: 'RevShare received',
    cell: ctx => {
      const revShare = formatToUSD(ctx.getValue()) || '$0.00'

      return <TableItemAnyText text={revShare} />
    }
  })
]
