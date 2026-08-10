import React from 'react'
import { Flex, Separator, Text } from '@radix-ui/themes'
import { formatToUSD } from 'shared/utils/format-price'
import { useReferralData } from '../hooks/use-referral-data'
import { CurrentLevel } from './current-level'
import styles from '../referral.module.scss'

export const LevelStats: React.FC = () => {
  const { referralUserLevel } = useReferralData()

  const leaderBoardPosition = referralUserLevel?.leaderboardPosition || 'N/A'
  const depositedFriends = referralUserLevel?.totalSeasonDepositedReferrals || 0
  const revShareRecieved = referralUserLevel?.availableForWithdrawal || 0

  return (
    <Flex
      direction={'column'}
      gap={'4'}
      className={styles.levelStats}
    >
      <CurrentLevel />

      <Flex
        justify={{ initial: 'center', sm: 'between' }}
        gap={'7'}
      >
        <Flex
          direction={'column'}
          gap={'1'}
        >
          <Text
            size={'1'}
            className={'color-gray-light'}
          >
            On leaderboard
          </Text>

          <Text
            size={'5'}
            className={'color-white'}
            weight={'bold'}
          >
            #{leaderBoardPosition}
          </Text>
        </Flex>

        <Flex
          direction={'column'}
          gap={'1'}
          mb={'3'}
        >
          <Text
            size={'1'}
            className={'color-gray-light'}
          >
            Deposited friends
          </Text>

          <Text
            size={'5'}
            className={'color-white'}
            weight={'bold'}
          >
            {depositedFriends}
          </Text>
        </Flex>
      </Flex>

      <Separator
        size={'1'}
        className={styles.separator}
      />

      <Flex
        direction={'column'}
        align={'center'}
      >
        <Flex
          direction={{ initial: 'row', sm: 'column' }}
          align={'center'}
          gap={'3'}
          mb={'4'}
        >
          <Text
            size={'2'}
            className={'color-gray-light'}
            weight={'bold'}
          >
            RevShare received:
          </Text>

          <Text
            size={'7'}
            className={'color-white'}
          >
            {formatToUSD(revShareRecieved)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
