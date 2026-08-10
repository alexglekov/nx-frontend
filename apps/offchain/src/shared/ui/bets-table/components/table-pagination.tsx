import { Flex } from '@radix-ui/themes'
import { Table } from '@tanstack/table-core'
import { RadixColorType } from 'shared/types'
import { RadixText } from 'shared/ui/radix-text'
import { XyroButton } from 'shared/ui/xyro-button/xyro-button'
import { XyroNumeral } from 'shared/ui/xyro-numeral'

export const TablePagination = <TGame,>({ table }: { table: Table<TGame> }) => {
  const pageAmount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex + 1

  return pageAmount > 1 ? (
    <Flex
      width={'min-content'}
      align={'center'}
      ml='auto'
      gap='1'
    >
      <XyroButton
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className={'color-white'}
        color={'gray' as RadixColorType}
      >
        {'<'}
      </XyroButton>

      <RadixText
        mx='3'
        className='flex items-center gap-1'
      >
        Page{' '}
        <XyroNumeral
          weight={'medium'}
          isWhite
        >
          {currentPage.toLocaleString()}
          <RadixText align={'center'}>
            &nbsp;of&nbsp;
            {pageAmount.toLocaleString()}
          </RadixText>
        </XyroNumeral>
      </RadixText>

      <XyroButton
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className={'color-white'}
        color={'gray' as RadixColorType}
      >
        {'>'}
      </XyroButton>

      {/* TODO: return fastforward buttons if it will be usefull */}
      {/* <XyroButton
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
        className={'color-white'}
        color={'gray' as RadixColorType}
        >
        {'<<'}
        </XyroButton> */}
      {/* <XyroButton
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
        className={'color-white'}
        color={'gray' as RadixColorType}
        >
        {'>>'}
      </XyroButton> */}
    </Flex>
  ) : null
}
