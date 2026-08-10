import { useReactiveVar } from '@apollo/client'
import { balanceVar } from 'shared/store/balance-store'
import { BALANCE_SWITCH_TYPES } from '../constants'
import { activeBalanceSwitchTypeVar } from '../store/switch-types'

export const useBalanceTypeSwitcher = () => {
  const balance = useReactiveVar(balanceVar)
  const activeType = useReactiveVar(activeBalanceSwitchTypeVar)

  const totalBalance = balance.usdtBalance + balance.treasuryDeposit
  const xyroTotalBalance = balance.xyroBalance + balance.xyroDeposit

  const balanceTuple = [totalBalance, xyroTotalBalance]

  const balanceSwitchTypes = BALANCE_SWITCH_TYPES.map((switchType, index) => ({
    ...switchType,
    balance: balanceTuple[index]
  }))

  return {
    activeType,
    setActiveType: activeBalanceSwitchTypeVar,
    balanceSwitchTypes
  }
}
