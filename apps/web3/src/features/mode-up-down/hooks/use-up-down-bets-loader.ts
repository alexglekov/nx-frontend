import { useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import {
  GetUserUpDownPredictsQuery,
  PredictStatus
} from '__generated__/graphql'
import { GET_USER_UP_DOWN_BETS } from 'api/mode-up-down/get-user-up-down-bets'
import { zeroAddress } from 'viem'
import { upDownCurrentContractVar } from '../store/up-down-contract-addresses.store'

const UP_DOWN_TABLE_BETS_TAKE = 5

export const useUpDownBetsLoader = () => {
  const [upDownTableBetsSkip, setUpDownTableBetsSkip] = useState(0)

  const currentUpDownSmartContract = useReactiveVar(upDownCurrentContractVar)

  const {
    data: betsData,
    loading,
    refetch
  } = useQuery<GetUserUpDownPredictsQuery>(GET_USER_UP_DOWN_BETS, {
    fetchPolicy: 'no-cache',
    variables: {
      data: {
        pagination: {
          skip: upDownTableBetsSkip,
          take: UP_DOWN_TABLE_BETS_TAKE
        },
        contractAddress:
          currentUpDownSmartContract?.contractAddress || zeroAddress
      }
    }
  })

  const totalPredictsAmount = betsData?.getUserUpDownPredicts?.total || 0

  const bets =
    betsData?.getUserUpDownPredicts?.predicts?.filter(
      el => el.status !== PredictStatus.Open
    ) || []

  return {
    bets,
    loading,
    refetch,
    totalPredictsAmount,
    UP_DOWN_TABLE_BETS_TAKE,
    upDownTableBetsSkip,
    setUpDownTableBetsSkip
  }
}
