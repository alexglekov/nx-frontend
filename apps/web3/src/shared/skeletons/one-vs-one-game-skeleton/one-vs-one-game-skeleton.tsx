import { Grid } from '@radix-ui/themes'
import React from 'react'
import { GameFormSkeleton } from '../common-skeletons/game-form-skeleton'
import { GameGraphSkeleton } from '../common-skeletons/game-graph-skeleton'

export const OneVsOneGameSkeleton: React.FC = () => {
  return (
    <Grid
      columns={'1.5fr 3fr'}
      gap={'2'}
      width={'100%'}
    >
      <GameFormSkeleton />
      <GameGraphSkeleton />
    </Grid>
  )
}
