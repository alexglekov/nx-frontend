import { useMemo } from 'react'
import { useReactiveVar } from '@apollo/client'
import { balanceVar } from 'shared/store/balance-store'
import {
  activeBalanceClaimSwitchTypeVar,
  activeBalanceSwitchTypeVar
} from '../store/switch-types'
import { ClaimBalanceSwitchTypes } from '../types'
import { getFormattedBalances } from '../utils/get-formatted-balances'

export const useApprovedBalanceField = () => {
  const activeType = useReactiveVar(activeBalanceClaimSwitchTypeVar)
  const activeBalanceType = useReactiveVar(activeBalanceSwitchTypeVar)

  const isApprove = activeType === ClaimBalanceSwitchTypes.Approve

  const onlyInteger = activeType === ClaimBalanceSwitchTypes.Claim

  const balance = useReactiveVar(balanceVar)

  const { formattedAllowance, formattedBalance, formattedTreasury } =
    getFormattedBalances(activeBalanceType, balance)

  const maxAmount = useMemo(() => {
    if (activeType === ClaimBalanceSwitchTypes.Deposit) {
      return formattedAllowance
    }

    if (activeType === ClaimBalanceSwitchTypes.Claim) {
      return Math.floor(formattedTreasury)
    }

    return formattedBalance
  }, [activeType, formattedBalance, formattedTreasury, formattedAllowance])

  return { maxAmount, isApprove, onlyInteger }
}
