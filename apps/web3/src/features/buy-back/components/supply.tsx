/* eslint-disable max-lines */
import { Box, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { ArrowRightBoldShadow } from 'shared/icons'
import { formatToXyro } from 'shared/utils/format-price'
import { useLoadSupply } from '../hooks/use-load-supply'
import styles from '../buy-back.module.scss'

export const Supply: React.FC = () => {
  const { data, loading } = useLoadSupply()
  return (
    <Flex
      className={cn(styles.cardWrapper, styles.cardStats)}
      direction={'column'}
      gap={'5'}
    >
      {loading ?
        <SupplySkeleton />
      : <SupplyContent {...data} />}
    </Flex>
  )
}

const SupplySkeleton = () => (
  <>
    <Skeleton
      width={'100%'}
      height={'10rem'}
    />

    <Skeleton
      width={'100%'}
      height={'5rem'}
    />

    <Skeleton
      width={'100%'}
      height={'5rem'}
    />

    <Skeleton
      width={'100%'}
      height={'5rem'}
    />
  </>
)

interface SupplyContentProps {
  totalSupply: number
  burned: number
  circulating: number
  circulatingPercentage: number
  percentageBurned: number
  locked: number
  lockedPercentage: number
}

const SupplyContent: React.FC<SupplyContentProps> = ({
  totalSupply,
  burned,
  circulating,
  circulatingPercentage,
  percentageBurned,
  locked,
  lockedPercentage
}) => {
  const formattedBurnedPercentage = percentageBurned.toFixed(2)
  const formattedCirculatingPercentage = circulatingPercentage.toFixed(2)
  const formattedLockedPercentage = lockedPercentage.toFixed(2)

  return (
    <>
      <Text
        className={styles.cardHeaderText}
        weight={'medium'}
      >
        $XYRO Total Supply
      </Text>

      <Flex
        className={styles.xyroSupplyStats}
        align={'center'}
        gap={'1'}
      >
        <ArrowRightBoldShadow color={'var(--c-a-green'} />

        <Box
          className={styles.burntXyroLine}
          width={`${percentageBurned}%`}
        />

        <Box
          className={styles.circulatingXyroLine}
          width={`${circulatingPercentage}%`}
        />

        <Box
          className={styles.lockedXyroLine}
          width={`${lockedPercentage}%`}
        />
      </Flex>

      <SupplyStats
        type={'burnt'}
        amount={burned}
        percentage={formattedBurnedPercentage}
      />

      <SupplyStats
        type={'circulating'}
        amount={circulating}
        percentage={formattedCirculatingPercentage}
      />

      <SupplyStats
        type={'locked'}
        amount={locked}
        percentage={formattedLockedPercentage}
      />

      <Flex direction={'column'}>
        <Text
          className={styles.buybackedValueText}
          weight={'medium'}
        >
          Total $XYRO Supply
        </Text>

        <Text
          className={'color-white'}
          weight={'bold'}
        >
          {formatToXyro(totalSupply)} $XYRO
        </Text>
      </Flex>
    </>
  )
}

interface SupplyStatsProps {
  type: 'burnt' | 'circulating' | 'locked'
  amount: number
  percentage: string
}

const SupplyStats: React.FC<SupplyStatsProps> = ({
  type,
  amount,
  percentage
}) => {
  const supplyType = type.charAt(0).toUpperCase() + type.slice(1)
  const xyroAmount = formatToXyro(amount)

  return (
    <Flex
      direction={'column'}
      gap={'1'}
    >
      <Flex
        align={'center'}
        gap={'1'}
      >
        <Box
          className={cn(styles.supplyLine, {
            [styles.supplyLineGreen]: type === 'circulating',
            [styles.supplyLinePink]: type === 'burnt',
            [styles.supplyLineGray]: type === 'locked'
          })}
        />

        <Text
          className={styles.buybackedValueText}
          weight={'medium'}
        >
          {supplyType} $XYRO
        </Text>

        <Text
          className={cn({
            'color-green': type === 'circulating',
            'color-pink': type === 'burnt',
            'color-gray': type === 'locked'
          })}
        >
          {percentage}%
        </Text>
      </Flex>

      <Flex
        gap={'2'}
        align={'center'}
      >
        <Text
          size={'3'}
          weight={'bold'}
          className={'color-white'}
        >
          {xyroAmount}
        </Text>

        <Text
          className={styles.buybackedValueText}
          weight={'bold'}
        >
          $XYRO
        </Text>
      </Flex>
    </Flex>
  )
}
