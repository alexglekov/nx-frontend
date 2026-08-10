import { Flex } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styles from './skeletons.module.scss'

export const WinsCarouselItemSkeleton: React.FC = () => {
  return (
    <Flex
      px={'5'}
      py={'4'}
      justify={'between'}
      align={'center'}
      gap={'9'}
      className={styles.carouselItemWrapper}
    >
      <Flex
        gap={'2'}
        align={'center'}
      >
        <Skeleton
          circle
          width={'6rem'}
          height={'6rem'}
        />
        <Flex
          direction={'column'}
          gap={'1'}
        >
          <Skeleton width={'12rem'} />
          <Flex
            align={'center'}
            gap={'1'}
          >
            <Skeleton width={'2rem'} />
            <Skeleton width={'2rem'} />
          </Flex>
        </Flex>
      </Flex>

      <Flex
        direction={'column'}
        align={'end'}
      >
        <Skeleton width={'4rem'} />
        <Skeleton width={'8rem'} />
      </Flex>
    </Flex>
  )
}
