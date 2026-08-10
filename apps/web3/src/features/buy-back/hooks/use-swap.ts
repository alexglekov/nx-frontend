import { useState } from 'react'
import { wagmiConfig } from 'app/wagmi-config'
import { useUniswapRouter } from 'contracts/uniswap-router/use-uniswap-router'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { parseUnits } from 'viem'
import { useAccount } from 'wagmi'

type UseSwapSwapProps = {
  amount: string
  price: string
  sqrtPriceX96: bigint
  isSell: boolean
}

export const useSwap = () => {
  const [loading, setLoading] = useState(false)
  const router = useUniswapRouter()
  const { smartContractAddress: xyroTokenSmartContract } =
    useGetSmartContract('XyroToken')
  const { smartContractAddress: usdtSmartContract } =
    useGetSmartContract('USDC')

  const account = useAccount({ config: wagmiConfig })

  const swap = async ({ amount, price, isSell }: UseSwapSwapProps) => {
    if (!router || !account.address) return

    setLoading(true)

    const { makeSwap } = router

    const tx = await makeSwap({
      tokenIn: isSell ? usdtSmartContract : xyroTokenSmartContract,
      tokenOut: isSell ? xyroTokenSmartContract : usdtSmartContract,
      fee: 3000,
      recipient: account.address,
      amountIn: parseUnits(amount, isSell ? 6 : 18),
      sqrtPriceLimitX96: 0n,
      amountOutMinimum: 0n
    })

    setLoading(false)

    return tx
  }

  return { swap, loading }
}
