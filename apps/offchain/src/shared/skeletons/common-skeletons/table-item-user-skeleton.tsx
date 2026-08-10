import { Flex } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const TableItemUserSkeleton: React.FC = () => {
  return (
    <Flex
      gap={'2'}
      align={'center'}
    >
      <Skeleton
        circle
        width={'5rem'}
        height={'5rem'}
      />
      <Flex
        direction={'column'}
        gap={'1'}
      >
        <Skeleton width={'12rem'} />
        <Flex
          align={'center'}
          gap={'1'}
        >
          <Skeleton width={'2rem'} />
          <Skeleton width={'2rem'} />
        </Flex>
      </Flex>
    </Flex>
  )
}
