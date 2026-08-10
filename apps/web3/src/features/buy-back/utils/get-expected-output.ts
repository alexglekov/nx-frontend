import { ResultSwapForm } from '../types'

export const getExpectedOutput = (
  data: ResultSwapForm,
  isSell: boolean,
  price: number
) =>
  isSell ?
    (Number(data.Sell) * price).toFixed(2)
  : (Number(data.Sell) / price).toFixed(2)
