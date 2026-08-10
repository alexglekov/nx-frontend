import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { XyroBox } from 'shared/ui/xyro-box/xyro-box'
import styles from '../../mode-setups.module.scss'

interface Props {
  isTakeProfit: boolean
  multiplier: number
}
export const SetupsExitStrategyBadge: React.FC<Props> = ({
  isTakeProfit,
  multiplier
}) => {
  const multiplierText = multiplier === 0 ? 0 : multiplier.toFixed(1)
  return (
    <Flex
      position={'absolute'}
      className={cn(styles.setupPriceBadge, {
        [styles.takeProfit]: isTakeProfit
      })}
    >
      <XyroBox borderColor='var(--c-white-alpha-1)'>
        <Text
          size={'1'}
          className={styles.setupPriceBadgeText}
        >
          x{multiplierText}
        </Text>
      </XyroBox>
    </Flex>
  )
}
