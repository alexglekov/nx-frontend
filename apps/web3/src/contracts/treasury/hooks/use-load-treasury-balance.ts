import { useEffect, useState } from 'react'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { useTreasury } from './use-treasury'

export const useLoadTreasuryBalance = () => {
  const { smartContractAddress, smartContractVersion } =
    useGetSmartContract('Treasury')
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown | null>(null)

  const treasury = useTreasury(smartContractAddress, smartContractVersion)

  const loadBalance = async () => {
    if (!treasury) {
      setLoading(false)
      return
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const result = await treasury.loadTreasuryBalance()
      setLoading(false)
      setBalance(Number(result) / Math.pow(10, 18))
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBalance()
  }, [treasury])

  return {
    balance,
    error,
    loading
  }
}
