import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { accountBonusActiveTabVar } from '../store'
import { AccountBonusTab } from '../types'
// TODO: Split styles file per feature
import styles from '../../account/account.module.scss'

export const AccountBonusTabSwitcher: React.FC = () => {
  const navigate = useNavigate()
  const currentLocation = window.location.pathname
  const accountBonusActiveTab = useReactiveVar(accountBonusActiveTabVar)

  useEffect(() => {
    if (currentLocation === RouterPathes.bonusAccountBonus) {
      handleTabChange(AccountBonusTab.ACCOUNT_BONUSES)
    }

    if (currentLocation === RouterPathes.bonusWelcomePack) {
      handleTabChange(AccountBonusTab.WELCOME_PACK)
    }

    if (currentLocation === RouterPathes.bonusCashback) {
      handleTabChange(AccountBonusTab.CASHBACK)
    }
  }, [])

  const handleTabChange = (tab: AccountBonusTab) => {
    accountBonusActiveTabVar(tab)
  }

  return (
    <Flex
      align={'center'}
      gap={'2'}
    >
      <Button
        className={cn(styles.accountTabSwitcher, {
          [styles.accountTabSwitcherActive]:
            accountBonusActiveTab === AccountBonusTab.ACCOUNT_BONUSES
        })}
        onClick={() => {
          handleTabChange(AccountBonusTab.ACCOUNT_BONUSES)
          navigate(RouterPathes.bonusAccountBonus)
        }}
      >
        Account bonuses
      </Button>

      <Button
        className={cn(styles.accountTabSwitcher, {
          [styles.accountTabSwitcherActive]:
            accountBonusActiveTab === AccountBonusTab.WELCOME_PACK
        })}
        onClick={() => {
          handleTabChange(AccountBonusTab.WELCOME_PACK)
          navigate(RouterPathes.bonusWelcomePack)
        }}
      >
        Welcome pack
      </Button>

      <Button
        className={cn(styles.accountTabSwitcher, {
          [styles.accountTabSwitcherActive]:
            accountBonusActiveTab === AccountBonusTab.CASHBACK
        })}
        onClick={() => {
          handleTabChange(AccountBonusTab.CASHBACK)
          navigate(RouterPathes.bonusCashback)
        }}
      >
        Cashback
      </Button>
    </Flex>
  )
}
