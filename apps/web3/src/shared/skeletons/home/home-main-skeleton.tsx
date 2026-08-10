import React from 'react'
import { Flex } from '@radix-ui/themes'
import { ModeCardsSkeleton } from '../common-skeletons/mode-cards-skeleton'

export const HomeMainSkeleton: React.FC = () => {
  return (
    <Flex direction={'column'}>
      <ModeCardsSkeleton />
    </Flex>
  )
}
