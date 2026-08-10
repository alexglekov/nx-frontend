import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { TetherRoundedIcon } from 'shared/icons'
import { useWithdrawRequest } from '../hooks/use-withdraw-request'
import styles from '../referrals.module.scss'

export const ReferralCardBonusesWithdraw: React.FC = () => {
  const { availabeWithdrawBalance, handleCreateWithdrawRequest } =
    useWithdrawRequest()

  return (
    <Flex
      direction={'column'}
      gap={'4'}
      className={styles.referralsCardWithdrawContainer}
    >
      <Flex
        direction={'column'}
        gap={'2'}
      >
        <Text
          size={'1'}
          weight={'bold'}
          className='color-white'
        >
          Your balance:
        </Text>

        <Flex
          align={'center'}
          gap={'1'}
        >
          <TetherRoundedIcon
            color='var(--yellow)'
            width={'2rem'}
            height={'2rem'}
          />

          <Text
            weight='light'
            size={'6'}
            className='color-white'
          >
            {availabeWithdrawBalance}
          </Text>
        </Flex>
      </Flex>

      <Flex
        direction={'column'}
        gap={'1'}
      >
        <Button
          color='green'
          className={styles.referralWithdrawButton}
          onClick={handleCreateWithdrawRequest}
        >
          <Text weight={'bold'}>WITHDRAW BONUSES</Text>
        </Button>

        <Text
          weight={'regular'}
          className={styles.referralWithdrawButtonText}
        >
          Withdrawal request will be processed within 24 hours
        </Text>
      </Flex>
    </Flex>
  )
}
