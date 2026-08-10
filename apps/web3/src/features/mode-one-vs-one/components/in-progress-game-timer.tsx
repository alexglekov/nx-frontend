import { FC } from 'react'
import { Box } from '@radix-ui/themes'

import { GameTimer } from './game-timer'

import styles from '../mode-one-vs-one.module.scss'

interface Props {
  endAt: number
  refetch: () => void
}

export const InProgressGameTimer: FC<Props> = ({ endAt, refetch }) => (
  <Box
    mb={'2'}
    width={'100%'}
  >
    <GameTimer
      className={styles.inProgressGameTimer}
      endTime={endAt}
      title='The game is active, wait for the results!'
      refetch={refetch}
    />
  </Box>
)
