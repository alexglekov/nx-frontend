import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import { useResponsive } from 'shared/hooks/use-responsive'
import styles from './skeletons.module.scss'

export const BannerSkeleton: React.FC = () => {
  const [isMobile] = useResponsive('xs')

  return (
    <Flex
      className={styles.bannerSkeletonWrapper}
      direction={'column'}
      align={{ initial: 'center', sm: 'start' }}
    >
      <Skeleton
        width={isMobile ? '45rem' : '80rem'}
        height={'6rem'}
      />
      <Skeleton
        width={isMobile ? '35rem' : '65rem'}
        height={'6rem'}
      />

      <Box mt={{ initial: '6', sm: '4' }}>
        <Skeleton width={'50rem'} />
        <Skeleton width={'50rem'} />
      </Box>

      <Flex
        width={'100%'}
        align={'center'}
        gap={'7'}
        className={styles.bannerButtonsWrapper}
      >
        <Box>
          <Skeleton
            width={'32rem'}
            height={'7rem'}
            borderRadius={'8rem'}
          />
        </Box>
        <Flex
          align={'center'}
          gap={'2'}
        >
          <Skeleton
            circle
            width={'2rem'}
            height={'2rem'}
          />
          <Skeleton
            circle
            width={'2rem'}
            height={'2rem'}
          />
          <Skeleton
            circle
            width={'2rem'}
            height={'2rem'}
          />
          <Skeleton
            circle
            width={'2rem'}
            height={'2rem'}
          />
          <Skeleton
            circle
            width={'2rem'}
            height={'2rem'}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
