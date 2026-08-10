import { Flex } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styles from './skeletons.module.scss'

export const UserProfileInfoStatsSkeleton: React.FC = () => {
  return (
    <Flex
      width={'100%'}
      className={styles.userProfileInfoStatsSkeletonWrapper}
    >
      <Flex
        align={'center'}
        gap={'5'}
      >
        <Skeleton
          height={'10rem'}
          width={'10rem'}
        />
        <Flex
          direction={'column'}
          gap={'2'}
        >
          <Skeleton width={'16rem'} />
          <Skeleton
            width={'12rem'}
            height={'5rem'}
          />
        </Flex>
      </Flex>
      <Flex
        align={'center'}
        gap={'5'}
      >
        <Skeleton
          height={'10rem'}
          width={'10rem'}
        />
        <Flex
          direction={'column'}
          gap={'2'}
        >
          <Skeleton width={'16rem'} />
          <Skeleton
            width={'12rem'}
            height={'5rem'}
          />
        </Flex>
      </Flex>
      <Flex
        align={'center'}
        gap={'5'}
      >
        <Skeleton
          height={'10rem'}
          width={'10rem'}
        />
        <Flex
          direction={'column'}
          gap={'2'}
        >
          <Skeleton width={'16rem'} />
          <Skeleton
            width={'12rem'}
            height={'5rem'}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
