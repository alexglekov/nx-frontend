import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ReferralWithdrawRequest } from '__generated__/graphql'
import { GET_OWN_REFERRAL_WITHDRAW_REQUEST } from 'api/referrals/get-own-referral-withdraw-request'

export const useReferralsWithdrawTransactions = () => {
  const [referralsWithdrawTransactions, setReferralsWithdrawTransactions] =
    useState<ReferralWithdrawRequest[]>([])

  const { data: referralsWithdtawRequestsQueryData, loading } = useQuery(
    GET_OWN_REFERRAL_WITHDRAW_REQUEST
  )

  useEffect(() => {
    const referralsWithdtawRequestsData =
      referralsWithdtawRequestsQueryData?.getOwnReferralWithdrawRequests

    if (!referralsWithdtawRequestsData) return

    setReferralsWithdrawTransactions(
      referralsWithdtawRequestsData.requests as ReferralWithdrawRequest[]
    )
  }, [referralsWithdtawRequestsQueryData?.getOwnReferralWithdrawRequests])

  return {
    referralsWithdrawTransactions,
    loading
  }
}
