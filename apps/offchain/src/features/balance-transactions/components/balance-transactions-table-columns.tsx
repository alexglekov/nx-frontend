import { createColumnHelper } from '@tanstack/react-table'
import { OperationHistory } from '__generated__/graphql'
import { TableItemAnyText, TableItemProfit } from 'shared/ui/bets-table'
import { roundToFixedFloat } from '../utils/round-to-fixed-float'
import { BalanceTransactionLinkTableItem } from './balance-transaction-link-table-item'
import { BalanceTransactionsStatusTableItem } from './balance-transactions-status-table-item'
import { BalanceTransactionTypeTableItem } from './balance-transactions-type-table-item'
import styles from '../balance-transactions.module.scss'

const columnHelper = createColumnHelper<OperationHistory>()

export const balanceTransactionsTableColumns = (isDeposit = false) => [
  columnHelper.accessor('date', {
    header: 'Date',
    cell: ctx => {
      const date = new Date(ctx.getValue())

      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })

      return (
        <TableItemAnyText
          text={formattedDate}
          className={styles.accountHistoryDateTableItem}
        />
      )
    }
  }),
  columnHelper.accessor('type', {
    header: 'Details',
    cell: ctx => {
      return <BalanceTransactionTypeTableItem type={ctx.getValue() || ''} />
    }
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ctx => {
      return <BalanceTransactionsStatusTableItem status={ctx.getValue()} />
    }
  }),
  columnHelper.accessor(data => data, {
    header: 'Amount To',
    cell: ctx => {
      const { amountFrom, currencyFrom } = ctx.getValue()

      if (isDeposit) {
        return (
          <TableItemProfit
            value={Number(amountFrom)}
            variant='usd'
            isTextColored
            className={styles.balanceTransactionsAmountItem}
          />
        )
      } else {
        const value = `${roundToFixedFloat(Number(amountFrom) || 0)} ${currencyFrom}`

        return <TableItemAnyText text={value} />
      }
    }
  }),
  columnHelper.accessor(data => data, {
    header: 'Amount From',
    cell: ctx => {
      const { amountTo, currencyFrom } = ctx.getValue()

      if (isDeposit) {
        const value = `${roundToFixedFloat(Number(amountTo) || 0)} ${currencyFrom}`

        return <TableItemAnyText text={value} />
      }

      return (
        <TableItemProfit
          value={Number(amountTo)}
          variant='usd'
          isTextColored
          className={styles.balanceTransactionsAmountItem}
        />
      )
    }
  }),
  columnHelper.accessor('explorerUrl', {
    header: 'Transaction URL',
    cell: ctx => {
      return <BalanceTransactionLinkTableItem link={ctx.getValue() || ''} />
    }
  })
]
