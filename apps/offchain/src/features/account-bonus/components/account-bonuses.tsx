import React from 'react'
import { Flex } from '@radix-ui/themes'
import { useAccountBonuses } from '../hooks/use-account-bonuses'
import { AccountBonusesActiveBonus } from './account-bonuses-active-bonus'
import { AccountBonusesList } from './account-bonuses-list'
import { AccountBonusesRealBalance } from './account-bonuses-real-balance'

export const AccountBonuses: React.FC = () => {
  useAccountBonuses()

  return (
    <Flex
      direction={'column'}
      gap={'3'}
    >
      <Flex
        direction={{ initial: 'column', sm: 'row' }}
        gap={'3'}
      >
        <AccountBonusesRealBalance />

        <AccountBonusesActiveBonus />
      </Flex>

      <AccountBonusesList />
    </Flex>
  )
}
