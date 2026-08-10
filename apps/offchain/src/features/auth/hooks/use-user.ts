import { useQuery } from '@apollo/client'
import { GET_ME } from 'api/auth/me'
import { showSignUpDialogOrError } from '../utils/show-sign-up-dialog-or-error'

export function useUser() {
  const { data, loading, error, refetch } = useQuery(GET_ME, {
    onError: e => {
      showSignUpDialogOrError(e)
    }
  })

  const userData = data?.me

  return {
    userData,
    loading,
    error,
    refetchUser: refetch
  }
}
