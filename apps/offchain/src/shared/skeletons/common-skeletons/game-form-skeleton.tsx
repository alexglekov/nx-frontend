import { Box, Card, Flex, Grid } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styles from './skeletons.module.scss'

export const GameFormSkeleton: React.FC = () => {
  return (
    <Card
      size={'3'}
      className={styles.gameFormSkeletonWrapper}
    >
      <Skeleton
        height={'4rem'}
        width={'32rem'}
      />
      <Flex
        direction={'column'}
        width={'100%'}
        mt={'6'}
      >
        <Skeleton width={'6rem'} />
        <Skeleton
          width={'100%'}
          height={'6rem'}
        />
      </Flex>
      <Grid
        columns={'3fr 1fr'}
        gap={'2'}
        mt={'3'}
      >
        <Flex
          direction={'column'}
          width={'100%'}
        >
          <Skeleton width={'6rem'} />
          <Skeleton
            width={'100%'}
            height={'6rem'}
          />
        </Flex>
        <Flex
          direction={'column'}
          width={'100%'}
        >
          <Skeleton width={'6rem'} />
          <Skeleton
            width={'100%'}
            height={'6rem'}
          />
        </Flex>
      </Grid>
      <Flex
        align={'center'}
        justify={'between'}
        mt={'3'}
      >
        <Skeleton width={'12rem'} />
        <Skeleton
          width={'24rem'}
          height={'4rem'}
        />
      </Flex>
      <Flex
        align={'center'}
        justify={'between'}
        gap={'1'}
        mt={'3'}
      >
        <Box width={'100%'}>
          <Skeleton
            height={'6rem'}
            width={'100%'}
          />
        </Box>
        <Box width={'100%'}>
          <Skeleton
            height={'6rem'}
            width={'100%'}
          />
        </Box>
      </Flex>
      <Flex
        direction={'column'}
        width={'100%'}
        mt={'3'}
      >
        <Skeleton width={'6rem'} />
        <Skeleton
          width={'100%'}
          height={'6rem'}
        />
      </Flex>
      <Flex
        mt={'3'}
        gap={'3'}
        align={'center'}
      >
        <Skeleton
          width={'3rem'}
          height={'3rem'}
        />
        <Skeleton
          width={'20rem'}
          height={'3rem'}
        />
        <Skeleton
          circle
          width={'5rem'}
          height={'5rem'}
        />
      </Flex>
      <Box
        width={'100%'}
        mt={'9'}
      >
        <Skeleton
          width={'100%'}
          height={'6rem'}
        />
      </Box>
    </Card>
  )
}
