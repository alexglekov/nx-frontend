import { gql } from '__generated__'

export const GET_SETUPS_USER_PREDICTS = gql(`
  query getSetupsUserPredicts($filters: SetupPredictFilters!, $pagination: PaginatedInput!) {
    getUserSetupPredicts(filters: $filters, pagination: $pagination) {
      predicts {
        ...SetupsPredict
      }
      total
    }
  }
`)
