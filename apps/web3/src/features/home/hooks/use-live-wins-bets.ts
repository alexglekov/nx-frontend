import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Predict } from '__generated__/graphql'
import { GET_LIVE_WINS } from 'api/home/get-live-wins'
import { MS_IN_SEC } from 'shared/constants'

export const useLiveWinsBets = () => {
  const [liveWins, setLiveWins] = useState<Predict[]>([])

  const { data: queryData, loading, refetch } = useQuery(GET_LIVE_WINS)

  // NOTE: Disabled as we have race condition
  // TODO: Enable when we'll have resourses to polish subscription solution
  // const { data: subscribeData } = useSubscription(SUBSCRIBE_LIVE_WINS)

  useEffect(() => {
    const queryPredicts = queryData?.getLiveWinsPredicts?.predicts

    if (!queryPredicts) return

    setLiveWins(queryPredicts as Predict[])
  }, [queryData])

  // NOTE: Disabled as we have race condition
  // TODO: Enable when we'll have resourses to polish subscription solution
  // useEffect(() => {
  //   const subscribePredict = subscribeData?.liveWinsPredicts

  //   if (!subscribePredict) return

  //   setLiveWins(prevLiveWins => {
  //     const newLiveWins = [subscribePredict, ...prevLiveWins].slice(0, 9)
  //     return newLiveWins as Predict[]
  //   })
  // }, [subscribeData?.liveWinsPredicts])

  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 10 * MS_IN_SEC)

    return () => clearInterval(interval)
  }, [refetch])

  return {
    bets: liveWins,
    loading: loading
  }
}
