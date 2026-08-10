import { Flex, Text } from '@radix-ui/themes'
import { createColumnHelper } from '@tanstack/react-table'
import { BuybackTx } from '__generated__/graphql'
import { format } from 'date-fns'
import { SwapXyroToken } from 'shared/icons'
import { TableItemAnyText } from 'shared/ui/bets-table/components/table-items/table-item-any-text'
import { TableItemProfit } from 'shared/ui/bets-table/components/table-items/table-item-profit'
import { TransactionsExplorerLinkTableItem } from 'shared/ui/bets-table/components/table-items/transactions-explorer-link-table-item'
import { formatToUSD, formatToXyro } from 'shared/utils/format-price'

const columnHelper = createColumnHelper<BuybackTx>()

const TABLE_PRICE_PRECISION = 5

export const buybackHistoryTableColumns = () => [
  timeColumn,

  tetherAmountColumn,

  xyroAmountColumn,

  priceColumn,

  txHashColumn
]

const timeColumn = columnHelper.accessor(
  ({ timestamp }) => ({
    timestamp
  }),
  {
    header: 'Time',
    cell: props => {
      const { timestamp } = props.getValue()

      if (!timestamp) return null

      const time = format(new Date(timestamp), 'dd.MM.yyyy HH:mm')

      return (
        <TableItemAnyText
          className={'color-white'}
          text={time}
        />
      )
    }
  }
)

const tetherAmountColumn = columnHelper.accessor('usdt', {
  header: 'USDT',
  cell: props => {
    const tetherAmount = props.getValue()

    return (
      <TableItemProfit
        value={tetherAmount}
        variant='tether'
      />
    )
  }
})

const xyroAmountColumn = columnHelper.accessor('xyro', {
  header: '$XYRO token burnt',
  cell: props => {
    const xyroAmount = formatToXyro(props.getValue(), 'long')

    return (
      <Flex
        height={'100%'}
        align={'center'}
        gap={'3'}
      >
        <SwapXyroToken width={'3rem'} />

        <Text className='color-white'>{xyroAmount}</Text>
      </Flex>
    )
  }
})

const priceColumn = columnHelper.accessor('price', {
  header: 'Price',
  cell: ctx => {
    const price = formatToUSD(ctx.getValue(), TABLE_PRICE_PRECISION) || 0

    return (
      <TableItemAnyText
        className={'color-white'}
        text={price}
      />
    )
  }
})

const txHashColumn = columnHelper.accessor('txhash', {
  header: 'Transaction',
  cell: ctx => {
    const txId = ctx.getValue()

    return <TransactionsExplorerLinkTableItem txId={txId} />
  },
  meta: {
    className: 'txHashColumn'
  }
})
