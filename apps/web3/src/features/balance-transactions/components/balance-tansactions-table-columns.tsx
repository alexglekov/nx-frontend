import { createColumnHelper } from '@tanstack/react-table'
import {
  BalanceOperationType,
  ListTransactionsQuery,
  TransactionType
} from '__generated__/graphql'
import { TableItemCreatedDate } from 'shared/ui/bets-table/components/table-items/table-item-created-date'
import { TableItemProfit } from 'shared/ui/bets-table/components/table-items/table-item-profit'
import { TransactionTypeTableItem } from 'shared/ui/bets-table/components/table-items/transaction-type-table-item'
import { TransactionsExplorerLinkTableItem } from 'shared/ui/bets-table/components/table-items/transactions-explorer-link-table-item'

const columnHelper = createColumnHelper<TransactionType>()
export const balanceTransactionsTableColumns = [
  // WARN: temporal solution
  // columnHelper.accessor('type', {
  //   header: 'Transaction type',
  //   cell: props => (
  //     <TransactionTypeTableItem
  //       type={props.getValue() as BalanceOperationType}
  //     />
  //   )
  // }),
  // columnHelper.accessor('amount', {
  //   header: 'Credit amount',
  //   cell: props => <TableItemProfit value={props.getValue()} />
  // }),
  // columnHelper.accessor('createdAt', {
  //   header: 'Date Time',
  //   cell: props => (
  //     <TableItemCreatedDate
  //       isShort
  //       timestamp={props.getValue()}
  //     />
  //   )
  // }),
  // columnHelper.accessor(({ currency, txid }) => ({ currency, txid }), {
  //   header: 'Transaction',
  //   cell: TransactionsExplorerLinkTableItem
  // })
]
