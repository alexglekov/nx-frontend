import { gql } from '__generated__'

export const MUTATION_ADD_GAME_TO_FAVORITES = gql(`
  mutation addToFavorites($gameId: String!) {
    addToFavorites(gameId: $gameId)
  }
`)
