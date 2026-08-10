import { useQuery } from '@apollo/client'
import { useFragment } from '__generated__'
import { GetUserByIdQuery } from '__generated__/graphql'
import { FRAGMENT_ME } from 'api/auth/fragment-me'
import { GET_USER_BY_ID } from 'api/user-profile/get-user-by'

export const useQueryUserById = (id?: string, enabled = false) => {
  const { data, loading } = useQuery<GetUserByIdQuery>(GET_USER_BY_ID, {
    skip: !id || !enabled,
    variables: { userId: id },
    fetchPolicy: 'no-cache',
    onError: e => console.error(e)
  })

  const user = useFragment(FRAGMENT_ME, data?.getUserById) ?? null
  const tierStats = data?.getLoyaltyProgressByUserId

  return { user, loading, tierStats }
}
