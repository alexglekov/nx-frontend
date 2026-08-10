import { FC, useEffect, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { MS_IN_SEC } from 'shared/constants'
import { TimerClockIcon } from 'shared/icons'
import { formatTime } from 'shared/utils/format-time'
import styles from '../mode-one-vs-one.module.scss'

interface Props {
  className: string
  endTime: number
  title: string
  refetch: () => void
}

export const GameTimer: FC<Props> = ({
  className,
  endTime,
  title,
  refetch
}) => {
  const [time, setTime] = useState(() => endTime - Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(endTime - Date.now())

      if (endTime - Date.now() < 0) {
        refetch()
      }
    }, MS_IN_SEC)

    return () => clearInterval(interval)
  }, [])

  return (
    <Flex
      className={cn(styles.gameTimer, className)}
      align={'center'}
      justify={'between'}
    >
      <Text>{title}</Text>
      <Flex className={styles.gameTimerCounter}>
        <TimerClockIcon className={styles.gameClock} />

        <Text>{formatTime(time)}</Text>
      </Flex>
    </Flex>
  )
}
