import React from 'react'
import { Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import styles from './skeletons.module.scss'
import { TableItemUserSkeleton } from './table-item-user-skeleton'

interface Props {
  isWinnerExists?: boolean
}

export const ModeStatsItemSkeleton: React.FC<Props> = ({
  isWinnerExists = false
}) => {
  return (
    <Flex className={styles.modeStatsItemSkeletonWrapper}>
      <Flex
        direction={'column'}
        gap={'1'}
        width={'100%'}
      >
        <Skeleton width={'15rem'} />
        <Flex
          align={'center'}
          width={'100%'}
          justify={'between'}
        >
          <Skeleton
            width={'10rem'}
            height={'10rem'}
          />

          {isWinnerExists ? <TableItemUserSkeleton /> : null}
          <Skeleton
            height={'4rem'}
            width={'12rem'}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
