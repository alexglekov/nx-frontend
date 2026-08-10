import { useQuery } from '@apollo/client'
import { InitializeGameSessionQuery } from '__generated__/graphql'
import { GET_GAME_URL } from 'api/games/get-game-url'
import { RouterPathes } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'

export const useGetGameUrl = (gameId?: string, provider?: string) => {
  const [isMobile] = useResponsive(['xs', 'sm'])
  const { data, loading } = useQuery<InitializeGameSessionQuery>(GET_GAME_URL, {
    skip: !gameId || !provider,
    variables: {
      payload: {
        country: 'PL',
        provider: provider,
        game: gameId,
        currency: 'USD',
        device: isMobile ? 'mobile' : 'desktop',
        lang: 'en',
        return_url: `${window.location.origin}${RouterPathes.games}`,
        deposit_url: `${window.location.origin}${RouterPathes.accountMyAccount}`
      }
    },
    fetchPolicy: 'no-cache'
  })

  return { gameUrl: data?.initializeGameSession, loading }
}
