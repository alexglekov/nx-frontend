import { useQueryUserById } from './use-fetch-user-by-id'

export const useFetchProfileByUrlParam = (id?: string, enabled = false) => {
  const { user, loading, tierStats } = useQueryUserById(id, enabled)

  return {
    user: id && enabled ? user : null,
    loading: id && enabled ? loading : false,
    tierStats: id && enabled ? tierStats : null
  }
}
