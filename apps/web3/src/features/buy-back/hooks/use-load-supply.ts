import { useQuery } from '@apollo/client'
import { GetTokenTurnoverStateQuery } from '__generated__/graphql'
import { GET_TOKEN_TURNOVER_STATE } from 'api/buyback/get-token-turnover-state'

export const useLoadSupply = () => {
  const { data, loading } = useQuery<GetTokenTurnoverStateQuery>(
    GET_TOKEN_TURNOVER_STATE
  )

  const result = data?.getTokenTurnoverState ?? {
    totalSupply: 0,
    circulating: 0,
    circulatingPercentage: 0,
    burned: 0,
    percentageBurned: 0,
    locked: 0,
    lockedPercentage: 0
  }

  return { data: result, loading }
}
