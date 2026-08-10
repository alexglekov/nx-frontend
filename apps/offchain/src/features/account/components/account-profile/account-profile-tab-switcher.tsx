import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { accountActiveTabVar } from '../../store/account-profile.store'
import { AccountTab } from '../../types'
import styles from '../../account.module.scss'

export const AccountTabSwitcher: React.FC = () => {
  const navigate = useNavigate()
  const currentLocation = window.location.pathname
  const accountActiveTab = useReactiveVar(accountActiveTabVar)

  useEffect(() => {
    if (currentLocation === RouterPathes.accountMyAccount) {
      handleTabChange(AccountTab.MY_ACCOUNT)
    }

    if (currentLocation === RouterPathes.accountBasicInformation) {
      handleTabChange(AccountTab.BASIC_INFO)
    }

    if (currentLocation === RouterPathes.accountSocials) {
      handleTabChange(AccountTab.SOCIAL)
    }
  }, [])

  const handleTabChange = (tab: AccountTab) => {
    accountActiveTabVar(tab)
  }

  return (
    <Flex
      align={'center'}
      gap={'2'}
    >
      <Button
        className={cn(styles.accountTabSwitcher, {
          [styles.accountTabSwitcherActive]:
            accountActiveTab === AccountTab.MY_ACCOUNT
        })}
        onClick={() => {
          handleTabChange(AccountTab.MY_ACCOUNT)
          navigate(RouterPathes.accountMyAccount)
        }}
      >
        My account
      </Button>

      <Button
        className={cn(styles.accountTabSwitcher, {
          [styles.accountTabSwitcherActive]:
            accountActiveTab === AccountTab.BASIC_INFO
        })}
        onClick={() => {
          handleTabChange(AccountTab.BASIC_INFO)
          navigate(RouterPathes.accountBasicInformation)
        }}
      >
        Basic information
      </Button>

      <Button
        className={cn(styles.accountTabSwitcher, {
          [styles.accountTabSwitcherActive]:
            accountActiveTab === AccountTab.SOCIAL
        })}
        onClick={() => {
          handleTabChange(AccountTab.SOCIAL)
          navigate(RouterPathes.accountSocials)
        }}
      >
        Social
      </Button>
    </Flex>
  )
}
