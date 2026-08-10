import { FormEvent, useCallback, useMemo } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { getFormValues } from 'shared/utils/get-form-values'
import { activeBalanceClaimSwitchTypeVar } from '../store/switch-types'
import { ApporveBalanceFormValues, ClaimBalanceSwitchTypes } from '../types'
import { useApproveSubmit } from './use-approve-submit'
import { useClaimSubmit } from './use-claim-submit'
import { useDepositSubmit } from './use-deposit-submit'

export const useApproveBalanceFormSubmit = () => {
  const { smartContractVersion, smartContractAddress } =
    useGetSmartContract('Treasury')
  const { loading: loadingApproveSubmit, handleApprove } = useApproveSubmit()
  const { loading: loadingClaimSubmit, handleClaim } = useClaimSubmit(
    smartContractAddress,
    smartContractVersion
  )
  const { loading: loadingDepositSubmit, handleDeposit } = useDepositSubmit()

  const activeType = useReactiveVar(activeBalanceClaimSwitchTypeVar)

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const formValues = getFormValues<
        ApporveBalanceFormValues,
        ApporveBalanceFormValues
      >(event.target as HTMLFormElement)

      if (activeType === ClaimBalanceSwitchTypes.Deposit) {
        return handleDeposit(formValues.amount)
      }

      if (activeType === ClaimBalanceSwitchTypes.Approve) {
        return handleApprove(formValues.amount)
      }

      return handleClaim(formValues.amount)
    },
    [activeType, handleApprove, handleClaim, handleDeposit]
  )

  const loading = useMemo(() => {
    if (activeType === ClaimBalanceSwitchTypes.Deposit) {
      return loadingDepositSubmit
    }

    if (activeType === ClaimBalanceSwitchTypes.Approve) {
      return loadingApproveSubmit
    }

    return loadingClaimSubmit
  }, [
    activeType,
    loadingApproveSubmit,
    loadingClaimSubmit,
    loadingDepositSubmit
  ])

  return {
    loading,
    handleSubmit
  }
}
