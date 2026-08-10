import { ReactiveVar } from '@apollo/client'

interface ItemWithId {
  id: string
}

interface AddItemToTableStoreProps<T extends ItemWithId> {
  item: T
  currentItems: T[]
  tableDataReactiveVar: ReactiveVar<T[]>
  take?: number
}

export const addItemToTableStore = <K extends ItemWithId>({
  item,
  currentItems,
  tableDataReactiveVar,
  take = 3
}: AddItemToTableStoreProps<K>) => {
  if (item.id === currentItems[0].id) return

  currentItems.length === take ?
    tableDataReactiveVar([
      item,
      ...currentItems.slice(0, currentItems.length - 1)
    ])
  : tableDataReactiveVar([item, ...currentItems])
}
