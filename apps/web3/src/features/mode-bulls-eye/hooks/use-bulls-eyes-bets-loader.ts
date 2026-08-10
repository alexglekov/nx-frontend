import { useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { GetUserBullseyePredictsQuery } from '__generated__/graphql'
import { GET_USER_BULLS_EYE_BETS } from 'api/mode-bulls-eye/get-user-bulls-eye-bets'
import { zeroAddress } from 'viem'
import { BULLS_EYE_TABLE_BETS_TAKE } from '../constants'
import { bullsEyeCurrentContractAddressVar } from '../store/bulls-eye-contract-addresses.store'

export const useBullsEyeBetsLoader = () => {
  const [bullsEyeTableBetsSkip, setBullsEyeTableBetsSkip] = useState(0)

  const currentBullsEyeSmartContract = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )

  const {
    data: betsData,
    loading,
    refetch
  } = useQuery<GetUserBullseyePredictsQuery>(GET_USER_BULLS_EYE_BETS, {
    variables: {
      data: {
        pagination: {
          skip: bullsEyeTableBetsSkip,
          take: BULLS_EYE_TABLE_BETS_TAKE
        },
        contractAddress:
          currentBullsEyeSmartContract?.contractAddress || zeroAddress
      }
    }
  })

  const totalPredictsAmount = betsData?.getUserBullseyePredicts?.total || 0

  const bets = betsData?.getUserBullseyePredicts?.predicts

  return {
    bets,
    loading,
    refetch,
    totalPredictsAmount,
    bullsEyeTableBetsSkip,
    setBullsEyeTableBetsSkip
  }
}
