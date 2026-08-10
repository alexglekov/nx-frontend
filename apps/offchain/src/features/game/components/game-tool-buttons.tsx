import { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { useResponsive } from 'shared/hooks/use-responsive'
import { useFavoriteGame } from '../hooks/use-favorite-game'
import { currentActiveGameVar } from '../store'
import { GameToolButton } from './tool-button'

interface Props {
  refetchGame: () => void
}

export const GameToolButtons = ({ refetchGame }: Props) => {
  const [isMobile] = useResponsive(['xs', 'sm'])

  const game = useReactiveVar(currentActiveGameVar)
  const isFavoriteGame = game?.isFavorite

  const { handleAddToFavorites, handleRemoveFromFavorites } = useFavoriteGame({
    refetchGame
  })

  const enableFullScreenMode = () => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      '#game_container iframe'
    )

    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen()
    }
  }

  const handleToggleFavoriteGame = useCallback(() => {
    if (isFavoriteGame) {
      return handleRemoveFromFavorites()
    } else {
      return handleAddToFavorites()
    }
  }, [isFavoriteGame, handleAddToFavorites, handleRemoveFromFavorites])

  return (
    <Flex
      align={'center'}
      gap={'2'}
    >
      {!isMobile && (
        <GameToolButton
          type={'fullscreen'}
          onClick={enableFullScreenMode}
        />
      )}

      <GameToolButton
        type={'favorite'}
        onClick={handleToggleFavoriteGame}
        isActive={isFavoriteGame}
      />

      <GameToolButton
        type={'promotion'}
        onClick={() => {
          /* TODO: Implement when promotions will be ready */
        }}
      />

      <GameToolButton
        type={'crown'}
        onClick={() => {
          /* TODO: Implement when promotions will be ready */
        }}
      />
    </Flex>
  )
}
