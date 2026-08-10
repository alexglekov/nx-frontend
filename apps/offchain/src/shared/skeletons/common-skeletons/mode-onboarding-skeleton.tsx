import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import styles from './skeletons.module.scss'

export const ModeOnboardingSkeleton: React.FC = () => {
  return (
    <Box
      width={'100%'}
      className={styles.onBoardingSkeletonWrapper}
    >
      <Flex
        align={'center'}
        gap={'4'}
        mb={{ initial: '0', sm: '6' }}
        direction={{ initial: 'column', sm: 'row' }}
      >
        <Skeleton
          width={'16rem'}
          height={'16rem'}
        />
        <Flex
          width={'100%'}
          direction={'column'}
          gap={'6'}
          align={{ initial: 'center', sm: 'start' }}
        >
          <Box width={{ initial: 'auto', sm: '100%' }}>
            <Skeleton
              height={'6rem'}
              width={'24rem'}
            />
          </Box>
          <Box width={'100%'}>
            <Skeleton width={'100%'} />
            <Skeleton
              width={'100%'}
              className={styles.onBoardingTextSkeleton}
            />
          </Box>

          <Flex
            width={'100%'}
            align={'center'}
            justify={'center'}
            display={{ initial: 'flex', sm: 'none' }}
          >
            <Skeleton
              width={'25rem'}
              height={'3rem'}
            />
          </Flex>
        </Flex>
      </Flex>
      <Skeleton className={styles.onboardingSkeletonContentCard} />
    </Box>
  )
}
