import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useBalance } from 'shared/hooks/use-balance'
import { BalanceTransactionsDialogDeposit } from './balance-transactions-dialogs/balance-transactions-dialog-deposit'
import { BalanceTransactionsDialogWithdraw } from './balance-transactions-dialogs/balance-transactions-dialog-withdraw'
import styles from '../balance-transactions.module.scss'
import { BalanceTransactionsBonusAlert } from './balance-transactions-dialogs/balance-transactions-bonus-alert'

export const BalanceTransactionsCTATabButtons: React.FC = () => {
  const { formattedBalance, loading } = useBalance()

  const formattedBalanceText = loading ? 'Loading...' : formattedBalance

  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'5rem'}
      className={styles.ctaTabButtonsWrapper}
    >
      <Flex
        direction={'column'}
        gap={'2'}
      >
        <Text
          className='color-gray-light'
          size={'3'}
          weight={'medium'}
        >
          Balance
        </Text>

        <Text
          className='color-white'
          weight={'bold'}
          size='8'
        >
          {formattedBalanceText}
        </Text>
      </Flex>

      <Flex
        align={'center'}
        gap={'3'}
      >
        <BalanceTransactionsDialogDeposit />

        <BalanceTransactionsDialogWithdraw
          dialogTrigger={
            <Button className={styles.withdrawCTAButton}>
              <Text
                size={'2'}
                weight={'bold'}
                className='color-white'
              >
                WITHDRAWAL
              </Text>
            </Button>
          }
        />
      </Flex>
    </Flex>
  )
}
