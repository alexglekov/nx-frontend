import { Flex } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styles from './skeletons.module.scss'
import { UserProfileInfoStatsSkeleton } from './user-profile-info-stats-skeleton'

export const UserProfileInfoSkeleton: React.FC = () => {
  return (
    <Flex
      className={styles.userProfileInfoSkeletonWrapper}
      direction={'column'}
    >
      <Flex
        width={'100%'}
        justify={'between'}
        align={'start'}
      >
        <Flex
          align={'center'}
          gap={'5'}
        >
          <Skeleton
            circle
            width={'12rem'}
            height={'12rem'}
          />
          <Flex
            direction={'column'}
            gap={'2'}
          >
            <Skeleton
              height={'6rem'}
              width={'16rem'}
            />
            <Skeleton
              height={'4rem'}
              width={'12rem'}
            />
          </Flex>
        </Flex>
        <Flex
          align={'center'}
          gap={'2'}
        >
          <Skeleton
            width={'6rem'}
            height={'6rem'}
            className={styles.diamondWrapper}
          />
          <Skeleton
            width={'6rem'}
            height={'6rem'}
            className={styles.diamondWrapper}
          />
          <Skeleton
            width={'6rem'}
            height={'6rem'}
            className={styles.diamondWrapper}
          />
        </Flex>
      </Flex>
      <UserProfileInfoStatsSkeleton />
    </Flex>
  )
}
