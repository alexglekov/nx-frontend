import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { accountSettingsActiveTabVar } from '../store'
import { AccountSettingsTab } from '../types'
// TODO: Split styles file per feature
import styles from '../../account/account.module.scss'

export const AccountSettingsTabSwitcher: React.FC = () => {
  const navigate = useNavigate()
  const currentLocation = window.location.pathname
  const accountSettingsActiveTab = useReactiveVar(accountSettingsActiveTabVar)

  useEffect(() => {
    if (currentLocation === RouterPathes.settingsPreference) {
      handleTabChange(AccountSettingsTab.PREFERENCE)
    }

    if (currentLocation === RouterPathes.settingsPassword) {
      navigate(RouterPathes.settingsPassword)
    }
  }, [])

  const handleTabChange = (tab: AccountSettingsTab) => {
    accountSettingsActiveTabVar(tab)
  }

  return (
    <Flex
      align={'center'}
      gap={'2'}
    >
      <Button
        className={cn(styles.accountTabSwitcher, {
          [styles.accountTabSwitcherActive]:
            accountSettingsActiveTab === AccountSettingsTab.PREFERENCE
        })}
        onClick={() => {
          handleTabChange(AccountSettingsTab.PREFERENCE)
          navigate(RouterPathes.settingsPreference)
        }}
      >
        Preference
      </Button>

      <Button
        className={cn(styles.accountTabSwitcher, {
          [styles.accountTabSwitcherActive]:
            accountSettingsActiveTab === AccountSettingsTab.PASSWORD
        })}
        onClick={() => {
          handleTabChange(AccountSettingsTab.PASSWORD)
          navigate(RouterPathes.settingsPassword)
        }}
      >
        Password
      </Button>
    </Flex>
  )
}
