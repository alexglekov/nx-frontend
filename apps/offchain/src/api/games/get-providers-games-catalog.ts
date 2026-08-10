import { gql } from '__generated__'

export const GET_PROVIDERS_GAMES_CATALOG = gql(`
  query getProviderGamesCatalog($filters: CatalogGamesFiltersInput!, $pagination: PaginatedInput!) {
    getProviderGamesCatalog(filters: $filters, pagination: $pagination) {
      skip
      take
      total
      games {
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
        isFavorite
        priorityPlace
        isActive
        description
      }
    }
  }
`)
