import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import styles from '../../table.module.scss'

interface Props {
  timestamp: number
  isShort?: boolean
}

export const TableItemCreatedDate: React.FC<Props> = ({
  timestamp,
  isShort = false
}) => {
  return (
    <Flex
      gap={'1'}
      height={'100%'}
      align={'center'}
      className={styles.tableItemCreatedDateText}
    >
      <Text
        size={'3'}
        weight={'medium'}
        className='color-white'
      >
        {format(timestamp, isShort ? 'MMM d, yyyy' : 'dd.MM.yyyy')}
      </Text>
      {!isShort ? (
        <Text
          size={'3'}
          color='gray'
        >
          {format(timestamp, 'HH:mm')}
        </Text>
      ) : null}
    </Flex>
  )
}
