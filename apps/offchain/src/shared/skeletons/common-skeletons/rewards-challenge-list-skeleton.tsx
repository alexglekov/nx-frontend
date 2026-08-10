import React from 'react'
import { Grid } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

export const RewardsChallengeListSkeleton: React.FC = () => {
  return (
    <Grid
      columns={'1fr 1fr 1fr'}
      gap={'1'}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(el => {
        return (
          <Skeleton
            key={el}
            width={'100%'}
            height={'31rem'}
            borderRadius={'4rem'}
          />
        )
      })}
    </Grid>
  )
}
