import { useQueryUserById } from './use-fetch-user-by-id'

export const useFetchProfileByUrlParam = (id?: string) => {
  const { user, loading } = useQueryUserById(id)

  return id ? { user: user || null, loading } : { user: null, loading: false }
}
