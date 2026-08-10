import { SyntheticEvent } from 'react'
import { Flex } from '@radix-ui/themes'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTestIDs } from 'shared/constants'
import { OneVsOneGameCustomType, Web3Adress } from 'shared/types'
import { TableCellPlayerProfile } from 'shared/ui/bets-table/components/table-items/table-cell-player'
import { TableItemAction } from 'shared/ui/bets-table/components/table-items/table-item-action'
import { TableItemGameId } from 'shared/ui/bets-table/components/table-items/table-item-game-id'
import { TableItemProfit } from 'shared/ui/bets-table/components/table-items/table-item-profit'
import { TableItemUntilFinish } from 'shared/ui/bets-table/components/table-items/table-item-until-finish'
import { TableItemPredictCondition } from 'shared/ui/table/table-item-predict-condition'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { zeroAddress } from 'viem'

const columnHelper = createColumnHelper<OneVsOneGameCustomType>()

interface Props {
  userId?: string
  onAccept: (event: SyntheticEvent, game: OneVsOneGameCustomType) => void
  onReject: (event: SyntheticEvent, game: OneVsOneGameCustomType) => void
}
export const getOpenGamesColumns = ({ userId, onAccept, onReject }: Props) => {
  return [
    ownerColumn,
    conditionColumn,
    amountColumn,
    getUntilFinishColumn(),
    gameIdColumn,
    getUntilAcceptColumn(),
    userId ? getAcceptOrDenyColumn(userId, onAccept, onReject) : null
  ].filter(isNotNullOrUndef)
}

const conditionColumn = columnHelper.accessor(game => game, {
  header: 'Condition',
  cell: ctx => {
    const game = ctx.getValue()
    const predict = game.ownerPredict
    return (
      <TableItemPredictCondition
        predict={predict}
        game={game}
      />
    )
  }
})

const getUntilFinishColumn = () =>
  columnHelper.accessor('endAt', {
    header: 'Until Finish',
    cell: ctx => {
      const untilFinish = ctx.getValue()
      const until = untilFinish ? untilFinish - Date.now() : 0

      return <TableItemUntilFinish time={until} />
    }
  })

const getUntilAcceptColumn = () =>
  columnHelper.accessor('stopPredictAt', {
    header: 'Until Accept',
    cell: ctx => {
      const stopPredictAt = ctx.getValue()
      const until = stopPredictAt ? stopPredictAt - Date.now() : 0

      return <TableItemUntilFinish time={until} />
    }
  })

const getAcceptOrDenyColumn = (
  userId: string,
  onAccept: (event: SyntheticEvent, game: OneVsOneGameCustomType) => void,
  onReject: (event: SyntheticEvent, game: OneVsOneGameCustomType) => void
) =>
  columnHelper.accessor(game => game, {
    id: 'Accept or Deny',
    header: () => null,
    cell: ctx => {
      const game = ctx.getValue()
      const isUserOwner = userId === game.ownerId

      if (!isUserOwner) {
        return null
      }

      return (
        <Flex
          align={'center'}
          justify={'center'}
          height={'100%'}
          gap={'5'}
        >
          <TableItemAction
            action={(event: SyntheticEvent) => onReject(event, game)}
            type={'deny'}
            dataTestID={DataTestIDs.buttonOneVsOneDeny}
          />
        </Flex>
      )
    }
  })

const ownerColumn = columnHelper.accessor('owner', {
  header: 'User',
  cell: ctx => (
    <TableCellPlayerProfile
      user={ctx.getValue() ?? null}
      className='color-white'
    />
  )
})

const amountColumn = columnHelper.accessor('ownerPredict.amount', {
  header: 'Amount',
  cell: ctx => {
    const tokenContractAddress = ctx.row.original.token as Web3Adress

    return (
      <TableItemProfit
        value={ctx.getValue()}
        tokenContractAddress={tokenContractAddress}
      />
    )
  }
})

const gameIdColumn = columnHelper.accessor('ownerPredict.gameId', {
  header: 'Game Id',
  cell: ctx => {
    return <TableItemGameId gameId={ctx.getValue() || zeroAddress} />
  }
})
