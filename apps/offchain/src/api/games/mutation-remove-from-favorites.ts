import { gql } from '__generated__'

export const MUTATION_REMOVE_GAME_FROM_FAVORITES = gql(`
  mutation removeFromFavorites($gameId: String!) {
    removeFromFavorites(gameId: $gameId)
  }
`)
