import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import {
  balanceBonusAlertDialogOpenVar,
  balanceWithdrawDialogOpenVar
} from 'features/balance-transactions/store/balance-transactions-dialogs.store'
import { useBalance } from 'shared/hooks/use-balance'
import { AlertBoxContainer } from 'shared/icons'
import { XyroDialog } from 'shared/ui'
import styles from '../../balance-transactions.module.scss'

export const BalanceTransactionsBonusAlert: React.FC = () => {
  const { formattedBonusBalance } = useBalance()

  const isDialogOpen = useReactiveVar(balanceBonusAlertDialogOpenVar)

  const handleDialogOpenClose = () => {
    balanceBonusAlertDialogOpenVar(!isDialogOpen)
  }

  const handleCloseDialog = () => {
    balanceBonusAlertDialogOpenVar(false)
  }

  const handleClickContinueButton = () => {
    balanceBonusAlertDialogOpenVar(false)
    balanceWithdrawDialogOpenVar(true)
  }

  return (
    <XyroDialog
      open={isDialogOpen}
      onOpenChange={handleDialogOpenClose}
      className={styles.bonusBalanceAlertDialog}
    >
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        gap={'5'}
        width={'100%'}
      >
        <AlertBoxContainer />

        <Flex
          align={'center'}
          justify={'center'}
          direction={'column'}
          gap={'3'}
          maxWidth={{ initial: '46rem', sm: '40rem' }}
        >
          <Text
            size={{ initial: '8', sm: '7' }}
            weight={'medium'}
            className='color-white'
          >
            Attention!
          </Text>

          <Text
            size={{ initial: '3', sm: '2' }}
            weight={'regular'}
            className='color-gray'
            align={'center'}
          >
            Withdrawing funds will permanently close and reset your bonus
            balance. Are you sure you want to proceed and lose your bonus?
          </Text>
        </Flex>

        <Flex
          align={'end'}
          gap={'2'}
        >
          <Text
            color='pink'
            size={{ initial: '3', sm: '2' }}
          >
            You will lose
          </Text>

          <Flex
            align={'center'}
            gap={'1'}
          >
            <Text
              size={'6'}
              className='color-white'
              weight={'medium'}
            >
              {formattedBonusBalance}
            </Text>
          </Flex>

          <Text
            color='pink'
            size={{ initial: '3', sm: '2' }}
          >
            from bonus account
          </Text>
        </Flex>

        <Flex
          direction={'column'}
          gap={'3'}
          width={'100%'}
          align={'center'}
          justify={'center'}
          mt={'4'}
        >
          <Button
            className={cn(
              styles.payWithWalletButton,
              styles.paymentConfirmationButtonFormer
            )}
            onClick={handleClickContinueButton}
          >
            <Text
              className='color-white'
              size={{ initial: '3', sm: '2' }}
              weight={'bold'}
            >
              YES, WITHDRAW
            </Text>
          </Button>

          <Button
            className={cn(
              styles.paymentConfirmationButtonFormer,
              styles.paymentButtonCancel
            )}
            onClick={handleCloseDialog}
          >
            <Text
              size={{ initial: '3', sm: '2' }}
              color='pink'
              weight={'bold'}
            >
              GO BACK
            </Text>
          </Button>
        </Flex>
      </Flex>
    </XyroDialog>
  )
}
