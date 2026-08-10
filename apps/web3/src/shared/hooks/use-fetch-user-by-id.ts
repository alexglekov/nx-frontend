import { useQuery } from '@apollo/client'
import { useFragment } from '__generated__'
import { GetUserByIdQuery } from '__generated__/graphql'
import { FRAGMENT_ME } from 'api/auth/fragment-me'
import { GET_USER_BY_ID } from 'api/user-profile/get-user-by'

export const useQueryUserById = (id?: string) => {
  const { data, loading } = useQuery<GetUserByIdQuery>(GET_USER_BY_ID, {
    skip: !id,
    variables: {
      userId: id
    },
    fetchPolicy: 'no-cache',
    onError: error => {
      console.error('useQueryUserById error', error)
    }
  })

  const user = useFragment(FRAGMENT_ME, data?.getUserById) ?? null

  return { user, loading }
}
