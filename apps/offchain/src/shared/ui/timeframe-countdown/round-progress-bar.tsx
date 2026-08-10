import { FC } from 'react'
import { Box } from '@radix-ui/themes'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { RadixSize, Seconds } from 'shared/types'
import styles from './timeframe-countdown.module.scss'

interface Props {
  progress: Seconds
  maxValue?: Seconds
  size?: RadixSize
}
export const RoundProgressBar: FC<Props> = ({
  progress,
  maxValue,
  size = 'auto' as const
}) => {
  return (
    <Box
      className={styles.roundProgressBar}
      width={'3rem'}
      height={size}
    >
      <CircularProgressbar
        className={styles.timeframeCountdown}
        value={progress}
        maxValue={maxValue}
        counterClockwise={true}
        strokeWidth={50}
        background={true}
        styles={progressBarStyles}
      />
    </Box>
  )
}

const progressBarStyles = buildStyles({
  pathColor: 'var(--c-a-snow)',
  trailColor: 'var(--c-black)',
  backgroundColor: 'var(--c-black)',
  pathTransitionDuration: 0.3,
  strokeLinecap: 'butt'
})
