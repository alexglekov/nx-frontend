import React from 'react'
import { TableIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { EmptyTableStateIcon } from 'shared/icons'
import styles from '../table.module.scss'

interface Props {
  text?: string
  icon?: React.ReactNode
}
export const TableEmptyState: React.FC<Props> = ({
  text,
  icon = <TableIcon />
}) => {
  return (
    <Flex
      width={'100%'}
      align={'center'}
      justify={'center'}
      className={styles.emptyTableContainer}
    >
      <Flex
        align={'center'}
        justify={'center'}
        direction={'column'}
        gap={'5'}
      >
        <EmptyTableStateIcon />
        <Text
          size={'4'}
          className={styles.emptyTableText}
        >
          {text}
        </Text>
      </Flex>
    </Flex>
  )
}
