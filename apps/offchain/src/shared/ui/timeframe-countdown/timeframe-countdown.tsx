import { useEffect, useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { MS_IN_SEC, SECS_IN_HOUR } from 'shared/constants'
import { Milliseconds, Seconds } from 'shared/types'
import 'react-circular-progressbar/dist/styles.css'
import { formatTime } from 'shared/utils/format-time'
import { XyroNumeral } from '../xyro-numeral'
import { RoundProgressBar } from './round-progress-bar'
import styles from './timeframe-countdown.module.scss'

interface Props {
  endAt: Milliseconds
  timeframe?: Seconds
  children?: JSX.Element
}
export const TimeframeCountdown: React.FC<Props> = ({
  endAt,
  timeframe = SECS_IN_HOUR as Seconds,
  children
}) => {
  const [timeLeft, setTimeLeft] = useState<Seconds>(0 as Seconds)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = endAt - now
      const distanceInSeconds =
        distance > 0 ? Math.floor(distance / MS_IN_SEC) : 0
      setTimeLeft(distanceInSeconds as Seconds)
    }, MS_IN_SEC)

    return () => clearInterval(interval)
  }, [endAt])

  const progress = Math.floor((timeLeft / timeframe) * 100)

  return (
    <Flex
      align={'center'}
      gap={'4'}
    >
      <Text
        size={'1'}
        style={{ color: 'var(--gray)' }}
      >
        {children}
      </Text>

      <Flex
        align={'center'}
        justify={'center'}
        gap={'2'}
        position={'relative'}
        className={styles.countdownWrapper}
      >
        <Box
          className={styles.timeframeCountdownContainer}
          position={'absolute'}
        />
        <RoundProgressBar
          progress={progress as Seconds}
          maxValue={100 as Seconds}
          size={'5'}
        />

        <XyroNumeral
          isWhite={true}
          className={styles.timerCounter}
          size={'4'}
        >
          {formatTime(timeLeft * MS_IN_SEC)}
        </XyroNumeral>
      </Flex>
    </Flex>
  )
}
