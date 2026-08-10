import { Flex } from '@radix-ui/themes'
import { createColumnHelper } from '@tanstack/react-table'
import { UpDownPredict } from '__generated__/graphql'
import { Web3Adress } from 'shared/types'
import { TableItemGameId } from 'shared/ui/bets-table/components/table-items/table-item-game-id'
import { TableItemProfit } from 'shared/ui/bets-table/components/table-items/table-item-profit'
import { ResultTableItem } from 'shared/ui/bets-table/components/table-items/table-item-result'
import { zeroAddress } from 'viem'
import { ConditionTableItem } from './condition-table-item'
import { TableItemUpDownProfit } from './table-item-updown-profit'

const columnHelper = createColumnHelper<UpDownPredict>()

export const getCompletedUpDownTableColumns = () => [
  isLongColumn,

  amountColumn,

  pnlColumn,

  statusColumn,

  gameIdColumn
]

const isLongColumn = columnHelper.accessor('isLong', {
  header: 'Condition',
  cell: props => {
    const isLong = props.getValue()

    return (
      <Flex
        height={'100%'}
        width={'auto'}
        align={'center'}
      >
        <ConditionTableItem isPositive={isLong ? true : false} />
      </Flex>
    )
  }
})

const amountColumn = columnHelper.accessor('amount', {
  header: 'Amount',
  cell: props => {
    const gameContractAddress =
      props.row.original.game?.contractAddress || zeroAddress

    return (
      <TableItemProfit
        value={props.getValue()}
        gameContractAddress={gameContractAddress as Web3Adress}
      />
    )
  }
})

const pnlColumn = columnHelper.accessor('pnl', {
  header: 'Profit',
  cell: props => {
    const predict = props.row.original

    return <TableItemUpDownProfit predict={predict} />
  }
})

const statusColumn = columnHelper.accessor(predict => predict, {
  header: 'Result',
  cell: props => {
    const { status, winStreakLength } = props.getValue()

    const finalStatus = winStreakLength > 1 ? 'WinStreak' : status

    return (
      <Flex
        height={'100%'}
        width={'auto'}
        align={'center'}
      >
        <ResultTableItem
          result={finalStatus}
          dedicatedAmount={winStreakLength}
        />
      </Flex>
    )
  }
})

const gameIdColumn = columnHelper.accessor('gameId', {
  header: 'Game Id',
  cell: ctx => {
    return <TableItemGameId gameId={ctx.getValue() || zeroAddress} />
  }
})
