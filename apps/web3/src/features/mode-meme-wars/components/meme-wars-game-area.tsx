import React from 'react'
import { Grid } from '@radix-ui/themes'
import { useResponsive } from 'shared/hooks/use-responsive'
import { MemeWarsForm } from './meme-wars-form'
import { MemeWarsGraph } from './meme-wars-graph'
import styles from '../mode-meme-wars.module.scss'

export const MemeWarsGameArea: React.FC = () => {
  const [isMobile] = useResponsive('xs')

  if (isMobile) {
    return (
      <Grid
        columns={{ initial: '1fr', xs: '1.5fr 3fr', sm: '1.5fr 3fr' }}
        width={'100%'}
        align={'stretch'}
        gap={'2'}
        mt={'2'}
        className={styles.memeWarsGameArea}
      >
        <MemeWarsGraph />

        <MemeWarsForm />
      </Grid>
    )
  }

  return (
    <Grid
      columns={{ initial: '1fr', xs: '1.5fr 3fr', sm: '1.5fr 3fr' }}
      width={'100%'}
      align={'stretch'}
      gap={'2'}
      mt={'2'}
      className={styles.memeWarsGameArea}
    >
      <MemeWarsForm />

      <MemeWarsGraph />
    </Grid>
  )
}
