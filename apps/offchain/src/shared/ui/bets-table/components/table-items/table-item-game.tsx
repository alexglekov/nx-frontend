import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import styles from '../../table.module.scss'

interface Props {
  gameName: string
  thumb: string
}

export const TableItemGame: React.FC<Props> = ({ gameName, thumb }) => {
  return (
    <Flex
      align={'center'}
      height={'100%'}
      gap={'4'}
    >
      <img
        src={thumb}
        className={styles.gameImage}
        alt={`${gameName} preview`}
      />

      <Text
        size={'4'}
        weight={'medium'}
        className={styles.tableItemMode}
      >
        {gameName}
      </Text>
    </Flex>
  )
}
