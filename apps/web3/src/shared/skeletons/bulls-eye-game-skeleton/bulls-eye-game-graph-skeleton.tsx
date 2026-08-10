import React from 'react'
import { Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import { GraphSkeleton } from '../common-skeletons/graph-skeleton'
import styles from './bulls-eye-game-skeleton.module.scss'

export const BullsEyeGameGraphSkeleton: React.FC = () => {
  return (
    <Flex
      className={styles.graphWrapper}
      direction={'column'}
      gap={'3'}
    >
      <Flex
        align={'center'}
        width={'100%'}
        justify={'between'}
      >
        <Flex
          width={'100%'}
          display={{ initial: 'none', sm: 'flex' }}
        >
          <Skeleton
            height={'6rem'}
            width={'30rem'}
          />
        </Flex>
        <Flex
          align={'center'}
          gap={'6'}
        >
          <Flex
            align={'center'}
            gap={'4'}
          >
            <Skeleton
              width={'6rem'}
              height={'6rem'}
              circle
            />
            <Skeleton
              height={'6rem'}
              width={'16rem'}
            />
          </Flex>
          <Flex>
            <Flex
              align={'center'}
              gap={'2'}
            >
              <Skeleton
                width={'4rem'}
                height={'4rem'}
                circle
              />
              <Skeleton
                height={'4rem'}
                width={'10rem'}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <GraphSkeleton />
    </Flex>
  )
}
