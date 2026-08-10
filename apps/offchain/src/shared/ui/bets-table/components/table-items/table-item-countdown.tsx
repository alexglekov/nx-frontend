import React, { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { differenceInMilliseconds } from 'date-fns'
import { formatTime } from 'shared/utils/format-time'
import styles from '../../table.module.scss'

interface Props {
  timestamp: number
}

export const TableItemCountdown: React.FC<Props> = ({ timestamp }) => {
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    const targetDate = new Date(timestamp)
    const interval = setInterval(() => {
      const currentTime = new Date()
      const timeDifference = differenceInMilliseconds(currentTime, targetDate)
      const formattedCountdown = formatTime(timeDifference)
      setCountdown(formattedCountdown)
    }, 1000)

    return () => clearInterval(interval)
  }, [timestamp])

  return (
    <Flex
      height={'100%'}
      align={'center'}
      className={styles.tableItemCountdown}
    >
      {countdown} ago
    </Flex>
  )
}
