import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Text } from '@radix-ui/themes'
import { BalanceTransactionsBonusAlert } from 'features/balance-transactions/components/balance-transactions-dialogs/balance-transactions-bonus-alert'
import { BalanceTransactionsDialogDeposit } from 'features/balance-transactions/components/balance-transactions-dialogs/balance-transactions-dialog-deposit'
import { useBalance } from 'shared/hooks/use-balance'
import { TetherRoundedIcon, XyroTokenRounded } from 'shared/icons'
import { balanceVar } from 'shared/store/balance-store'
import { formatToUSD, formatToXyro } from 'shared/utils/format-price'
import { BalanceTransactionsDialogWithdraw } from '../../../balance-transactions/components/balance-transactions-dialogs/balance-transactions-dialog-withdraw'
import { balanceDepositDialogOpenedVar } from '../../../balance-transactions/store/balance-transactions-dialogs.store'
import styles from '../../account.module.scss'

export const AccountBalance: React.FC = () => {
  const handleClickDeposit = () => {
    balanceDepositDialogOpenedVar(true)
  }

  return (
    <Flex
      className={styles.accountBalance}
      direction={'column'}
      gap={'3'}
    >
      <Text
        size={'5'}
        className={'color-white'}
      >
        Account balance
      </Text>

      <Flex
        className={styles.balanceCard}
        align={'center'}
        width={'100%'}
        gap={'5'}
        direction={{ initial: 'column', sm: 'row' }}
      >
        <Flex
          align={'center'}
          direction={'row'}
          justify={'between'}
          width={'100%'}
          gap={'2'}
        >
          <BalanceCard type={'usdt'} />
        </Flex>

        <Flex
          gap={'3'}
          direction={'column'}
          width={'100%'}
          align={'end'}
        >
          {/* <BalanceTransactionsDialogDeposit isButtonHidden /> */}

          {/* <Button
            className={styles.depositCTAButton}
            onClick={handleClickDeposit}
          >
            <Text
              size={'2'}
              weight={'bold'}
              className='color-white'
            >
              DEPOSIT
            </Text>
          </Button> */}

          <BalanceTransactionsDialogWithdraw
            dialogTrigger={
              <Button className={styles.withdrawCTAButton}>
                <Text
                  size={'2'}
                  weight={'bold'}
                  className='color-pink'
                >
                  WITHDRAW
                </Text>
              </Button>
            }
          />

          <BalanceTransactionsBonusAlert />
        </Flex>
      </Flex>
    </Flex>
  )
}

interface Props {
  type: 'usdt' | 'xyro'
}

const BalanceCard: React.FC<Props> = ({ type }) => {
  const { xyroBalance } = useReactiveVar(balanceVar)
  const { balance: usdtBalance } = useBalance()

  const title = type === 'usdt' ? 'USDT Balance' : 'XYRO Balance'
  const balance =
    type === 'usdt' ? formatToUSD(usdtBalance) : formatToXyro(xyroBalance)
  const icon =
    type === 'usdt' ?
      <TetherRoundedIcon
        color={'var(--lime)'}
        width={'5rem'}
        height={'5rem'}
      />
    : <XyroTokenRounded
        width={'5rem'}
        height={'5rem'}
      />

  return (
    <Flex
      direction={'column'}
      gap={'4'}
      width={'100%'}
    >
      <Flex
        direction={'column'}
        gap={'2'}
      >
        <Text
          size={'3'}
          className={'color-gray-light'}
        >
          {title}
        </Text>

        <Flex
          align={'center'}
          gap={'2'}
        >
          {icon}

          <Text
            size={'4'}
            className={'color-white'}
          >
            {balance}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
