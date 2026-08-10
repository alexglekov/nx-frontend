import { gql } from '__generated__'

export const GET_PROVIDER_GAME_BY_ID = gql(`
  query getProviderGameById($gameId: String!) {
    getProviderGameById(gameId: $gameId) {
      id
      provider
      name
      enabled
      gameUuid
      thumb
      background
      levels
      cashBetRatio
      winRatio
      freespins
      isNew
      hasMobile
      hasDesktop
      category
      payouts
      lines
      blockedCountries
      localizations
      popularity
      priorityPlace
      isActive
      isFavorite
      description
    }
  }
`)
