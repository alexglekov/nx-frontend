import { FC } from 'react'
import { Box } from '@radix-ui/themes'

import { GameTimer } from './game-timer'

import styles from '../mode-one-vs-one.module.scss'

interface Props {
  stopPredictAt: number
  refetch: () => void
}

export const AcceptGameTimer: FC<Props> = ({ stopPredictAt, refetch }) => (
  <Box
    mb={'2'}
    width={'100%'}
  >
    <GameTimer
      className={styles.acceptGameTimer}
      title={'Accept the game!'}
      endTime={stopPredictAt}
      refetch={refetch}
    />
  </Box>
)
