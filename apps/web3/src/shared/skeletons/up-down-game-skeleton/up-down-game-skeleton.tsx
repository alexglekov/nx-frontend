import React from 'react'
import { Grid } from '@radix-ui/themes'
import { UpDownGameGraphSkeleton } from './up-down-game-graph-skeleton'
import styles from './up-down-game-skeleton.module.scss'
import { UpDownPoolColumnSkeleton } from './up-down-pool-column-skeleton'

export const UpDownGameSkeleton: React.FC = () => {
  return (
    <Grid
      columns={'1fr 4fr 1fr'}
      gap={'4'}
      width={'100%'}
      className={styles.upDownGameWrapperSkeleton}
    >
      <UpDownPoolColumnSkeleton />
      <UpDownGameGraphSkeleton />
      <UpDownPoolColumnSkeleton />
    </Grid>
  )
}
