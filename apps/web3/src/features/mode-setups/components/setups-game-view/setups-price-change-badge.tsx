import { Flex, Text } from '@radix-ui/themes'
import styles from '../../mode-setups.module.scss'

interface BadgeProps {
  isTakeProfit: boolean
  changePercent: number
  isLight?: boolean
}
export const SetupsPriceChangeBadge: React.FC<BadgeProps> = ({
  isLight,
  isTakeProfit,
  changePercent
}) => {
  const change = changePercent.toFixed(2)
  const isPositive = changePercent > 0

  return (
    <Flex
      align={'center'}
      justify={'center'}
      gap={'1'}
      p={isLight ? '2' : '0'}
      className={styles.formPricePercent}
    >
      <Text
        highContrast={false}
        color={isTakeProfit ? 'green' : 'pink'}
      >
        {isPositive && '+'} {change}%
      </Text>
    </Flex>
  )
}
