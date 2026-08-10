import { useCallback } from 'react'
import { ApolloError, useLazyQuery } from '@apollo/client'
import { CheckReferralAvailabilityQuery } from '__generated__/graphql'
import { CHECK_REFERRAL_CODE_AVAILABILITY } from 'api/auth/check-code'
import { showNotificationToast } from 'shared/utils/notify'
import { referrerIdVar } from '../store/wizard.store'

export function useCheckReferralCode() {
  const [commitCheckCode, { loading }] =
    useLazyQuery<CheckReferralAvailabilityQuery>(
      CHECK_REFERRAL_CODE_AVAILABILITY
    )

  const checkCode = useCallback(
    // eslint-disable-next-line max-statements
    async (code: string) => {
      if (!code) return false

      const { data, error } = await commitCheckCode({
        variables: {
          data: { code: code.trim() }
        },
        onError: е => notifyOnError(е)
      })

      if (error) return false

      const checkReferralAvalability = data?.checkReferralAvalability
      const { active: isAvailable, user } = checkReferralAvalability ?? {}
      const referrerId = user?.id ?? null

      if (!isAvailable || !referrerId) {
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
