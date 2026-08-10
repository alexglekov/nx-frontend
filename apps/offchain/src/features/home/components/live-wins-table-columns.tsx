import { createColumnHelper } from '@tanstack/react-table'
import { ProviderLiveWin } from '__generated__/graphql'
import { imageFallbackPath } from 'shared/icons'
import { TableItemAnyText } from 'shared/ui/bets-table/components/table-items/table-item-any-text'
import { TableItemCountdown } from 'shared/ui/bets-table/components/table-items/table-item-countdown'
import { TableItemGame } from 'shared/ui/bets-table/components/table-items/table-item-game'
import { TableItemUser } from 'shared/ui/bets-table/components/table-items/table-item-user'
import { formatToUSD } from 'shared/utils/format-price'

const columnHelper = createColumnHelper<ProviderLiveWin>()

export const liveWinsTableColumns = [
  columnHelper.accessor(({ gameName, thumb }) => ({ gameName, thumb }), {
    header: 'GAME',
    cell: props => {
      const { gameName, thumb } = props.getValue()

      const imageThumb =
        thumb?.['500x500'] || thumb?.['380x380'] || thumb?.['300x300']

      const imageUrl = imageThumb || imageFallbackPath

      return (
        <TableItemGame
          gameName={gameName}
          thumb={imageUrl}
        />
      )
    }
  }),

  columnHelper.accessor(
    ({ userAvatarUrl, userName, userId }) => ({
      userAvatarUrl,
      userId,
      userName
    }),
    {
      header: 'PLAYER',
      cell: ctx => {
        const { userAvatarUrl, userId, userName } = ctx.getValue()

        const imageThumb =
          userAvatarUrl?.[0] || userAvatarUrl?.[1] || userAvatarUrl?.[2]

        const avatarUrl = imageThumb || imageFallbackPath

        return (
          <TableItemUser
            userId={userId}
            userName={userName}
            userAvatarUrl={avatarUrl}
          />
        )
      }
    }
  ),

  columnHelper.accessor('timestamp', {
    header: 'TIME',
    cell: props => <TableItemCountdown timestamp={props.getValue() as number} />
  }),

  columnHelper.accessor('betAmount', {
    header: 'WAGER',
    cell: props => {
      const bet = (props.getValue() as number) || 0
      const betToShow = formatToUSD(bet) || '$0.00'

      return <TableItemAnyText text={betToShow} />
    }
  }),

  columnHelper.accessor(({ betAmount, outcome }) => ({ outcome, betAmount }), {
    header: 'MULTIPLIER',
    cell: props => {
      const { outcome, betAmount } = props.getValue()

      const multiplier = outcome ? outcome / betAmount : 0

      return <TableItemAnyText text={multiplier.toFixed(2)} />
    }
  }),

  columnHelper.accessor('outcome', {
    header: 'PAYOUT',
    cell: props => {
      const outcome = (props.getValue() as number) || 0
      const payoutToShow = formatToUSD(outcome) || '$0.00'

      return <TableItemAnyText text={payoutToShow} />
    }
  })
]
