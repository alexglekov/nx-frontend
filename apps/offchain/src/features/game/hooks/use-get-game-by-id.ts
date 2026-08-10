import { useQuery } from '@apollo/client'
import { GetProviderGameByIdQuery } from '__generated__/graphql'
import { GET_PROVIDER_GAME_BY_ID } from 'api/games/get-provider-game-by-id'
import { currentActiveGameVar } from '../store'

export const useGetGameById = (gameId?: string) => {
  const { data, loading, refetch } = useQuery<GetProviderGameByIdQuery>(
    GET_PROVIDER_GAME_BY_ID,
    {
      skip: !gameId,
      variables: {
        gameId: gameId
      },
      fetchPolicy: 'no-cache'
    }
  )

  currentActiveGameVar(data?.getProviderGameById)

  return { game: data?.getProviderGameById, loading, refetch }
}
