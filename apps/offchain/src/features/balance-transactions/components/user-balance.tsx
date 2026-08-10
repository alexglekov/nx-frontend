/* eslint-disable complexity */
import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { accountActiveTabVar } from 'features/account/store/account-profile.store'
import { accountActiveSectionVar } from 'features/account/store/account.store'
import { AccountSection, AccountTab } from 'features/account/types'
import { useNavigate } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { useBalance } from 'shared/hooks/use-balance'
import { userVar } from 'shared/store/user'
import { formatBalance } from 'shared/utils/format-balance'
import { formatHugePrice } from 'shared/utils/format-huge-price'
import { useAvailableAssets } from '../hooks/use-available-assets'
import { shouldShowHeaderBalanceVar } from '../store/should-show-header-balance-var'
import { BalanceTransactionsDialogDeposit } from './balance-transactions-dialogs/balance-transactions-dialog-deposit'
import styles from '../balance-transactions.module.scss'

// eslint-disable-next-line max-statements
export const UserBalance: FC = () => {
  const user = useReactiveVar(userVar)
  const shouldShowHeaderBalance = useReactiveVar(shouldShowHeaderBalanceVar)

  const accountActiveTab = useReactiveVar(accountActiveSectionVar)
  const accountProfileActiveTab = useReactiveVar(accountActiveTabVar)

  const { balance, loading, bonusBalance } = useBalance()

  useAvailableAssets()

  const navigate = useNavigate()

  const formattedBalance =
    balance > 10000 ? formatHugePrice(balance) : formatBalance(balance)
  const formattedBonusBalance =
    balance > 10000 ?
      formatHugePrice(bonusBalance)
    : formatBalance(bonusBalance)

  const formattedBalanceString = `${formattedBalance} USD`
  const formattedBonusBalanceString = `${formattedBonusBalance} USD`

  const handleClickBalanceContainer = () => {
    navigate(RouterPathes.historyDeposit)
  }

  const isHeaderDepositHidden =
    window.location.pathname === RouterPathes.accountMyAccount &&
    accountActiveTab === AccountSection.ACCOUNT &&
    accountProfileActiveTab === AccountTab.MY_ACCOUNT

  if (!user) return null

  const userBalance = loading ? 'Loading...' : formattedBalanceString
  const userBonusBalance = loading ? 'Loading...' : formattedBonusBalanceString
  const balanceToShow = shouldShowHeaderBalance ? userBalance : '(in game)'
  const bonusBalanceToShow =
    shouldShowHeaderBalance ? userBonusBalance : '(in game)'

  return (
    <Flex
      align={'center'}
      gap={{ initial: '2', xs: '1' }}
      direction={'row'}
    >
      {!isHeaderDepositHidden && (
        <BalanceTransactionsDialogDeposit isHeaderPlacement />
      )}

      <Flex
        direction={'column'}
        onClick={handleClickBalanceContainer}
        className={styles.balanceContainer}
      >
        <Text
          className='color-white'
          size={'1'}
          weight={'medium'}
        >
          Balance:
        </Text>

        <Text
          className='color-white'
          size={'1'}
          weight={'medium'}
        >
          {balanceToShow}
        </Text>
      </Flex>

      {Boolean(bonusBalance) && (
        <Flex
          direction={'column'}
          onClick={handleClickBalanceContainer}
          className={styles.balanceContainer}
        >
          <Text
            className='color-white'
            size={'1'}
            weight={'medium'}
          >
            Bonus balance:
          </Text>

          <Text
            className='color-white'
            size={'1'}
            weight={'medium'}
          >
            {bonusBalanceToShow}
          </Text>
        </Flex>
      )}
    </Flex>
  )
}
