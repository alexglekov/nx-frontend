import { useQuery } from '@apollo/client'
import { BuybackTx } from '__generated__/graphql'
import { GET_BUYBACK_TXS } from 'api/buyback/get-buyback-txs'
import { UTCTimestamp } from 'lightweight-charts'
import { formatTHX24H } from '../utils/formatTHX24H'

export const useGetBuybackTXS = (token: 'usdt' | 'xyro') => {
  const { data, loading } = useQuery(GET_BUYBACK_TXS)

  const buybackTXSData = data?.getBuybackTxs?.buybackTxs || []

  const formattedBuybackTXSData = formatTHX24H(buybackTXSData).sort(
    (a, b) => b.timestamp - a.timestamp
  ) as BuybackTx[]

  const formattedTimeValueMultichartData = formattedBuybackTXSData
    .map(b => {
      return {
        time: (b.timestamp / 1000) as UTCTimestamp,
        value: Number(b[token])
      }
    })
    .sort((a, b) => a.time - b.time)

  const total24BuyBacked = formattedBuybackTXSData.reduce(
    (sum, b) => (sum = b[token] + sum),
    0
  )

  return {
    formattedTimeValueMultichartData,
    total24BuyBacked,
    buybackTXS: buybackTXSData,
    loading
  }
}
