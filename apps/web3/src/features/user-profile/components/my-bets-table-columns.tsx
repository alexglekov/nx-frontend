import { createColumnHelper } from '@tanstack/react-table'
import { MyBetsItemBet } from 'features/user-profile/components/my-bets-item-bet'
import { AssetId } from 'shared/types'
import { TableItemAsset } from 'shared/ui/bets-table/components/table-items/table-item-asset'
import { TableItemMode } from 'shared/ui/bets-table/components/table-items/table-item-mode'
import { TableItemModeSkeleton } from 'shared/ui/bets-table/components/table-items/table-item-mode-skeleton'
import { TableItemProfit } from 'shared/ui/bets-table/components/table-items/table-item-profit'
import { TableItemXyroTextSkeleton } from 'shared/ui/bets-table/components/table-items/table-item-xyro-token-text-skeleton'

// WARN: temporal commented code to ensure build without typing errors
// NOTE: myBetsTable will be returned on BE later
// const columnHelper =
//   createColumnHelper<GetUserBetsQuery['getUserBets']['bets'][0]>()

interface Props {
  isCompleted: boolean
  loading: boolean
}
// export const myBetsTableColumns = ({ isCompleted, loading }: Props) =>
//   [
//     columnHelper.accessor('game.type', {
//       header: 'Mode',
//       cell: props => {
//         const mode = props.getValue()
//         return loading ? (
//           <TableItemModeSkeleton />
//         ) : (
//           <TableItemMode type={mode} />
//         )
//       }
//     }),
//     columnHelper.accessor('game.assetId', {
//       header: 'Asset',
//       cell: props => {
//         return <TableItemAsset asset={props.getValue() as AssetId} />
//       }
//     }),
//     columnHelper.accessor('amount', {
//       header: 'Amount',
//       cell: props => {
//         return loading ? (
//           <TableItemXyroTextSkeleton />
//         ) : (
//           <MyBetsItemBet amount={props.getValue()} />
//         )
//       }
//     }),
//     isCompleted
//       ? columnHelper.accessor('pnl', {
//           header: 'P&L',
//           cell: props => {
//             return loading ? (
//               <TableItemXyroTextSkeleton />
//             ) : (
//               <TableItemProfit value={props.getValue()} />
//             )
//           }
//         })
//       : null
//   ].filter(el => el !== null)
