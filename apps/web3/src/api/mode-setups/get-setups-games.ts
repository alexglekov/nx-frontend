import { gql } from '__generated__'

export const GET_SETUPS_GAMES = gql(`
  query getSetupGames($filters: SetupGameFilters!, $pagination: PaginatedInput!) {
    getSetupGames(filters: $filters, pagination: $pagination) {
      skip
      take
      total
      games {
        ...SetupsGame 
      }
    }
  }
`)
