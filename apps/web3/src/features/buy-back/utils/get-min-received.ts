import { ResultSwapForm } from '../types'

export const getMinReceived = (
  data: ResultSwapForm,
  isSell: boolean,
  price: number
) =>
  isSell ?
    (Number(data.Sell) * 0.99 * price).toFixed(2)
  : ((Number(data.Sell) * 0.99) / price).toFixed(2)
