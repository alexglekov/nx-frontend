import { useMutation, useReactiveVar } from '@apollo/client'
import { MUTATION_ADD_GAME_TO_FAVORITES } from 'api/games/mutation-add-to-favorites'
import { MUTATION_REMOVE_GAME_FROM_FAVORITES } from 'api/games/mutation-remove-from-favorites'
import { notificationStateVar } from 'shared/store/notification'
import { currentActiveGameVar } from '../store'

interface Props {
  refetchGame: () => void
}

export const useFavoriteGame = ({ refetchGame }: Props) => {
  const game = useReactiveVar(currentActiveGameVar)

  const gameId = game?.id

  const [addGameToFavorites, { loading: isAddMutationLoading }] = useMutation(
    MUTATION_ADD_GAME_TO_FAVORITES
  )

  const [removeGameFromFavorites, { loading: isRemoveMutationLoading }] =
    useMutation(MUTATION_REMOVE_GAME_FROM_FAVORITES)

  const handleAddToFavorites = async () => {
    if (!gameId) {
      return
    }

    try {
      const { data } = await addGameToFavorites({
        variables: { gameId },
        onCompleted: () => refetchGame()
      })

      if (!data?.addToFavorites) {
        notificationStateVar({
          isOpen: true,
          type: 'error',
          title: 'Failed to add to favorites'
        })

        return
      }
    } catch {
      notificationStateVar({
        isOpen: true,
        type: 'error',
        title: 'Failed to add to favorites'
      })
    }
  }

  const handleRemoveFromFavorites = async () => {
    if (!gameId) {
      return
    }

    try {
      const { data } = await removeGameFromFavorites({
        variables: { gameId },
        onCompleted: () => refetchGame()
      })

      if (!data?.removeFromFavorites) {
        notificationStateVar({
          isOpen: true,
          type: 'error',
          title: 'Failed to remove from favorites'
        })

        return
      }
    } catch {
      notificationStateVar({
        isOpen: true,
        type: 'error',
        title: 'Failed to remove from favorites'
      })
    }
  }

  return {
    handleAddToFavorites,
    handleRemoveFromFavorites,
    loading: isAddMutationLoading || isRemoveMutationLoading
  }
}
