import { useQuery, useReactiveVar } from '@apollo/client'
import { GetRakebackSummaryQuery } from '__generated__/graphql'
import { GET_RAKEBACK_SUMMARY } from 'api/balance/get-rakeback-summary'
import { userVar } from 'shared/store/user'
import { formatToTether } from 'shared/utils/format-price'
import { DEFAULT_RAKEBACK_VALUES } from '../constants'

// eslint-disable-next-line complexity
export const useLoadRakeback = () => {
  const user = useReactiveVar(userVar)

  const { data, loading, refetch } = useQuery<GetRakebackSummaryQuery>(
    GET_RAKEBACK_SUMMARY,
    {
      variables: {
        userId: user?.id
      },
      skip: !user?.id
    }
  )

  const result =
    data?.getRakebackSummary ?
      {
        bullseye: {
          xyro: formatToTether(data.getRakebackSummary.bullseye.xyro) || 0,
          usdt: formatToTether(data.getRakebackSummary.bullseye.usdt) || 0
        },
        setup: {
          xyro: formatToTether(data.getRakebackSummary.setup.xyro) || 0,
          usdt: formatToTether(data.getRakebackSummary.setup.usdt) || 0
        },
        updown: {
          xyro: formatToTether(data.getRakebackSummary.updown.xyro) || 0,
          usdt: formatToTether(data.getRakebackSummary.updown.usdt) || 0
        },
        race: {
          xyro: formatToTether(data.getRakebackSummary.race.xyro) || 0,
          usdt: formatToTether(data.getRakebackSummary.race.usdt) || 0
        },
        total: {
          xyro: formatToTether(data.getRakebackSummary.total.xyro) || 0,
          usdt: formatToTether(data.getRakebackSummary.total.usdt) || 0
        }
      }
    : DEFAULT_RAKEBACK_VALUES

  return {
    data: result,
    loading,
    refetch
  }
}
