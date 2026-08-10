import { BuybackTx, RevenueTx } from '__generated__/graphql'

export const formatTHX24H = (transactions: BuybackTx[] | RevenueTx[]) => {
  const nowTimeStamp = Date.now()
  const last24HoursTimeStamp = nowTimeStamp - 1000 * 60 * 60 * 24

  const recentTimestamps = transactions.filter(
    t => t.timestamp >= last24HoursTimeStamp
  )

  return recentTimestamps
}
