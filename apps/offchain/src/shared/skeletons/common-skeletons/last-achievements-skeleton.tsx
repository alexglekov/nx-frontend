import { Box, Flex, Separator } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styles from './skeletons.module.scss'

export const LastAchievementsSkeleton: React.FC = () => {
  return (
    <Flex
      className={styles.lastAchievementsSkeletonWrapper}
      align={'start'}
      direction={'column'}
    >
      <Flex
        width={'100%'}
        align={'center'}
        justify={'between'}
      >
        <Skeleton
          width={'16rem'}
          height={'4rem'}
        />
        <Skeleton
          width={'12rem'}
          height={'4rem'}
        />
      </Flex>
      <Box
        width={'100%'}
        mt={'3'}
      >
        <Skeleton
          width={'100%'}
          height={'54.5rem'}
        />
      </Box>
      <Flex
        direction={'column'}
        gap={'3'}
        mt={'7'}
        width={'100%'}
      >
        <Skeleton width={'16rem'} />
        <Flex
          align={'center'}
          justify={'between'}
          width={'100%'}
          className={styles.statItemWrapper}
        >
          <Skeleton
            height={'3rem'}
            width={'12rem'}
          />
          <Skeleton
            height={'3rem'}
            width={'12rem'}
          />
        </Flex>
        <Separator size={'4'} />
        <Flex
          align={'center'}
          justify={'between'}
          width={'100%'}
          className={styles.statItemWrapper}
        >
          <Skeleton
            height={'3rem'}
            width={'12rem'}
          />
          <Skeleton
            height={'3rem'}
            width={'12rem'}
          />
        </Flex>
        <Separator size={'4'} />
        <Flex
          align={'center'}
          justify={'between'}
          width={'100%'}
          className={styles.statItemWrapper}
        >
          <Skeleton
            height={'3rem'}
            width={'12rem'}
          />
          <Skeleton
            height={'3rem'}
            width={'12rem'}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
