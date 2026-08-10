import { useCallback, useMemo, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { balanceVar } from 'shared/store/balance-store'
import {
  activeBalanceClaimSwitchTypeVar,
  activeBalanceSwitchTypeVar
} from '../store/switch-types'
import { ApprovedBalanceSwitchTypes, ClaimBalanceSwitchTypes } from '../types'
import { getClaimButtonTitle } from '../utils/get-claim-button-title'
import { getDepositButtonTitle } from '../utils/get-deposit-button-title'
import { useApproveBalanceFormSubmit } from './use-approved-balance-form-submit'

export const useApprovedBalanceForm = () => {
  const [inputValue, setInputValue] = useState('')
  const [isDisabledButton, setButtonDisabled] = useState(true)
  const { handleSubmit, loading } = useApproveBalanceFormSubmit()

  const activeType = useReactiveVar(activeBalanceClaimSwitchTypeVar)
  const activeBalanceType = useReactiveVar(activeBalanceSwitchTypeVar)
  const balance = useReactiveVar(balanceVar)

  const handleChangeAmountValue = useCallback(
    (value: string) => {
      if (activeType === ClaimBalanceSwitchTypes.Deposit) {
        const balanceValue =
          activeBalanceType === ApprovedBalanceSwitchTypes.Tether ?
            balance.treasuryAllowance
          : balance.xyroAllowance

        setButtonDisabled(!value || Number(value) > balanceValue)

        return
      }

      if (activeType === ClaimBalanceSwitchTypes.Claim) {
        const treasuryBalance =
          activeBalanceType === ApprovedBalanceSwitchTypes.Tether ?
            balance.treasuryDeposit
          : balance.xyroDeposit

        setButtonDisabled(!value || Number(value) > treasuryBalance)

        return
      }

      setButtonDisabled(!value)
    },
    [setButtonDisabled, activeType, activeBalanceType, balance]
  )

  const buttonTitle = useMemo(() => {
    if (inputValue === '') {
      return 'ENTER AMOUNT'
    }

    if (activeType === ClaimBalanceSwitchTypes.Claim) {
      return getClaimButtonTitle(
        inputValue,
        activeBalanceType === ApprovedBalanceSwitchTypes.Tether ?
          balance.treasuryDeposit
        : balance.xyroDeposit
      )
    }

    if (activeType === ClaimBalanceSwitchTypes.Deposit) {
      return getDepositButtonTitle(
        inputValue,
        activeBalanceType === ApprovedBalanceSwitchTypes.Tether ?
          balance.treasuryAllowance
        : balance.xyroAllowance
      )
    }

    return 'APPROVE'
  }, [activeType, inputValue, activeBalanceType, balance])

  return {
    handleSubmit,
    loading,
    isDisabledButton,
    handleChangeAmountValue,
    buttonTitle,
    inputValue,
    setInputValue
  }
}
