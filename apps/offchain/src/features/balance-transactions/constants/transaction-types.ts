import { BalanceOperationType } from '__generated__/graphql'

// TODO: DEPRECATED, to remove
export const TransactionTypeMap = {
  [BalanceOperationType.Bonus]: 'Bonus',
  [BalanceOperationType.BonusRemoved]: 'Bonus Removed',
  [BalanceOperationType.GameResolve]: 'Game Resolve',
  [BalanceOperationType.Hold]: 'Hold',
  [BalanceOperationType.HourlyFee]: 'Hourly fee',
  [BalanceOperationType.NetworkFee]: 'Network fee',
  [BalanceOperationType.NotDefined]: 'Not defined',
  [BalanceOperationType.Unhold]: 'Unhold',
  [BalanceOperationType.UserAddBet]: 'Bet add',
  [BalanceOperationType.UserDeposit]: 'Deposit',
  [BalanceOperationType.UserLose]: 'Lose',
  [BalanceOperationType.UserRejectedBet]: 'Bet reject',
  [BalanceOperationType.UserWithdraw]: 'Withdraw',
  [BalanceOperationType.UserWon]: 'Won'
}
