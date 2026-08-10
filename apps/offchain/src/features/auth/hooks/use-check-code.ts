import { useCallback } from 'react'
import { ApolloError, useLazyQuery } from '@apollo/client'
import { GetReferrerIdByCodeQuery } from '__generated__/graphql'
import { GET_REFERRER_ID_BY_CODE } from 'api/auth/get-referrer-id-by-code'
import { showNotificationToast } from 'shared/utils/notify'
import { referrerIdVar } from '../store/wizard.store'

export function useCheckReferralCode() {
  const [commitCheckCode, { loading }] = useLazyQuery<GetReferrerIdByCodeQuery>(
    GET_REFERRER_ID_BY_CODE
  )

  const checkCode = useCallback(
    // eslint-disable-next-line max-statements
    async (code: string) => {
      if (!code) return false

      const { data, error } = await commitCheckCode({
        variables: {
          code: code.trim()
        }
      })

      if (error) return false

      const referrerId = data?.getReferrerIdByCode ?? null

      if (!referrerId) {
        notifyOnInvalidReferralCode()
        return false
      }

      referrerIdVar(referrerId)
      return true
    },
    [commitCheckCode]
  )

  return {
    loading,
    checkCode
  }
}

const notifyOnError = (e: ApolloError) =>
  showNotificationToast({
    type: 'error',
    title: 'Error!',
    description: e.message
  })

const notifyOnInvalidReferralCode = () =>
  showNotificationToast({
    type: 'error',
    title: 'Invalid referral code'
  })
