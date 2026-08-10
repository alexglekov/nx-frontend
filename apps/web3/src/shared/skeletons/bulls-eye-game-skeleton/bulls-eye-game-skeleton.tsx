import React from 'react'
import { Grid } from '@radix-ui/themes'
import { BullsEyeGameGraphSkeleton } from './bulls-eye-game-graph-skeleton'
import { BullsEyeGamePoolSkeleton } from './bulls-eye-game-pool-info-skeleton'

export const BullsEyeGameSkeleton: React.FC = () => {
  return (
    <Grid
      columns={{ initial: '1fr', sm: '1fr 3fr' }}
      gap={'4'}
      width={'100%'}
    >
      <BullsEyeGamePoolSkeleton />
      <BullsEyeGameGraphSkeleton />
    </Grid>
  )
}
