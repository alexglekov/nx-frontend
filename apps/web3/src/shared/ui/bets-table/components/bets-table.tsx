/* eslint-disable max-lines */
import { useCallback, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Table } from '@radix-ui/themes'
import {
  ColumnDef,
  PaginationState,
  Row,
  Table as TanstackTable,
  Updater,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { getTableSekeletonColumns } from 'shared/skeletons/common-skeletons/table-skeleton-columns'
import { userVar } from 'shared/store/user'
import { Web3Adress } from 'shared/types'
import { TableEmptyState } from './table-empty-state'
import { OpenDetailsCell } from './table-items/table-cell-open-details'
import { TablePagination } from './table-pagination'
import styles from '../table.module.scss'

// TODO: move BetsTable to the features
interface Props<TEntity> {
  onDetailsCellClick?: (bet: TEntity) => void
  openDetailsButtonDataTestID?: DataTestIDs | ''
  bets: TEntity[]
  columns: ColumnDef<TEntity, any>[]
  emptyStateText?: string
  tableId?: string // NOTE: to generate unique keys
  manualPagination?: boolean
  className?: string
  tableContentLineClassname?: string
  isPaginationEnabled?: boolean
  tableDataTestId?: DataTestIDs | ''
  onPaginationChange?: (state: PaginationState) => void
  pageSize?: number
  pageCount?: number
  pageIndex?: number
  loading?: boolean
  detailsTitle?: string
  ownerTitle?: string
}
// eslint-disable-next-line max-statements
export const BetsTable = <TEntity,>({
  onDetailsCellClick,
  openDetailsButtonDataTestID,
  bets,
  columns,
  pageCount,
  onPaginationChange,
  pageSize = 5,
  pageIndex = 0,
  emptyStateText = '',
  tableId = 'default',
  manualPagination = false,
  className = '',
  tableContentLineClassname = '',
  isPaginationEnabled = true,
  tableDataTestId = '',
  loading = false,
  detailsTitle = 'Open details',
  ownerTitle = 'Open details'
}: Props<TEntity>) => {
  const user = useReactiveVar(userVar)

  const [pagination, setPagination] = useState({
    pageIndex,
    pageSize
  })

  const handlePaginationChange = useCallback(
    (updater: Updater<PaginationState>) => {
      if (typeof updater !== 'function') return
      if (!pagination) return

      const newPaginationState = updater(pagination)
      setPagination(newPaginationState)

      if (!onPaginationChange) return
      onPaginationChange(newPaginationState)
    },
    [onPaginationChange, pagination]
  )

  const tableBets = loading ? ([{}, {}, {}, {}, {}] as any) : bets
  const tableColumns = loading ? (getTableSekeletonColumns() as any) : columns

  const table = useReactTable({
    data: tableBets,
    columns: tableColumns,
    pageCount,
    manualPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: handlePaginationChange,
    state: {
      pagination
    }
  })

  const handleDetailsCellClick = useCallback(
    (row: Row<TEntity>) => {
      if (!onDetailsCellClick) return
      onDetailsCellClick(row.original)
    },
    [onDetailsCellClick]
  )

  if (!tableBets || tableBets.length === 0) {
    return <TableEmptyState text={emptyStateText} />
  }

  return (
    <Flex
      position={'relative'}
      width={'100%'}
      direction={'column'}
      data-testid={tableDataTestId}
    >
      <Table.Root className={cn(styles.tableRoot, className)}>
        <Table.Header className={styles.tableHeaderClassname}>
          {table.getHeaderGroups().map(({ id, depth, headers }) => {
            return (
              <Table.Row key={`${tableId}-${id}-${depth}`}>
                {headers.map(header => (
                  <Table.ColumnHeaderCell
                    key={`${tableId}-${header.depth}-${header.column.id}-${header.index}`}
                    className={styles.tableHeaderCell}
                  >
                    {header.isPlaceholder ? null : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </Table.ColumnHeaderCell>
                ))}

                {/* NOTE: empty header for details button */}
                <Table.ColumnHeaderCell className={styles.tableHeaderCell} />
              </Table.Row>
            )
          })}
        </Table.Header>

        <Table.Body>
          {table.getRowModel().rows.map(row => {
            const { ownerId } = row.original as { ownerId: Web3Adress }
            const openDetailsTitle =
              ownerId === user?.id ? ownerTitle : detailsTitle

            return (
              <Table.Row
                key={row.id}
                className={cn(
                  styles.tableBodyRowClassname,
                  tableContentLineClassname
                )}
              >
                {row.getAllCells().map(cell => (
                  <Table.Cell
                    key={`${cell.id}-${cell.column.id}`}
                    className={styles.tableBodyCell}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}

                {onDetailsCellClick && !loading && user?.id && (
                  <OpenDetailsCell
                    dataTestID={openDetailsButtonDataTestID}
                    onClick={() => handleDetailsCellClick(row as Row<TEntity>)}
                    title={openDetailsTitle}
                  />
                )}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>

      {!loading && isPaginationEnabled && (
        <TablePagination<TEntity> table={table as TanstackTable<TEntity>} />
      )}
    </Flex>
  )
}
