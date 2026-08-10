import { useQuery } from '@apollo/client'
import { RevenueTx } from '__generated__/graphql'
import { GET_REVENUE_TXS } from 'api/buyback/get-revenue-txs'
import { UTCTimestamp } from 'lightweight-charts'
import { formatTHX24H } from '../utils/formatTHX24H'

export const useGetRevenueTXS = () => {
  const { data, loading } = useQuery(GET_REVENUE_TXS)

  const revenueTXSData = data?.getRevenueTxs.revenueTxs || []

  const formattedRevenueTXSData = formatTHX24H(revenueTXSData) as RevenueTx[]

  const formattedTimeValueMultichartData = formattedRevenueTXSData
    .map(b => {
      return {
        time: (b.timestamp / 1000) as UTCTimestamp,
        value: Number(b.amount)
      }
    })
    .sort((a, b) => a.time - b.time)

  const total24XYRORevenue = formattedRevenueTXSData.reduce(
    (sum, b) => (sum = b.amount + sum),
    0
  )

  return {
    formattedTimeValueMultichartData,
    total24XYRORevenue,
    revenueTXS: revenueTXSData,
    loading
  }
}
