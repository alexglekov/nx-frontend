import { useQuery } from '@apollo/client'
import { GET_PROVIDERS_AND_CATEGORIES } from 'api/games/get-providers-and-categories'

export const useGetProvidersAndCategories = () => {
  const { data, loading } = useQuery(GET_PROVIDERS_AND_CATEGORIES)

  return {
    providers: data?.getProvidersAndCategoriesList?.providers || [],
    categories: data?.getProvidersAndCategoriesList?.categories || [],
    loading
  }
}
