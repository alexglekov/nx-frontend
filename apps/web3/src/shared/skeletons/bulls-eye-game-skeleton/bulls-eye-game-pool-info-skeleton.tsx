import { Box, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import { UpDownTopBetsSkeleton } from '../up-down-game-skeleton/up-down-top-bets-skeleton'
import styles from './bulls-eye-game-skeleton.module.scss'

export const BullsEyeGamePoolSkeleton: React.FC = () => {
  return (
    <Box className={styles.bullsEyePoolSkeleton}>
      <Flex
        align={'center'}
        direction={'column'}
        mt={'2'}
      >
        <Skeleton
          width={'14rem'}
          height={'3rem'}
        />

        <Flex
          align={'center'}
          gap={'1'}
          mb={'5'}
          mt={'2'}
        >
          <Skeleton
            circle
            width={'2rem'}
            height={'2rem'}
          />
          <Skeleton width={'6rem'} />
        </Flex>
      </Flex>

      <Flex
        gap={'3'}
        direction={'column'}
      >
        <UpDownTopBetsSkeleton />

        <Skeleton
          height={'4rem'}
          width={'100%'}
        />

        <Skeleton
          height={'6rem'}
          width={'100%'}
        />
      </Flex>
    </Box>
  )
}
