import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { userVar } from 'shared/store/user'
import styles from '../../account/account.module.scss'

export const AccountCashbackInfo: React.FC = () => {
  const user = useReactiveVar(userVar)

  const baseCashback = user?.loyaltyProgress?.currentCashback?.base || 0
  const bonusCashback = user?.loyaltyProgress?.currentCashback?.additional || 0

  const totalCashback = (baseCashback + bonusCashback) * 100

  return (
    <Flex
      direction={'column'}
      gap={'1'}
      className={styles.cashbackItem}
    >
      <Flex
        align={'center'}
        justify={'between'}
        gap={{ initial: '4', sm: '0' }}
      >
        <Flex
          direction={'column'}
          gap={'2'}
        >
          <Text
            size={'4'}
            weight={'bold'}
            className={'color-white'}
          >
            Cashback
          </Text>

          <Text
            size={'3'}
            className={cn(styles.cashbackDescription, 'color-gray-light')}
          >
            Cashback is a percentage of your bets returned to you as a bonus. It
            is calculated based on your total bets and losses over a specific
            period.
          </Text>
        </Flex>

        <Text
          size={'9'}
          className={'color-pink'}
          weight={'bold'}
        >
          {totalCashback.toFixed(0)}%
        </Text>
      </Flex>
    </Flex>
  )
}
