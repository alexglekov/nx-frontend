import { ResultSwapForm } from '../types'

export const getNetworkFee = (data: ResultSwapForm, isSell: boolean) =>
  isSell ?
    (Number(data.Sell) * 0.003).toFixed(3)
  : (Number(data.Buy) * 0.003).toFixed(3)
