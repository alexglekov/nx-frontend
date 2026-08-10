import { createColumnHelper } from '@tanstack/react-table'
import { OffchainReferralLevel } from '__generated__/graphql'
import { TableItemAnyText } from 'shared/ui/bets-table/components/table-items/table-item-any-text'
import { TableItemReferralLevel } from 'shared/ui/bets-table/components/table-items/table-item-referral-level'
import { formatToUSD } from 'shared/utils/format-price'

const columnHelper = createColumnHelper<OffchainReferralLevel>()

export const referralLevelsColumns = [
  columnHelper.accessor(
    ({ id, name }) => ({
      id,
      name
    }),
    {
      header: 'Level',
      cell: props => {
        const { id, name } = props.getValue()

        if (!id) return null

        return (
          <TableItemReferralLevel
            level={id}
            name={name}
          />
        )
      }
    }
  ),

  columnHelper.accessor('requiredEarning', {
    header: () => (
      <>
        Earnings from
        <br />
        referrals
      </>
    ),
    cell: ctx => (
      <TableItemAnyText text={formatToUSD(ctx.getValue()) || '$0.00'} />
    )
  }),

  columnHelper.accessor('directCashbackPercentage', {
    header: () => (
      <>
        Cashback from
        <br />
        direct referrals
      </>
    ),
    cell: props => {
      const directCashback = props.getValue() || 0

      return <TableItemAnyText text={`${directCashback}%`} />
    }
  }),

  columnHelper.accessor('subCashbackPercentage', {
    header: () => (
      <>
        Earnings from
        <br />
        sub-referrals
      </>
    ),
    cell: ctx => {
      const subCashback = ctx.getValue() || 0

      return <TableItemAnyText text={`${subCashback}%`} />
    }
  })
]
