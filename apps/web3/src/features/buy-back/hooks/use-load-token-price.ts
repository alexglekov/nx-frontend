import { useState } from 'react'
import { useUniswapPool } from 'contracts/uniswap-pool/use-uniswap-pool'
import { xyroTokenPriceVar } from '../store/token-price'

export const useLoadTokenPrice = () => {
  const [loading, setLoading] = useState(true)
  const { getTokenPrice } = useUniswapPool()

  const loadTokenPrice = async () => {
    setLoading(true)
    try {
      const price = await getTokenPrice()

      xyroTokenPriceVar(price)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return { loading, loadTokenPrice }
}
