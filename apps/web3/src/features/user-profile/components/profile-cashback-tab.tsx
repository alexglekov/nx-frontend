import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useUserCashback } from '../hooks/use-user-cashback'
import { ProfileCashbackTabTransactionItem } from './profile-cashback-tab-transaction-item'
import styles from '../user-profile.module.scss'

export const ProfileCashbackTab: React.FC = () => {
  const { cashbackSummaryData, refetchCashbackSummary, refetchUserLevel } =
    useUserCashback()

  const handleRefreshCashbackData = () => {
    refetchCashbackSummary()
    refetchUserLevel()
  }

  if (!cashbackSummaryData || cashbackSummaryData.length === 0) return

  return (
    <Flex
      direction={'column'}
      gap={'6'}
      className={styles.cashbackTabWrapper}
    >
      <Text
        className={styles.timerTimeText}
        size={'6'}
        align={'center'}
      >
        PAYMENTS ARE AVAILABLE
      </Text>

      <Flex
        direction={'column'}
        gap={'4'}
      >
        {cashbackSummaryData.map(cashbackPeriod => {
          return (
            <ProfileCashbackTabTransactionItem
              key={cashbackPeriod.period.id}
              cashbackPeriod={cashbackPeriod}
              handleRefreshCashbackData={handleRefreshCashbackData}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}
