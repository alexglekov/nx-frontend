import React from 'react'
import { Grid } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

export const GamesPageSkeleton: React.FC = () => {
  return (
    <Grid
      width={'100%'}
      columns={'repeat(auto-fill, minmax(25rem, 1fr))'}
      gap={'2rem'}
    >
      {Array.from({ length: 30 })?.map((_, index) => (
        <Skeleton
          key={index}
          width={'25rem'}
          height={'25rem'}
        />
      ))}
    </Grid>
  )
}
