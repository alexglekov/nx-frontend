import { Box, Card, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import { TableItemXyroTextSkeleton } from '../../ui/bets-table/components/table-items/table-item-xyro-token-text-skeleton'
import styles from './up-down-game-skeleton.module.scss'
import { UpDownTopBetsSkeleton } from './up-down-top-bets-skeleton'

export const UpDownPoolColumnSkeleton: React.FC = () => {
  return (
    <Box className={styles.upDownPoolSkeleton}>
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
        gap={'4'}
        direction={'column'}
      >
        <UpDownTopBetsSkeleton />

        <Card size={'1'}>
          <Flex
            height={'100%'}
            gap={'2'}
            direction={'column'}
            align={'center'}
          >
            <Flex
              gap={'1'}
              align={'center'}
            >
              <Skeleton
                height={'3rem'}
                width={'10rem'}
              />
            </Flex>
            <Flex
              align={'center'}
              gap={'1'}
            >
              <TableItemXyroTextSkeleton />
            </Flex>
          </Flex>
        </Card>

        <Skeleton
          height={'6rem'}
          width={'100%'}
        />
      </Flex>
    </Box>
  )
}
