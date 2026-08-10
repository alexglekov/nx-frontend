import { useQuery } from '@apollo/client'
import { QUERY_GET_ASSETS_COINS_PAID } from 'api/balance/query-get-assets-coins-paid'

export const useAvailableAssets = () => {
  const { data, loading } = useQuery(QUERY_GET_ASSETS_COINS_PAID)

  const availableAssets = data?.assetsCoinsPaid || []

  return {
    availableAssets,
    loading
  }
}
