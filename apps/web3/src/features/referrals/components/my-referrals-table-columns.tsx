import { createColumnHelper } from '@tanstack/react-table'
import {
  ReferralWithdrawRequest,
  ReferralWithdrawRequestStatus
} from '__generated__/graphql'
import cn from 'classnames'
import { TableItemAnyText, TableItemCreatedDate } from 'shared/ui/bets-table'
import { TableItemProfit } from 'shared/ui/bets-table/components/table-items/table-item-profit'
import { zeroAddress } from 'viem'
import { TableItemWithdrawStatus } from './table-item-withdraw-status'
import styles from '../referrals.module.scss'

const columnHelper = createColumnHelper<ReferralWithdrawRequest>()

export const myReferralsTableColumns = [
  columnHelper.accessor('createdAt', {
    header: 'Date',
    cell: ctx => {
      const createdAt = ctx.getValue() || 0

      return (
        <TableItemCreatedDate
          timestamp={createdAt}
          isShort
        />
      )
    }
  }),
  columnHelper.accessor('amount', {
    header: 'Earned',
    cell: ctx => {
      const amount = ctx.getValue()
      const formattedAmount = Number(amount.toFixed(2)) || 0

      return (
        <TableItemProfit
          variant='tether'
          isTextColored={false}
          value={formattedAmount}
          isTokenRounded
          tokenColor='yellow'
        />
      )
    }
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ctx => {
      const status = ctx.getValue() || ReferralWithdrawRequestStatus.Canceled

      return <TableItemWithdrawStatus status={status} />
    }
  }),
  columnHelper.accessor('user', {
    header: 'Adress',
    cell: ctx => {
      const { wallet } = ctx.getValue() || {}
      const { address } = wallet || {}

      const accountAddress = address || zeroAddress

      return (
        <TableItemAnyText
          text={accountAddress.slice(0, 12) + '...'}
          className={cn('color-gray', styles.adressTableItem)}
        />
      )
    }
  })
]
