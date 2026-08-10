import { Flex, Text } from '@radix-ui/themes'
import { TetherToken, XyroNumeral } from 'shared/ui'
import { formatToUSD } from 'shared/utils/format-price'
import styles from '../../mode-setups.module.scss'

interface Props {
  totalAmount: number
  totalBets: number
  isCentered?: boolean
}
export const TableItemPoolSize: React.FC<Props> = ({
  totalAmount,
  totalBets,
  isCentered = false
}) => {
  return (
    <Flex
      direction='column'
      gap={'1'}
      align={isCentered ? 'center' : 'start'}
      height={'100%'}
    >
      <Flex
        align={'center'}
        gap={'3'}
        display={'flex'}
        height={isCentered ? '100%' : 'auto'}
        justify={'between'}
        className={styles.poolSizeStat}
      >
        <Text
          size={'3'}
          color='green'
        >
          Pool size
        </Text>

        <Flex align={'center'}>
          <XyroNumeral
            isWhite={true}
            size={'3'}
          >
            {totalAmount || 0}
          </XyroNumeral>
          <TetherToken color='yellow' />
        </Flex>
      </Flex>

      <Flex
        align={'center'}
        gap={'6'}
        display={'flex'}
        height={isCentered ? '100%' : 'auto'}
        justify={'between'}
        className={styles.poolSizeStat}
      >
        <Text
          size={'3'}
          color='green'
        >
          Players
        </Text>
        <XyroNumeral
          size={'3'}
          isWhite={true}
        >
          {totalBets}
        </XyroNumeral>
      </Flex>
    </Flex>
  )
}
