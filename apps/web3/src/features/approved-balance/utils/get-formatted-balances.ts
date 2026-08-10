import { UserBlockchainBalance } from '__generated__/graphql'
import { ApprovedBalanceSwitchTypes } from '../types'

export const getFormattedBalances = (
  activeBalanceType: ApprovedBalanceSwitchTypes,
  balance: UserBlockchainBalance
) => {
  const formattedBalance =
    activeBalanceType === ApprovedBalanceSwitchTypes.Tether ?
      Number(balance.usdtBalance.toFixed(2))
    : Number(balance.xyroBalance.toFixed(2))

  const formattedTreasury =
    activeBalanceType === ApprovedBalanceSwitchTypes.Tether ?
      Number(balance.treasuryDeposit.toFixed(2))
    : Number(balance.xyroDeposit.toFixed(2))

  const formattedAllowance =
    activeBalanceType === ApprovedBalanceSwitchTypes.Tether ?
      Number(balance.treasuryAllowance.toFixed(2))
    : Number(balance.xyroAllowance.toFixed(2))

  return { formattedBalance, formattedAllowance, formattedTreasury }
}
