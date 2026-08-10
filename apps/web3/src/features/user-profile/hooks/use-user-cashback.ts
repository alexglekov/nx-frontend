import { useQuery } from '@apollo/client'
import { QUERY_GET_CASHBACK_SUMMARY } from 'api/user-profile/get-cashback-sumary'
import { useRewardsLevels } from 'features/rewards/hooks/use-rewards-levels'
import { formatToXyro } from 'shared/utils/format-price'

export const useUserCashback = () => {
  const { refetchUserLevel } = useRewardsLevels()

  const { data: cashbackSumaryQueryData, refetch: refetchCashbackSummary } =
    useQuery(QUERY_GET_CASHBACK_SUMMARY)

  const cashbackSummaryData = cashbackSumaryQueryData?.getCashbackSummary || []

  const totalCashBackAmount = cashbackSummaryData.reduce(
    (sum, item) => sum + item.cashbackAmount,
    0
  )
  const formattedTotalCashBackAmount = formatToXyro(totalCashBackAmount)

  return {
    cashbackSummaryData,
    refetchUserLevel,
    refetchCashbackSummary,
    totalCashBackAmount: formattedTotalCashBackAmount
  }
}
