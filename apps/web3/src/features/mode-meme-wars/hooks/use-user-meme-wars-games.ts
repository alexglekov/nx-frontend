import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER_MEME_WARS_GAMES } from 'api/meme-wars/get-user-race-games'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { zeroAddress } from 'viem'

const MEME_WARS_TABLE_BETS_TAKE = 5

export const useUserMemeWarsGames = () => {
  const [memeWarsTableBetsSkip, setMemeWarsTableBetsSkip] = useState(0)

  const { smartContractAddress } = useGetSmartContract('Race')

  const { data, loading, refetch } = useQuery(GET_USER_MEME_WARS_GAMES, {
    variables: {
      data: {
        contractAddress: smartContractAddress,
        pagination: {
          take: MEME_WARS_TABLE_BETS_TAKE,
          skip: memeWarsTableBetsSkip
        }
      }
    },
    skip: !smartContractAddress || smartContractAddress === zeroAddress
  })

  const totalPredictsAmount = data?.getUserRaceGames?.total || 0

  const userMemeWarsGames = data?.getUserRaceGames?.games || []

  return {
    userMemeWarsGames,
    loading,
    refetch,
    totalPredictsAmount,
    memeWarsTableBetsSkip,
    setMemeWarsTableBetsSkip,
    MEME_WARS_TABLE_BETS_TAKE
  }
}
