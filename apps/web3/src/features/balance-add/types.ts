export type CoinType = {
  id: number
  name: string
  rate: number
  minimumAmount: number
  depositFeePercent: number
  withdrawalFeePercent: number
}

export type WithdrawPercentageItem = {
  lable: string
  value: number
}
