/* eslint-disable max-statements */
import { useEffect, useState } from 'react'
import { useQuery, useReactiveVar, useSubscription } from '@apollo/client'
import { QUERY_GET_USER_BALANCE } from 'api/balance/query-get-user-balance'
import { SUBSCRIBE_USER_BALANCE } from 'api/balance/subscribe-user-balance'
import { globalOverlayBalanceLoadingVar } from 'shared/store/global-overlay-state-store'
import { userVar } from 'shared/store/user'
import { formatToUSD } from 'shared/utils/format-price'

export const useBalance = () => {
  const user = useReactiveVar(userVar)

  const [balance, setBalance] = useState(0)
  const [bonusBalance, setBonusBalance] = useState(0)

  const { data: queryData, loading: queryLoading } = useQuery(
    QUERY_GET_USER_BALANCE,
    { skip: !user, fetchPolicy: 'no-cache' }
  )
  const { data: subscriptionData } = useSubscription(SUBSCRIBE_USER_BALANCE, {
    skip: !user
  })

  const queryBalance = queryData?.getUserBalance
  const subscriptionBalance = subscriptionData?.userBalanceChanged

  useEffect(() => {
    setBalance(queryBalance?.amount || 0)
    setBonusBalance(queryBalance?.bonusAmount || 0)
  }, [queryBalance])

  useEffect(() => {
    setBalance(subscriptionBalance?.amount || 0)
    setBonusBalance(subscriptionBalance?.bonusAmount || 0)
  }, [subscriptionBalance])

  useEffect(() => {
    globalOverlayBalanceLoadingVar(queryLoading)
  }, [queryLoading])

  const formattedBalance = formatToUSD(balance)
  const formattedBonusBalance = formatToUSD(bonusBalance)

  return {
    balance,
    bonusBalance,
    formattedBalance,
    formattedBonusBalance,
    loading: queryLoading
  }
}
