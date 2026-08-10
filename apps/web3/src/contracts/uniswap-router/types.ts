import { Web3Adress } from 'shared/types'

export type GetRateProps = {
  amount: string
  tokens: [Web3Adress, Web3Adress]
}

export type SwapParams = {
  tokenIn: Web3Adress
  tokenOut: Web3Adress
  fee: number
  recipient: Web3Adress
  amountIn: bigint
  amountOutMinimum: bigint
  sqrtPriceLimitX96: bigint
}
