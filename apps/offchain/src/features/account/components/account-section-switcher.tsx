import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import {
  AccountProfileRounded,
  BonusIconRounded,
  DatePickerRounded,
  SettingsRounded
} from 'shared/icons'
import { accountActiveSectionVar } from '../store/account.store'
import { AccountSection } from '../types'
import styles from '../account.module.scss'

export const AccountSectionSwitcher: React.FC = () => {
  const navigate = useNavigate()
  const pathname = window.location.pathname
  const accountActiveSection = useReactiveVar(accountActiveSectionVar)

  const handleTabChange = (section: AccountSection) => {
    accountActiveSectionVar(section)
  }

  // eslint-disable-next-line complexity
  useEffect(() => {
    if (
      pathname === RouterPathes.accountMyAccount ||
      pathname === RouterPathes.accountBasicInformation ||
      pathname === RouterPathes.accountSocials
    ) {
      accountActiveSectionVar(AccountSection.ACCOUNT)
    }

    // if (
    //   pathname === RouterPathes.bonusAccountBonus ||
    //   pathname === RouterPathes.bonusCashback ||
    //   pathname === RouterPathes.bonusWelcomePack
    // ) {
    //   accountActiveSectionVar(AccountSection.MY_BONUS)
    // }

    // if (
    //   pathname === RouterPathes.historyDeposit ||
    //   pathname === RouterPathes.historyWithdraw
    // ) {
    //   accountActiveSectionVar(AccountSection.HISTORY)
    // }

    // if (
    //   pathname === RouterPathes.settingsPassword ||
    //   pathname === RouterPathes.settingsPassword
    // ) {
    //   accountActiveSectionVar(AccountSection.SETTINGS)
    // }
  }, [pathname])

  return (
    <Flex
      align={'center'}
      gap={'2'}
      className={styles.accountSectionSwitcher}
    >
      <Button
        className={cn(styles.accountSectionTab, {
          [styles.accountSectionTabActiveProfile]:
            accountActiveSection === AccountSection.ACCOUNT
        })}
        onClick={() => {
          handleTabChange(AccountSection.ACCOUNT)
          navigate(RouterPathes.accountMyAccount)
        }}
      >
        <AccountProfileRounded className={styles.tabImage} />

        <Text
          size={'3'}
          className={
            accountActiveSection === AccountSection.ACCOUNT ?
              'color-black'
            : 'color-white'
          }
          weight={'medium'}
        >
          Account
        </Text>
      </Button>

      {/* <Button
        className={cn(styles.accountSectionTab, {
          [styles.accountSectionTabActiveBonus]:
            accountActiveSection === AccountSection.MY_BONUS
        })}
        onClick={() => {
          handleTabChange(AccountSection.MY_BONUS)
          navigate(RouterPathes.bonusAccountBonus)
        }}
      >
        <BonusIconRounded className={styles.tabImage} />

        <Text
          size={'3'}
          className={
            accountActiveSection === AccountSection.MY_BONUS ?
              'color-black'
            : 'color-white'
          }
          weight={'medium'}
        >
          Bonus
        </Text>
      </Button>

      <Button
        className={cn(styles.accountSectionTab, {
          [styles.accountSectionTabActiveHistory]:
            accountActiveSection === AccountSection.HISTORY
        })}
        onClick={() => {
          handleTabChange(AccountSection.HISTORY)
          navigate(RouterPathes.historyDeposit)
        }}
      >
        <DatePickerRounded className={styles.tabImage} />

        <Text
          size={'3'}
          className={
            accountActiveSection === AccountSection.HISTORY ?
              'color-black'
            : 'color-white'
          }
          weight={'medium'}
        >
          History
        </Text>
      </Button>

      <Button
        className={cn(styles.accountSectionTab, {
          [styles.accountSectionTabActiveSettings]:
            accountActiveSection === AccountSection.SETTINGS
        })}
        onClick={() => {
          handleTabChange(AccountSection.SETTINGS)
          navigate(RouterPathes.settingsPreference)
        }}
      >
        <SettingsRounded className={styles.tabImage} />

        <Text
          size={'3'}
          className={
            accountActiveSection === AccountSection.SETTINGS ?
              'color-black'
            : 'color-white'
          }
          weight={'medium'}
        >
          Settings
        </Text>
      </Button> */}
    </Flex>
  )
  // eslint-disable-next-line max-lines
}
