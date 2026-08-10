import { Box } from '@radix-ui/themes'
import { RoundedSquareSkeleton } from 'shared/skeletons'
import { GameGraphSkeleton } from 'shared/skeletons/common-skeletons/game-graph-skeleton'
import styles from '../../mode-setups.module.scss'

export const SetupsGameViewSkeleton = () => {
  return (
    <Box
      height={'100%'}
      className={styles.setupsGameFormWithGraph}
    >
      <RoundedSquareSkeleton height='80rem' />
      <GameGraphSkeleton />
    </Box>
  )
}
