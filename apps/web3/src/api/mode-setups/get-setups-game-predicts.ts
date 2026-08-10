import { gql } from '__generated__'

export const GET_SETUPS_GAME_PREDICTS = gql(`
  query getSetupPredicts($id: String!, $pagination: PaginatedInput!) {
    getSetupPredicts(id: $id, pagination: $pagination) {
      predicts {
        ...SetupsPredict
      }
      __typename
    }
  }
`)
