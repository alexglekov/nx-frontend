import React from 'react'
import { Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import { GraphSkeleton } from '../common-skeletons/graph-skeleton'
import styles from './up-down-game-skeleton.module.scss'

export const UpDownGameGraphSkeleton: React.FC = () => {
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

      <Flex
        width={'100%'}
        align={'center'}
        justify={'between'}
        display={{ initial: 'none', sm: 'flex' }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map(el => {
          return (
            <Skeleton
              height={'5rem'}
              width={'10rem'}
              key={el}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}
