import { FC } from 'react'
import { Badge, Flex } from '@radix-ui/themes'
import { SetupPredict, SetupsGamePoolFragment } from '__generated__/graphql'
import cn from 'classnames'
import { Maybe } from 'shared/types'
import { DotTitle } from 'shared/ui'
import { SetupsExitStrategyPoolSize } from './setups-exit-strategy-pool-size'
import { SetupsExitStrategyPrice } from './setups-exit-strategy-price'
import styles from '../../mode-setups.module.scss'

interface Props {
  priceType: 'TP' | 'SL'
  price: number
  pool?: Maybe<SetupsGamePoolFragment>
  userBet?: SetupPredict | null
  startPrice?: Maybe<number>
  appearance?: 'dark' | 'light'
}
export const SetupsExitStrategyOption: FC<Props> = ({
  priceType,
  price,
  pool,
  startPrice,
  userBet,
  appearance = 'dark'
}) => {
  const isTakeProfit = priceType === 'TP'
  const isLightAppearance = appearance === 'light'

  const isOptionDimmed =
    userBet &&
    ((userBet?.isLong && priceType === 'SL') ||
      (!userBet?.isLong && priceType === 'TP'))

  const poolMultiplier = pool?.multiplier ? pool?.multiplier.toFixed(2) : 0

  const optionClassNames = cn(styles.setupTakeProfitOption, {
    [styles.takeProfit]: isTakeProfit,
    [styles.appearanceLight]: isLightAppearance,
    [styles.optionDimmed]: isOptionDimmed
  })

  return (
    <Flex
      direction={'column'}
      gap='2'
      width={'100%'}
      // grow={'1'}
    >
      <Flex
        className={optionClassNames}
        width={'100%'}
        direction={'column'}
        position={'relative'}
        gap='3'
      >
        <SetupsExitStrategyPrice
          isLightAppearance={isLightAppearance}
          isTakeProfit={isTakeProfit}
          startPrice={startPrice ?? null}
          price={price}
        />
        <SetupsExitStrategyPoolSize pool={pool ?? null} />
      </Flex>

      <Flex
        width={'100%'}
        justify={'center'}
        align={'center'}
        gap='2'
      >
        <DotTitle
          withDot={false}
          color='gray'
        >
          PAYOUT
        </DotTitle>

        <Badge
          size={'2'}
          color='orange'
          radius='large'
          className={styles.payout}
        >
          x{poolMultiplier}
        </Badge>
      </Flex>
    </Flex>
  )
}
