import { gql } from '__generated__'

// TODO: investigate a typing problem with the imposibility to remove the email field from the User type of the owner field
export const GET_SETUPS_USER_GAMES = gql(`
  query getUserSetupGames($filters: SetupGameFilters!, $pagination: PaginatedInput!) {
    getUserSetupGames(filters: $filters, pagination: $pagination) {
      skip
      take
      total
      games {
        ...SetupsGame
        ownerProfit
        startAt
      }
    }
  }
`)
