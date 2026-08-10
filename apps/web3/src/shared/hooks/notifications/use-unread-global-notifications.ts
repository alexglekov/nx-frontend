import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_UNREAD_NOTIFICATIONS_COUNT } from 'api/general/get-unread-notifications-count'

export const useUnreadGlobalNotifications = () => {
  const [unreadNotificationsAmount, setUnreadNotificationsAmount] =
    useState<number>(0)

  const { data: unreadNotificationCount, refetch: refetchUnreadNotifications } =
    useQuery(GET_UNREAD_NOTIFICATIONS_COUNT)

  useEffect(() => {
    const unreadAmount =
      unreadNotificationCount?.getUnreadNotificationsCount || 0

    setUnreadNotificationsAmount(unreadAmount)
  }, [unreadNotificationCount])

  return {
    refetchUnreadNotifications,
    unreadNotificationsAmount,
    setUnreadNotificationsAmount
  }
}
