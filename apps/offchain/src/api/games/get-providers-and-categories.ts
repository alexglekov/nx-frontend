import { gql } from '__generated__'

export const GET_PROVIDERS_AND_CATEGORIES = gql(`
  query getProvidersAndCategoriesList {
    getProvidersAndCategoriesList {
      providers
      categories
    }
  }
`)
