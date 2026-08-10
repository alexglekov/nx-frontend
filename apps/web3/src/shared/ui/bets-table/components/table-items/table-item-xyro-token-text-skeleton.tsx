import React from 'react'
import { Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

interface Props {
  isXyroTokenDisplayed?: boolean
}

export const TableItemXyroTextSkeleton: React.FC<Props> = ({
  isXyroTokenDisplayed = true
}) => {
  return (
    <Flex
      gap={'2'}
      align={'center'}
      height={'100%'}
    >
      {isXyroTokenDisplayed ? (
        <Skeleton
          width={'3rem'}
          height={'3rem'}
        />
      ) : null}

      <Skeleton
        width={'8rem'}
        height={'3rem'}
      />
    </Flex>
  )
}
