import { useQuery } from '@apollo/client'
import { GetReferralDataQuery } from '__generated__/graphql'
import { GET_REFERRAL_DATA } from 'api/referrals/query-get-referral-data'

export function useReferralData() {
  const { data, loading, error, refetch } =
    useQuery<GetReferralDataQuery>(GET_REFERRAL_DATA)

  const referralUserLevel = data?.getReferralUserLevel
  const referralLevels = data?.getReferralLevels
  const numberOfOwnReferrals = data?.getNumberOfOwnDepositedReferrals
  const activeReferralSeason = data?.getActiveReferralSeason

  return {
    activeReferralSeason,
    referralLevels,
    referralUserLevel,
    numberOfOwnReferrals,
    loading,
    error,
    refetch
  }
}
