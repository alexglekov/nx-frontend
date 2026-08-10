/* eslint-disable max-statements, max-lines */
import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import { Button, Flex, Text } from '@radix-ui/themes'
import { isSignInDialogOpenVar } from 'features/auth/store/dialogs'
import { wizardModeVar } from 'features/auth/store/wizard.store'
import { WizardMode } from 'features/auth/types'
import { useAvailableAssets } from 'features/balance-transactions/hooks/use-available-assets'
import {
  operationAmountVar,
  selectedPaymentAssetVar
} from 'features/balance-transactions/store/balance-flow-values.store'
import { balanceDepositDialogOpenedVar } from 'features/balance-transactions/store/balance-transactions-dialogs.store'
import { roundToFixedFloat } from 'features/balance-transactions/utils/round-to-fixed-float'
import { Link } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { userVar } from 'shared/store/user'
import { ControllableAmountField } from 'shared/ui'
import { formatHugePrice } from 'shared/utils/format-huge-price'
import { DepositCardAssetSelect } from './deposit-card-asset-select'
import styles from '../home.module.scss'

export enum FieldNames {
  amount = 'amount'
}

export const DepositCard: React.FC = () => {
  const user = useReactiveVar(userVar)

  const { availableAssets } = useAvailableAssets()

  const [selectedPaymentAsset, setSelectedPaymentAsset] = useState('USDTT')
  const [depositAmount, setDepositAmount] = useState('')

  const selectedAssetEntity = availableAssets.find(
    a => a.name === selectedPaymentAsset
  )

  const finalAmountInAsset =
    Number(depositAmount || 0) / (selectedAssetEntity?.convertRate || 0)

  const formattedFinalAmount =
    (Number(finalAmountInAsset) > 1000000 ?
      formatHugePrice(Number(finalAmountInAsset))
    : finalAmountInAsset) || '0'

  const handleClickDeposit = () => {
    if (!user) {
      isSignInDialogOpenVar(true)
      wizardModeVar(WizardMode.signIn)

      return
    }

    balanceDepositDialogOpenedVar(true)
    operationAmountVar(depositAmount)
    selectedPaymentAssetVar(selectedPaymentAsset)
  }

  const finalAmountValue = `${roundToFixedFloat(Number(formattedFinalAmount))} ${selectedPaymentAsset}`

  return (
    <Flex
      py={'5'}
      px={'6'}
      gap={'3'}
      direction={'column'}
      className={styles.depositCard}
    >
      <Text
        size={'7'}
        className={'color-white'}
      >
        Deposit and play
      </Text>

      <Flex
        className={styles.depositForm}
        px={'3'}
        py={'2'}
        align={'center'}
        justify={'between'}
      >
        <RadixForm.Root name={'deposit'}>
          <ControllableAmountField
            value={depositAmount}
            mt={'1'}
            setValue={setDepositAmount}
            minAmount={1}
            name={FieldNames.amount}
            placeholder='Amount in USD'
            className={styles.depositAmountField}
          />
        </RadixForm.Root>

        <Flex
          width={'fit-content'}
          className={styles.depositCardAssetSelectWrapper}
        >
          <DepositCardAssetSelect
            selectedPaymentAsset={selectedPaymentAsset}
            setSelectedPaymentAsset={setSelectedPaymentAsset}
          />
        </Flex>
      </Flex>

      <Flex
        align={'center'}
        justify={'between'}
        px={'1'}
      >
        <Text className='color-white'>Final amount:</Text>

        <Text
          className='color-white'
          weight={'bold'}
        >
          {finalAmountValue}
        </Text>
      </Flex>

      <Link
        to={'#'}
        className={styles.goToGames}
      >
        <Button
          className={styles.goToGamesBtn}
          onClick={handleClickDeposit}
        >
          <Text
            size={'2'}
            className={'color-white'}
            weight={'bold'}
          >
            START PLAYING
          </Text>
        </Button>
      </Link>

      <Text className={'color-gray'}>
        By clicking you agree with our{' '}
        <Text
          as={'span'}
          className={'color-white'}
        >
          <Link
            className={styles.actionLink}
            to={RouterPathes.termsAndConditions}
          >
            Terms and Conditions
          </Link>
          ,{' '}
          <Link
            className={styles.actionLink}
            to={RouterPathes.privacyPolicy}
          >
            {' '}
            Privacy Policy
          </Link>
        </Text>{' '}
        and{' '}
        <Link
          className={styles.actionLink}
          to={RouterPathes.amlPolicy}
        >
          AML & KYC Policy
        </Link>
      </Text>
    </Flex>
  )
}
