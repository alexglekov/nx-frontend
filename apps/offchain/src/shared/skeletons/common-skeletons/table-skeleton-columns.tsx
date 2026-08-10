import { createColumnHelper } from '@tanstack/react-table'
import Skeleton from 'react-loading-skeleton'
import { TableItemXyroTextSkeleton } from 'shared/ui/bets-table/components/table-items/table-item-xyro-token-text-skeleton'

const columnHelper = createColumnHelper<unknown>()

export const getTableSekeletonColumns = () => [
  columnHelper.accessor(item => item, {
    id: '1',
    cell: () => {
      return <TableItemXyroTextSkeleton isXyroTokenDisplayed={false} />
    },
    header: () => (
      <Skeleton
        width={'16rem'}
        height={'3rem'}
      />
    )
  }),

  columnHelper.accessor(item => item, {
    id: '2',
    header: () => (
      <Skeleton
        width={'16rem'}
        height={'3rem'}
      />
    ),
    cell: () => {
      return <TableItemXyroTextSkeleton />
    }
  }),

  columnHelper.accessor(item => item, {
    id: '3',
    header: () => (
      <Skeleton
        width={'16rem'}
        height={'3rem'}
      />
    ),
    cell: () => {
      return <TableItemXyroTextSkeleton />
    }
  }),

  columnHelper.accessor(item => item, {
    id: '4',
    header: () => (
      <Skeleton
        width={'16rem'}
        height={'3rem'}
      />
    ),
    cell: () => {
      return <TableItemXyroTextSkeleton isXyroTokenDisplayed={false} />
    }
  })
]
