import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { accountBonusActiveTabVar } from '../store'
import { AccountBonusTab } from '../types'
import { AccountBonusTabSwitcher } from './account-bonus-tab-switcher'
import { AccountBonuses } from './account-bonuses'
import { AccountCashback } from './account-cashback'
import { AccountWelcomePack } from './account-welcome-pack'

export const AccountBonus: React.FC = () => {
  const accountBonusActiveTab = useReactiveVar(accountBonusActiveTabVar)

  const tabContent = getSettingsTabContent(accountBonusActiveTab)

  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'5'}
    >
      <AccountBonusTabSwitcher />

      {tabContent}
    </Flex>
  )
}

const getSettingsTabContent = (tab: AccountBonusTab) => {
  if (tab === AccountBonusTab.ACCOUNT_BONUSES) {
    return <AccountBonuses />
  }

  if (tab === AccountBonusTab.WELCOME_PACK) {
    return <AccountWelcomePack />
  }

  if (tab === AccountBonusTab.CASHBACK) {
    return <AccountCashback />
  }
}
