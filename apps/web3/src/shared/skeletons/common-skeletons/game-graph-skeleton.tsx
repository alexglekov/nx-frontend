import { Box, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import { RoundedSquareSkeleton } from './rounded-square-skeleton'
import styles from './skeletons.module.scss'

export const GameGraphSkeleton: React.FC = () => {
  return (
    <Flex
      className={styles.gameGraphSkeletonWrapper}
      direction={'column'}
      width={'100%'}
      height={'100%'}
    >
      <Flex
        align={'center'}
        gap={'6'}
      >
        <Flex
          align='center'
          gap={'2'}
        >
          <Skeleton
            circle
            width={'5rem'}
            height={'5rem'}
          />
          <Skeleton
            width={'10rem'}
            height={'4rem'}
          />
        </Flex>
        <Flex direction={'column'}>
          <Skeleton width={'12rem'} />
          <Skeleton
            width={'14rem'}
            height={'4rem'}
          />
        </Flex>
      </Flex>

      <Box mt={'3'}>
        <RoundedSquareSkeleton />
      </Box>
    </Flex>
  )
}
