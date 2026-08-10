import { useEffect } from 'react'
import { useQuery, useReactiveVar, useSubscription } from '@apollo/client'
import {
  GetUserBlockchainBalanceQuery,
  UserBlockchainBalanceChangedSubscription
} from '__generated__/graphql'
import { GET_USER_BLOCKCHAIN_BALANCE } from 'api/balance/get-user-blockchain-balance'
import { SUBSCRIBE_USER_BLOCKCHAIN_BALANCE } from 'api/balance/subscribe-user-blockchain-balance'
import { balanceVar } from 'shared/store/balance-store'
import { globalOverlayBalanceLoadingVar } from 'shared/store/global-overlay-state-store'
import { userVar } from 'shared/store/user'

// eslint-disable-next-line max-statements
export const useBlockChainBalance = () => {
  const user = useReactiveVar(userVar)

  const {
    data: userBlockchainBalanceQuery,
    loading: userBlockchainBalanceQueryLoading
  } = useQuery<GetUserBlockchainBalanceQuery>(GET_USER_BLOCKCHAIN_BALANCE, {
    skip: !user?.id
  })

  const {
    data: userBlockchainBalanceSubscription,
    loading: userBlockchainBalanceSubscriptionLoading
  } = useSubscription<UserBlockchainBalanceChangedSubscription>(
    SUBSCRIBE_USER_BLOCKCHAIN_BALANCE
  )

  useEffect(() => {
    const userBlockchainBalanceQueryData =
      userBlockchainBalanceQuery?.getUserBlockchainBalance || null

    if (!userBlockchainBalanceQueryData) return

    balanceVar(userBlockchainBalanceQueryData)
  }, [userBlockchainBalanceQuery])

  useEffect(() => {
    const userBlockchainBalanceSubscriptionData =
      userBlockchainBalanceSubscription?.userBlockchainBalanceChanged || null

    if (!userBlockchainBalanceSubscriptionData) return

    balanceVar(userBlockchainBalanceSubscriptionData)
  }, [userBlockchainBalanceSubscription])

  useEffect(() => {
    globalOverlayBalanceLoadingVar(userBlockchainBalanceQueryLoading)
  }, [userBlockchainBalanceQueryLoading])

  return {
    loading:
      userBlockchainBalanceQueryLoading ||
      userBlockchainBalanceSubscriptionLoading
  }
}
