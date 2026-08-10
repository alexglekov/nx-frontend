import { useQuery } from '@apollo/client'
import { GET_REFERRAL } from 'api/auth/get-referral'
import { GET_REFERRAL_STATISTICS } from 'api/rewards/get-referral-statistic'

export const useInviteFriendsInfo = () => {
  const {
    data: referralCodeData,
    loading: refferalCodeLoading,
    refetch: refetchRefferalCode
  } = useQuery(GET_REFERRAL)

  const refferalCode = referralCodeData?.getReferral?.code || ''

  const { data: referralStatisticData, loading: referralStatisticDataLoading } =
    useQuery(GET_REFERRAL_STATISTICS)

  const referralStatistics = referralStatisticData?.getReferralStatistic

  const numberOfInvited = referralStatistics?.numberOfInvited || 0
  const numberOfSecondLevelInvited =
    referralStatistics?.numberOfSecondLevelInvited || 0

  return {
    refferalCode,
    refferalCodeLoading,
    numberOfInvited,
    numberOfSecondLevelInvited,
    referralStatisticDataLoading,
    refetchRefferalCode
  }
}
