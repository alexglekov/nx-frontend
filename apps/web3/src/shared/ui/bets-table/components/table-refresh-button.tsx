import { useState } from 'react'
import { ApolloQueryResult } from '@apollo/client'
import { IconButton } from '@radix-ui/themes'
import { RefreshIcon } from 'shared/icons'
import { XyroLoading } from 'shared/ui/xyro-loading-spinner'

interface Props<TData> {
  refetch: () => Promise<ApolloQueryResult<TData>>
}

export const TableRefreshButton = <TData,>({ refetch }: Props<TData>) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefetch = async () => {
    setIsLoading(true)

    try {
      await refetch()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <IconButton
      size='3'
      variant='soft'
      color='gray'
      onClick={handleRefetch}
    >
      <XyroLoading
        loading={isLoading}
        iconSize={'0'}
      >
        <RefreshIcon
          width={'3rem'}
          height={'3rem'}
        />
      </XyroLoading>
    </IconButton>
  )
}
