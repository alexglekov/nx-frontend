import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import {
  operationAmountVar,
  requestedDepositAddressVar,
  selectedPaymentAssetVar
} from 'features/balance-transactions/store/balance-flow-values.store'
import {
  balanceBonusAlertDialogOpenVar,
  balanceWithdrawDialogOpenVar
} from 'features/balance-transactions/store/balance-transactions-dialogs.store'
import { BalanceOperationStatusType } from 'features/balance-transactions/types'
import { useBalance } from 'shared/hooks/use-balance'
import { XyroDialog } from 'shared/ui'
import { BalanceTransactionsStepper } from '../balance-transactions-stepper'
import { BalanceTransactionDialogAddressStep } from './balance-transaction-dialog-address-step'
import { BalanceTransactionsDialogAmountStep } from './balance-transactions-dialog-amount-step'
import { BalanceTransactionsDialogStatusStep } from './balance-transactions-dialog-status-step'
import styles from '../../balance-transactions.module.scss'

interface Props {
  dialogTrigger: React.ReactNode
}

export const BalanceTransactionsDialogWithdraw: React.FC<Props> = ({
  dialogTrigger
}) => {
  const { bonusBalance } = useBalance()

  const isDialogOpen = useReactiveVar(balanceWithdrawDialogOpenVar)

  const [withdrawDialogStep, setWithdrawDialogStep] =
    useState<BalanceOperationStatusType>('amount')

  const handleDialogOpenClose = (isOpen: boolean) => {
    if (isOpen && bonusBalance && bonusBalance > 0) {
      balanceBonusAlertDialogOpenVar(true)
      return
    }

    selectedPaymentAssetVar('')
    operationAmountVar('')
    requestedDepositAddressVar('')
    setWithdrawDialogStep('amount')

    balanceWithdrawDialogOpenVar(isOpen)
  }

  const isDialogHeaderDisplayed =
    withdrawDialogStep !== 'statusSuccess' &&
    withdrawDialogStep !== 'statusFail'

  const isStatusStepActive =
    withdrawDialogStep === 'statusSuccess' ||
    withdrawDialogStep === 'statusFail'

  return (
    <XyroDialog
      open={isDialogOpen}
      onOpenChange={handleDialogOpenClose}
      isScrollAreaDisabled
      className={cn(styles.transactionsDialogBase, {
        [styles.transactionsDialogSuccess]:
          withdrawDialogStep === 'statusSuccess'
      })}
      dialogTrigger={dialogTrigger}
    >
      <Flex
        direction={'column'}
        gap={'5'}
      >
        {isDialogHeaderDisplayed && (
          <>
            <Text
              align={'center'}
              weight={'bold'}
              className='color-white'
              size={'7'}
            >
              Withdraw
            </Text>

            <BalanceTransactionsStepper
              steps={['amount', 'payment', 'status']}
              activeStep={withdrawDialogStep}
            />
          </>
        )}

        {withdrawDialogStep === 'amount' && (
          <BalanceTransactionsDialogAmountStep
            setDialogStep={setWithdrawDialogStep}
          />
        )}

        {withdrawDialogStep === 'payment' && (
          <BalanceTransactionDialogAddressStep
            setDialogStep={setWithdrawDialogStep}
          />
        )}

        {isStatusStepActive && (
          <BalanceTransactionsDialogStatusStep status={withdrawDialogStep} />
        )}
      </Flex>
    </XyroDialog>
  )
}
