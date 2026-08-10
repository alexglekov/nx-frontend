import { Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import { TableItemXyroTextSkeleton } from '../../ui/bets-table/components/table-items/table-item-xyro-token-text-skeleton'
import styles from './up-down-game-skeleton.module.scss'

export const UpDownTopBetsSkeleton: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      gap={'2'}
      width={'100%'}
      className={styles.topBetsWrapper}
    >
      <Flex
        align={'center'}
        justify={'between'}
      >
        <Skeleton
          width={'6rem'}
          height={'6rem'}
          circle
        />
        <TableItemXyroTextSkeleton isXyroTokenDisplayed={false} />
      </Flex>
      <Flex
        align={'center'}
        justify={'between'}
      >
        <Skeleton
          width={'6rem'}
          height={'6rem'}
          circle
        />
        <TableItemXyroTextSkeleton isXyroTokenDisplayed={false} />
      </Flex>
      <Flex
        align={'center'}
        justify={'between'}
      >
        <Skeleton
          width={'6rem'}
          height={'6rem'}
          circle
        />
        <TableItemXyroTextSkeleton isXyroTokenDisplayed={false} />
      </Flex>
      <Flex
        align={'center'}
        justify={'between'}
      >
        <Skeleton
          width={'6rem'}
          height={'6rem'}
          circle
        />
        <TableItemXyroTextSkeleton isXyroTokenDisplayed={false} />
      </Flex>
      <Flex
        align={'center'}
        justify={'between'}
      >
        <Skeleton
          width={'6rem'}
          height={'6rem'}
          circle
        />
        <TableItemXyroTextSkeleton isXyroTokenDisplayed={false} />
      </Flex>
      <Flex
        align={'center'}
        justify={'between'}
      >
        <Skeleton
          width={'6rem'}
          height={'6rem'}
          circle
        />
        <TableItemXyroTextSkeleton isXyroTokenDisplayed={false} />
      </Flex>
    </Flex>
  )
}
