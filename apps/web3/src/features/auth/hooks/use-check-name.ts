import { useCallback } from 'react'
import { useLazyQuery } from '@apollo/client'
import { CheckNameAvailabilityQuery } from '__generated__/graphql'
import { CHECK_NAME_AVAILABILITY } from 'api/auth/check-name'
import { notificationStateVar } from 'shared/store/notification'

export function useCheckNames() {
  const [commitCheckName, { loading }] =
    useLazyQuery<CheckNameAvailabilityQuery>(CHECK_NAME_AVAILABILITY)

  const checkNames = useCallback(
    async (username: string) => {
      if (!username) {
        return
      }

      const response = await commitCheckName({
        variables: {
          data: {
            name: String(username)
          }
        }
      })

      const isAvailable = response.data?.checkNameAvailability

      if (!isAvailable)
        notificationStateVar({
          isOpen: true,
          title: 'This name is already taken',
          type: 'warning'
        })

      return isAvailable
    },
    [commitCheckName]
  )

  return {
    loading,
    checkNames
  }
}
