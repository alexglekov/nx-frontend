import React from 'react'
import { Flex, Grid } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import { RoundedSquareSkeleton } from 'shared/skeletons'
import { RewardsChallengeListSkeleton } from 'shared/skeletons/common-skeletons/rewards-challenge-list-skeleton'
import { TableSkeleton } from 'shared/skeletons/common-skeletons/table-skeleton'

export const RewardsPageSkeleton: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      gap={'2'}
    >
      <Grid
        columns={{ initial: '1fr', sm: '2fr 1fr' }}
        gap={'1'}
      >
        <Skeleton
          width={'100%'}
          height={'44.5rem'}
          borderRadius={'5rem'}
        />

        <Skeleton
          width={'100%'}
          height={'44.5rem'}
          borderRadius={'5rem'}
        />
      </Grid>

      <RoundedSquareSkeleton height={'70px'} />

      <RewardsChallengeListSkeleton />

      <TableSkeleton />
    </Flex>
  )
}
