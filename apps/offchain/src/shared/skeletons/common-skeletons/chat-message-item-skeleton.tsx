import { Flex } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { TableItemUserSkeleton } from './table-item-user-skeleton'
import styles from './skeletons.module.scss'

export const ChatMessageItemSkeleton: React.FC = () => {
  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'2'}
      className={styles.chatMessageItemWrapper}
    >
      <Flex
        width={'100%'}
        justify={'between'}
      >
        <TableItemUserSkeleton />
        <Skeleton width={'8rem'} />
      </Flex>
      <Flex
        width={'100%'}
        direction={'column'}
      >
        <Skeleton width={'100%'} />
        <Skeleton width={'50%'} />
      </Flex>
    </Flex>
  )
}
