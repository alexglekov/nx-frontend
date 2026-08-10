import { useEffect, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { ProviderLiveWin } from '__generated__/graphql'
import { GET_RECENT_WINS } from 'api/home/get-recent-wins'
import { SUBSCRIBE_PROVIDER_LIVE_WINS } from 'api/home/subscribe-live-wins'

export const useLiveWinsBets = () => {
  const [liveWins, setLiveWins] = useState<ProviderLiveWin[]>([])

  const { data: queryData, loading } = useQuery(GET_RECENT_WINS)

  const { data: subscribeData } = useSubscription(SUBSCRIBE_PROVIDER_LIVE_WINS)

  useEffect(() => {
    const recentWins = queryData?.getRecentWins

    if (!recentWins) return

    setLiveWins(recentWins as ProviderLiveWin[])
  }, [queryData])

  useEffect(() => {
    const subscribeLiveWin =
      subscribeData?.onProviderLiveWins as ProviderLiveWin

    if (!subscribeLiveWin) return

    setLiveWins(prevLiveWins => {
      const newLiveWins = [...prevLiveWins.slice(0, 8), subscribeLiveWin]
      return newLiveWins as ProviderLiveWin[]
    })
  }, [subscribeData?.onProviderLiveWins])

  return {
    bets: liveWins,
    loading: loading,
    setBets: setLiveWins
  }
}
