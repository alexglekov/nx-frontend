import { useReactiveVar } from '@apollo/client'
import { Badge, Flex } from '@radix-ui/themes'
import { RadixText, TetherToken, XyroNumeral } from 'shared/ui'
import { SwapXyroToken } from '../../../shared/icons'
import { betAmountVar } from '../store/amount.store'
import { upDownGameVar } from '../store/game.store'
import { upDownCurrentContractVar } from '../store/up-down-contract-addresses.store'
import { calculateBetPayout } from '../utils/calculate-bet-prize-amount'
import styles from '../mode-up-down.module.scss'

/* eslint-disable-next-line max-statements */
export const PoolInfoPayout = ({ isLong }: { isLong: boolean }) => {
  const game = useReactiveVar(upDownGameVar)
  const currentSmartContract = useReactiveVar(upDownCurrentContractVar)
  const myPredict = game?.myPredict || null
  const betAmount = useReactiveVar(betAmountVar)

  const isHaveBet = myPredict?.isLong === isLong

  const { percent, amount } = calculateBetPayout(
    isLong,
    betAmount,
    isHaveBet,
    game?.upPool,
    game?.downPool,
    currentSmartContract?.meta?.fee
  )

  const poolPayoutLabel = isLong ? 'UP PAYOUT' : 'DOWN PAYOUT'

  const potentialReturn = amount && amount !== Infinity ? amount : 0
  const poolPayout = percent && percent !== Infinity ? percent : 0

  return (
    <Flex
      gap={{ initial: '2', sm: '3' }}
      align={'center'}
      justify={'center'}
      direction={{ initial: 'column' }}
      className={styles.betPayoutInfoContainer}
    >
      <Flex
        align={'center'}
        direction={'column'}
        gap='2'
      >
        <RadixText
          size={'3'}
          weight={'bold'}
          align={'center'}
          className={styles.poolSizeTitle}
        >
          {poolPayoutLabel}
        </RadixText>

        <Badge
          size={'2'}
          color='orange'
          radius='large'
          className={styles.payoutPercent}
        >
          <XyroNumeral
            isWhite={false}
            size={'4'}
          >
            +{poolPayout.toFixed(2)}%
          </XyroNumeral>
        </Badge>
      </Flex>

      <Flex
        align={'center'}
        justify={'center'}
        gap={'1'}
      >
        {currentSmartContract?.smartContractForXyroToken ?
          <SwapXyroToken
            width={'2.5rem'}
            height={'2.5rem'}
          />
        : <TetherToken
            size='2.5rem'
            className='color-yellow'
          />
        }

        <RadixText
          size={'5'}
          weight={'regular'}
        >
          {potentialReturn}
        </RadixText>
      </Flex>
    </Flex>
  )
}
