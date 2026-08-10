import { makeVar } from '@apollo/client'
import { ApprovedBalanceSwitchTypes, ClaimBalanceSwitchTypes } from '../types'

export const activeBalanceClaimSwitchTypeVar = makeVar<ClaimBalanceSwitchTypes>(
  ClaimBalanceSwitchTypes.Deposit
)

export const activeBalanceSwitchTypeVar = makeVar(
  ApprovedBalanceSwitchTypes.Tether
)
