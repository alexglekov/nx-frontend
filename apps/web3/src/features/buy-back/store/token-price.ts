import { makeVar } from '@apollo/client'

export const xyroTokenPriceVar = makeVar<{
  price: number
  sqrtPriceX96: bigint
}>({ price: 1, sqrtPriceX96: 96n })
