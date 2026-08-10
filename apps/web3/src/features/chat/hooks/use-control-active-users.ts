import { useEffect, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { OnlineSubscription } from '__generated__/graphql'
import { GET_ACTIVE_USERS } from 'api/chat/get-active-users'
import { SUBSCRIPTION_ACTIVE_USERS } from 'api/chat/subscription-active-users'

export const useOnlineUsers = () => {
  const [activeUsersAmount, setActiveUsersAmount] = useState<number>(0)

  const { data: initialActiveUsersAmount, loading } = useQuery(GET_ACTIVE_USERS)
  const initialOnline = initialActiveUsersAmount?.getCurrentOnline

  const { data } = useSubscription<OnlineSubscription>(
    SUBSCRIPTION_ACTIVE_USERS
  )
  const onlineUsersSubs = data?.online

  useEffect(() => {
    if (!initialOnline) return

    // NOTE: to prevent negative value from server [BE-157]
    const onlineAmount = initialOnline < 1 ? 1 : initialOnline
    setActiveUsersAmount(onlineAmount)
  }, [initialOnline])

  useEffect(() => {
    if (!onlineUsersSubs) return

    setActiveUsersAmount(onlineUsersSubs)
  }, [onlineUsersSubs])

  return { loading, activeUsersAmount }
}
