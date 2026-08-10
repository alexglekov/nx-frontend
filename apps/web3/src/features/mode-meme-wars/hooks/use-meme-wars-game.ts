import { useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { RaceGame } from '__generated__/graphql'
import { GET_CURRENT_MEME_WARS_GAME } from 'api/meme-wars/get-current-meme-wars-game'
import { SUBSCRIBE_CURRENT_MEME_WARS_GAME } from 'api/meme-wars/subscribe-current-meme-wars-game'
import { useNotifyHighGasFee } from 'shared/hooks/use-notify-high-gas-fee'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { zeroAddress } from 'viem'
import { memeWarsGameVar } from '../store/meme-wars-game.store'

// eslint-disable-next-line max-statements
export const useMemeWarsGame = () => {
  const { smartContractAddress } = useGetSmartContract('Race')

  const isSmartContractInvalid =
    !smartContractAddress || smartContractAddress === zeroAddress

  const {
    data: raceGameQuery,
    loading: raceGameQueyLoading,
    error: raceGameQueryError
  } = useQuery(GET_CURRENT_MEME_WARS_GAME, {
    variables: {
      data: {
        contractAddress: smartContractAddress
      }
    },
    skip: isSmartContractInvalid
  })

  const { data: raceGameSubscription, loading: raceGameSubscriptionLoading } =
    useSubscription(SUBSCRIBE_CURRENT_MEME_WARS_GAME, {
      variables: {
        contractAddress: smartContractAddress
      },
      skip: isSmartContractInvalid
    })

  useNotifyHighGasFee(raceGameQueryError || null)

  const raceGameQueryData = raceGameQuery?.getCurrentRaceGame || null
  const raceGameSubscriptionData = raceGameSubscription?.raceGameChanged || null

  useEffect(() => {
    if (!raceGameQueryData) return

    memeWarsGameVar(raceGameQueryData as RaceGame)
  }, [raceGameQueryData])

  useEffect(() => {
    if (!raceGameSubscriptionData) return

    memeWarsGameVar(raceGameSubscriptionData as RaceGame)
  }, [raceGameSubscriptionData])

  const loading = raceGameQueyLoading || raceGameSubscriptionLoading

  return {
    loading
  }
}
