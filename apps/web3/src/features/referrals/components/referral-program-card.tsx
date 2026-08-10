import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { ReferralsCardBanner } from 'shared/icons'
import { useWithdrawRequest } from '../hooks/use-withdraw-request'
import { ReferralCardBonusesWithdraw } from './referral-program-card-bonuses-withdraw'
import styles from '../referrals.module.scss'

export const ReferralProgramCard: React.FC = () => {
  const { loading } = useWithdrawRequest()

  if (loading)
    return (
      <Skeleton
        width={'100%'}
        height={'44.5rem'}
        borderRadius={'5rem'}
      />
    )

  return (
    <Flex
      width={'100%'}
      direction={'column'}
      className={styles.referralCardWrapper}
      position={'relative'}
      justify={'between'}
    >
      <Flex
        width={'100%'}
        direction={'column'}
      >
        <Text
          className='color-white'
          size={'7'}
          weight={'bold'}
          mb={'3'}
        >
          Referral Program
        </Text>

        <Text
          className={cn('color-white', styles.referralCardDescriptionText)}
          size={'2'}
          weight={'regular'}
        >
          Earn points through in-app activities and quests. The more active you
          are, the more challenges you complete, the more points you will
          accumulate. Top the leaderboard and secure exclusive prizes for your
          efforts.
        </Text>
      </Flex>

      <ReferralCardBonusesWithdraw />

      <ReferralsCardBanner className={styles.referralsCardBanner} />
    </Flex>
  )
}
