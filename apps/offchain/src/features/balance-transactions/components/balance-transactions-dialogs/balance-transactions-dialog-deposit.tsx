import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import {
  operationAmountVar,
  requestedDepositAddressVar,
  selectedPaymentAssetVar
} from 'features/balance-transactions/store/balance-flow-values.store'
import { balanceDepositDialogOpenedVar } from 'features/balance-transactions/store/balance-transactions-dialogs.store'
import { BalanceOperationStatusType } from 'features/balance-transactions/types'
import { BoldPlusIcon } from 'shared/icons'
import { XyroButton, XyroDialog } from 'shared/ui'
import { BalanceTransactionsStepper } from '../balance-transactions-stepper'
import { BalanceTransactionsDialogAmountStep } from './balance-transactions-dialog-amount-step'
import { BalanceTransactionsDialogPaymentStep } from './balance-transactions-dialog-payment-step'
import { BalanceTransactionsDialogStatusStep } from './balance-transactions-dialog-status-step'
import styles from '../../balance-transactions.module.scss'

interface Props {
  isHeaderPlacement?: boolean
  isButtonHidden?: boolean
}
export const BalanceTransactionsDialogDeposit: React.FC<Props> = ({
  isHeaderPlacement = false,
  isButtonHidden = false
}) => {
  const [depositDialogStep, setDepositDialogStep] =
    useState<BalanceOperationStatusType>('amount')

  const isBalanceTransactionsDialogOpened = useReactiveVar(
    balanceDepositDialogOpenedVar
  )

  const handleDialogOpenClose = (isOpen: boolean) => {
    selectedPaymentAssetVar('')
    operationAmountVar('')
    requestedDepositAddressVar('')
    setDepositDialogStep('amount')

    balanceDepositDialogOpenedVar(isOpen)
  }

  const isDialogHeaderDisplayed =
    depositDialogStep !== 'statusSuccess' && depositDialogStep !== 'statusFail'

  const isStatusStepActive =
    depositDialogStep === 'statusSuccess' || depositDialogStep === 'statusFail'

  return (
    <XyroDialog
      className={cn(styles.transactionsDialogBase, {
        [styles.transactionsDialogSuccess]:
          depositDialogStep === 'statusSuccess'
      })}
      open={isBalanceTransactionsDialogOpened}
      onOpenChange={handleDialogOpenClose}
      isScrollAreaDisabled
      dialogTrigger={
        isHeaderPlacement ?
          <XyroButton
            className={styles.balanceAddButton}
            shape='cutted-both'
            color='green'
            isIconOnly
          >
            <BoldPlusIcon
              color='var(--black)'
              width={'100%'}
              height={'100%'}
            />
          </XyroButton>
        : isButtonHidden ?
          null
        : <Button className={styles.depositCTAButton}>
            <Text
              size={'2'}
              weight={'bold'}
              className='color-white'
            >
              DEPOSIT
            </Text>
          </Button>

      }
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
              Deposit
            </Text>

            <BalanceTransactionsStepper
              steps={['amount', 'payment', 'status']}
              activeStep={depositDialogStep}
            />
          </>
        )}

        {depositDialogStep === 'amount' && (
          <BalanceTransactionsDialogAmountStep
            setDialogStep={setDepositDialogStep}
            isDeposit
          />
        )}

        {depositDialogStep === 'payment' && (
          <BalanceTransactionsDialogPaymentStep
            setDialogStep={setDepositDialogStep}
          />
        )}

        {isStatusStepActive && (
          <BalanceTransactionsDialogStatusStep status={depositDialogStep} />
        )}
      </Flex>
    </XyroDialog>
  )
}
