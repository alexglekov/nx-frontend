import { wagmiConfig } from 'app/wagmi-config'
import { useAccount } from 'wagmi'
import { swap } from './calls'
import { SwapParams } from './types'

export const useUniswapRouter = () => {
  const account = useAccount({ config: wagmiConfig })

  if (!account.address) return

  const makeSwap = (params: SwapParams) => swap(params)

  return { makeSwap }
}
