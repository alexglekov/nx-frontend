import { useQuery } from '@apollo/client'
import { GetInitializedDemoGameUrlQuery } from '__generated__/graphql'
import { GET_GAME_DEMO_URL } from 'api/games/get-game-demo-url'

export const useGetGameDemoUrl = (gameId?: string) => {
  const { data, loading } = useQuery<GetInitializedDemoGameUrlQuery>(
    GET_GAME_DEMO_URL,
    {
      skip: !gameId,
      variables: {
        gameId: gameId
      },
      fetchPolicy: 'no-cache'
    }
  )

  return { gameUrl: data?.getInitializedDemoGameUrl, loading }
}
