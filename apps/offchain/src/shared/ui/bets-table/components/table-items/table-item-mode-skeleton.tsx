import { Flex } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const TableItemModeSkeleton: React.FC = () => {
  return (
    <Flex
      align={'center'}
      height={'100%'}
      gap={'4'}
    >
      <Skeleton
        circle
        count={1}
        width={'3rem'}
        height={'3rem'}
      />
      <Skeleton
        width={'14rem'}
        height={'3rem'}
      />
    </Flex>
  )
}
