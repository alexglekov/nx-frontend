import { useState } from 'react'
import { useXyroToken } from 'contracts/xyro-token/use-xyro-token'
import { tokenGasVar } from '../store/token-gas'

export const useLoadSwapGas = () => {
  const [loading, setLoading] = useState(true)
  const { estimateGas } = useXyroToken()

  const loadSwapGas = async () => {
    setLoading(true)
    try {
      const gas = await estimateGas()

      tokenGasVar(gas)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    loading,
    loadSwapGas
  }
}
