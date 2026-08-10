import { Flex } from '@radix-ui/themes'
import React from 'react'
import { TableSkeleton } from '../common-skeletons/table-skeleton'
import { BannerSkeleton } from '../common-skeletons/banner-skeleton'
import { HomeMainSkeleton } from '../home/home-main-skeleton'

export const HomePageSkeleton: React.FC = () => {
  return (
    <Flex
      direction='column'
      gap='1'
    >
      <BannerSkeleton />

      <HomeMainSkeleton />

      <TableSkeleton />
    </Flex>
  )
}
