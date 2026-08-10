import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import styles from '../../table.module.scss'

interface Props {
  timestamp: number
}

export const TableItemCreatedAt: React.FC<Props> = ({ timestamp }) => {
  return (
    <Flex
      direction={'column'}
      className={styles.tableItemCreatedAt}
    >
      <Text size={'3'}>{format(timestamp, 'dd.MM.yyyy')}</Text>
      <Text
        size={'3'}
        color='gray'
      >
        {format(timestamp, 'HH:mm')}
      </Text>
    </Flex>
  )
}
