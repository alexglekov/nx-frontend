import { useEffect, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { GET_PREVIOUS_DAY_VOLUME } from 'api/general/get-previous-day-volume'
import { SUBSCRIPTION_DAY_VOLUME_CHANGED } from 'api/general/subscribe-day-volume'
import { zeroAddress } from 'viem'
import { isNotNullOrUndef } from '../utils/is-not-null-or-undef'

export const useContractVolume = (contractAddress: string) => {
  const [gameModeVolume, setGameModeVolume] = useState<number>(0)

  const { data: queryData, loading: queryLoading } = useQuery(
    GET_PREVIOUS_DAY_VOLUME,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        contractAddress
      },
      skip: !contractAddress || contractAddress === zeroAddress
    }
  )

  const { data: subscribeData } = useSubscription(
    SUBSCRIPTION_DAY_VOLUME_CHANGED,
    {
      variables: {
        contractAddress
      },
      skip: !contractAddress || contractAddress === zeroAddress
    }
  )

  const gameModeVolumeQueryData =
    queryData?.getVolumeOfThePreviousDay?.volume || 0

  const gameModeVolumeSubscribeData =
    subscribeData?.onVolumeChanged?.volume || 0

  useEffect(() => {
    if (!isNotNullOrUndef(gameModeVolumeQueryData)) return

    setGameModeVolume(gameModeVolumeQueryData)
  }, [gameModeVolumeQueryData])

  useEffect(() => {
    if (!isNotNullOrUndef(gameModeVolumeSubscribeData)) return

    setGameModeVolume(gameModeVolumeSubscribeData)
  }, [gameModeVolumeSubscribeData])

  return {
    gameModeVolume,
    loading: queryLoading
  }
}
