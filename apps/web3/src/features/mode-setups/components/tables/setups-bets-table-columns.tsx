/* eslint-disable max-lines */
import { Flex } from '@radix-ui/themes'
import { createColumnHelper } from '@tanstack/react-table'
import { PredictStatus, SetupsPredictFragment } from '__generated__/graphql'
import { AssetId, Web3Adress } from 'shared/types'
import { TableItemAction } from 'shared/ui/bets-table'
import { TableItemAnyText } from 'shared/ui/bets-table/components/table-items/table-item-any-text'
import { TableItemAsset } from 'shared/ui/bets-table/components/table-items/table-item-asset'
import { TableItemGameId } from 'shared/ui/bets-table/components/table-items/table-item-game-id'
import { TableItemProfit } from 'shared/ui/bets-table/components/table-items/table-item-profit'
import { TableItemTarget } from 'shared/ui/bets-table/components/table-items/table-item-target'
import { TableItemUntilFinish } from 'shared/ui/bets-table/components/table-items/table-item-until-finish'
import { TableItemResult } from 'shared/ui/table/table-item-result'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { zeroAddress } from 'viem'
import { SetupsPredictsTableType } from '../../constants'

// NOTE: SetupGame is not real type of data, but similar.  We can't use SetupsGameFragment in the table
const columnHelper = createColumnHelper<SetupsPredictFragment>()

// eslint-disable-next-line max-statements
export const getJoinedSetupsTableColumns = (
  activeType: string,
  onAccept?: (
    gameId: string,
    status: PredictStatus,
    contractAddress: Web3Adress
  ) => void
) => {
  const columns = [
    AssetIdTableColumn,
    ConditionTableColumn,
    AmountTableColumn,

    activeType === Completed ? PnlTableColumn : null,
    activeType !== Current && isNotNullOrUndef(onAccept) ?
      getClaimTableColumn(onAccept)
    : null,
    MultiplierTableColumn,

    activeType === Current ? getUntilFinishTableColumn() : null,

    resultTableColumn,

    gameIdColumn
  ].filter(isNotNullOrUndef)

  return columns
}

const AssetIdTableColumn = columnHelper.accessor('game.asset.id', {
  header: 'Asset',
  cell: ctx => {
    return <TableItemAsset asset={ctx.getValue() as AssetId} />
  }
})

const ConditionTableColumn = columnHelper.accessor(bet => bet, {
  header: 'Condition',
  cell: ctx => {
    // TODO: Add logic with isPriceResult field when server will fix it
    const bet = ctx.getValue()

    if (!('game' in bet)) return null
    const game = bet.game

    if (!('stopLoss' in game && 'takeProfit' in game && 'startPrice' in game))
      return null

    const { stopLoss, takeProfit, startPrice } = game
    return (
      <TableItemTarget
        stopLoss={stopLoss ?? null}
        takeProfit={takeProfit ?? null}
        startPrice={startPrice as number}
      />
    )
  }
})

const getUntilFinishTableColumn = () => {
  return columnHelper.accessor('game.endAt', {
    header: 'Until finish',
    cell: ctx => {
      const endAt = ctx.getValue()

      const timestamp = endAt || 0
      const timeRemain = timestamp - Date.now()

      return (
        <TableItemUntilFinish
          time={timeRemain}
          isCentered={true}
          textSize='3'
        />
      )
    }
  })
}

const PnlTableColumn = columnHelper.accessor(bet => bet, {
  header: 'P&L',
  cell: ctx => {
    const bet = ctx.getValue()
    if (!('pnl' in bet)) return null
    const pnl = bet.pnl ?? null

    return <TableItemProfit value={pnl} />
  }
})

// TODO: Return when setups will be refactored
// const PoolSizeTableColumn = columnHelper.accessor(bet => bet, {
//   header: 'Pool size',
//   cell: ctx => {
//     const bet = ctx.getValue()

//     if (!('game' in bet)) return null
//     const game = bet.game

//     if (!('takeProfitPool' in game)) return null
//     const { takeProfitPool: tpPool, stopLossPool: slPool } = game
//     //  as SetupsGameShallow

//     const totalAmount = tpPool.poolAmount + slPool.poolAmount
//     const totalBets = tpPool.predictsCount + slPool.predictsCount

//     return (
//       <TableItemPoolSize
//         totalAmount={totalAmount}
//         totalBets={totalBets}
//         isCentered
//       />
//     )
//   }
// })

const getClaimTableColumn = (
  onAccept: (
    gameId: string,
    status: PredictStatus,
    contractAddress: Web3Adress
  ) => void
) => {
  return columnHelper.accessor(bet => bet, {
    header: 'Claim',
    cell: ctx => {
      const bet = ctx.getValue()

      const approveButtonEnabled =
        (bet.status === PredictStatus.Won ||
          bet.status === PredictStatus.Reject) &&
        !bet.isRetrieved

      const contractAddress = bet?.game?.contractAddress as Web3Adress

      if (!approveButtonEnabled) return null

      return (
        <Flex
          align={'center'}
          height={'100%'}
        >
          <TableItemAction
            type={'approve'}
            action={() => onAccept(bet.gameId, bet.status, contractAddress)}
            title={'Claim'}
          />
        </Flex>
      )
    }
  })
}

const AmountTableColumn = columnHelper.accessor(bet => bet, {
  header: 'Amount',
  cell: ctx => {
    const bet = ctx.getValue()
    if (!('amount' in bet)) return null

    return (
      <TableItemProfit
        value={bet?.amount}
        tokenColor='yellow'
      />
    )
  }
})

const gameIdColumn = columnHelper.accessor('gameId', {
  header: 'Game Id',
  cell: ctx => {
    return <TableItemGameId gameId={ctx.getValue() || zeroAddress} />
  }
})

const resultTableColumn = columnHelper.accessor('status', {
  header: 'Result',
  cell: ctx => <TableItemResult status={ctx.getValue()} />
})

const MultiplierTableColumn = columnHelper.accessor(bet => bet, {
  header: 'MP',
  cell: ctx => {
    const bet = ctx.getValue()
    if (!('outcome' in bet)) return null
    if (!bet?.outcome || !bet?.amount) return null

    const multiplier = bet?.outcome / bet?.amount
    return <TableItemAnyText text={`x${multiplier.toFixed(2)}`} />
  }
})

const { Completed, Current } = SetupsPredictsTableType
