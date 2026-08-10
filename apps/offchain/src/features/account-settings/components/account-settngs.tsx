import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { accountSettingsActiveTabVar } from '../store'
import { AccountSettingsTab } from '../types'
import { AccountSettingsPassword } from './account-settings-password'
import { AccountSettingsPreference } from './account-settings-preference'
import { AccountSettingsTabSwitcher } from './account-settings-tab-switcher'

export const AccountSettings: React.FC = () => {
  const accountSettingsActiveTab = useReactiveVar(accountSettingsActiveTabVar)

  const tabContent = getSettingsTabContent(accountSettingsActiveTab)

  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'5'}
    >
      <AccountSettingsTabSwitcher />

      {tabContent}
    </Flex>
  )
}

const getSettingsTabContent = (tab: AccountSettingsTab) => {
  if (tab === AccountSettingsTab.PREFERENCE) {
    return <AccountSettingsPreference />
  }

  if (tab === AccountSettingsTab.PASSWORD) {
    return <AccountSettingsPassword />
  }
}
