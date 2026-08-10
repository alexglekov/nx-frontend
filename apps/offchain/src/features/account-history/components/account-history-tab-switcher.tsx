import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { accountHistoryActiveTabVar } from '../store'
import { AccountHistoryTab } from '../types'
// TODO: Split styles file per feature
import styles from '../../account/account.module.scss'

export const AccountHistoryTabSwitcher: React.FC = () => {
  const navigate = useNavigate()
  const currentLocation = window.location.pathname
  const accountHistoryActiveTab = useReactiveVar(accountHistoryActiveTabVar)

  useEffect(() => {
    if (currentLocation === RouterPathes.historyDeposit) {
      handleTabChange(AccountHistoryTab.DEPOSIT)
    }

    if (currentLocation === RouterPathes.historyWithdraw) {
      handleTabChange(AccountHistoryTab.WITHDRAW)
    }
  }, [])

  const handleTabChange = (tab: AccountHistoryTab) => {
    accountHistoryActiveTabVar(tab)
  }

  return (
    <Flex
      align={'center'}
      gap={'2'}
    >
      <Button
        className={cn(styles.accountTabSwitcher, {
          [styles.accountTabSwitcherActive]:
            accountHistoryActiveTab === AccountHistoryTab.DEPOSIT
        })}
        onClick={() => {
          handleTabChange(AccountHistoryTab.DEPOSIT)
          navigate(RouterPathes.historyDeposit)
        }}
      >
        Deposit
      </Button>

      <Button
        className={cn(styles.accountTabSwitcher, {
          [styles.accountTabSwitcherActive]:
            accountHistoryActiveTab === AccountHistoryTab.WITHDRAW
        })}
        onClick={() => {
          handleTabChange(AccountHistoryTab.WITHDRAW)
          navigate(RouterPathes.historyWithdraw)
        }}
      >
        Withdraw
      </Button>

      {/* TODO: Enable game events button once API will be done */}
      {/* <Button
        className={cn(styles.accountTabSwitcher, {
          [styles.accountTabSwitcherActive]:
            accountHistoryActiveTab === AccountHistoryTab.GAME_EVENTS
        })}
        onClick={() => handleTabChange(AccountHistoryTab.GAME_EVENTS)}
      >
        Game events
      </Button> */}
    </Flex>
  )
}
