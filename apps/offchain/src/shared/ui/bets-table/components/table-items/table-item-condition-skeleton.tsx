import { Flex } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const TableItemBetConditionSkeleton: React.FC = () => {
  return (
    <Flex
      align={'center'}
      height={'100%'}
      gap={'2'}
    >
      <Skeleton
        width={'3rem'}
        height={'3rem'}
        circle
      />
      <Skeleton
        width={'4rem'}
        height={'3rem'}
      />
      <Skeleton
        width={'3rem'}
        height={'2rem'}
      />
    </Flex>
  )
}
