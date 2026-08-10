import { formatUnits } from 'viem'

export const formatWeb3Price = (price: bigint) =>
  Number(formatUnits(price, 18)) || 0
