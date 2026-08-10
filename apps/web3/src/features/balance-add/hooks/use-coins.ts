import { useQuery } from '@apollo/client'
import { GET_COINS_LIST } from 'api/payments/list-coins'
import { GET_COINS_RATES } from 'api/payments/list-rates'
import { useEffect, useState } from 'react'
import { notificationStateVar } from 'shared/store/notification'
import { CoinListQuery, CoinRatesQuery } from '__generated__/graphql'
import { CoinType } from '../types'
import { transformCoinAndRates } from '../utils/transform-coin-rates'

export function useCoins() {
  const [coins, setCoins] = useState<CoinType[]>([])
  const {
    data: coinList,
    error: errorCoins,
    loading: loadingCoins
  } = useQuery<CoinListQuery>(GET_COINS_LIST, {
    onError: () => {
      notificationStateVar({
        isOpen: true,
        title: 'Error',
        description: 'Failed to load assets',
        type: 'error'
      })
    }
  })

  const {
    data: coinRates,
    error: errorRates,
    loading: loadingRates
  } = useQuery<CoinRatesQuery>(GET_COINS_RATES, {
    onError: () => {
      notificationStateVar({
        isOpen: true,
        title: 'Error',
        description: 'Failed to load assets',
        type: 'error'
      })
    }
  })

  useEffect(() => {
    if (!coinList?.coinList || !coinRates?.coinRates) return
    const assets = coinList?.coinList || []
    const rates = coinRates?.coinRates || []

    const coinsRow: CoinType[] = transformCoinAndRates(assets, rates)

    setCoins(coinsRow)
  }, [coinList, coinRates])

  return {
    coins,
    error: Boolean(errorCoins && errorRates) || false,
    loading: loadingCoins && loadingRates
  }
}
