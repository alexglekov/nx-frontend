/* eslint-disable max-statements, max-lines */
import { useEffect, useState } from 'react'
import { useQuery, useReactiveVar, useSubscription } from '@apollo/client'
import {
  GameResultNotification,
  GameType,
  NotificationsListSubscription,
  NotificationsSubscription,
  NotificationType,
  PredictStatus,
  User
} from '__generated__/graphql'
import { GET_NOTIFICATIONS } from 'api/general/get-notifications'
import { SUBSCRIPTION_GLOBAL_NOTIFICATION_LIST } from 'api/general/subscription-global-notification-list'
import { SUBSCRIPTION_GLOBAL_NOTIFICATIONS } from 'api/general/subscription-global-notifications'
import {
  notificationListVar,
  notificationsSkipAmountVar
} from 'shared/store/notification'
import { v4 } from 'uuid'
import { useReadGlobalNotifications } from './use-read-global-notification'
import { useShowGlobalNotifications } from './use-show-global-notifications'
import { useUnreadGlobalNotifications } from './use-unread-global-notifications'

const DEFAULT_TAKE_NOTIFICATIONS_AMOUNT = 15

// TODO: Fix first level (this hook level) typing issue. GameType should be replaced with common notification type
export const useControlNotifications = (
  user: User | null,
  isNotificationListOpen = false
) => {
  const currentNotifications = useReactiveVar(notificationListVar)
  const notificationsSkipAmount = useReactiveVar(notificationsSkipAmountVar)

  const [lastNotification, setLastNotification] =
    useState<GameResultNotification | null>(null)

  const { handleMountNotification } = useShowGlobalNotifications()
  const { handleReadNotifications } = useReadGlobalNotifications(
    isNotificationListOpen
  )
  const {
    refetchUnreadNotifications,
    setUnreadNotificationsAmount,
    unreadNotificationsAmount
  } = useUnreadGlobalNotifications()

  const {
    data: notificationsQuery,
    loading,
    refetch: refetchNotificationList
  } = useQuery(GET_NOTIFICATIONS, {
    variables: {
      data: {
        take: DEFAULT_TAKE_NOTIFICATIONS_AMOUNT,
        skip: notificationsSkipAmount
      }
    },
    skip: !isNotificationListOpen
  })

  const { data: subscribeData } = useSubscription<NotificationsSubscription>(
    SUBSCRIPTION_GLOBAL_NOTIFICATIONS,
    { shouldResubscribe: true, variables: { userId: user?.id } }
  )

  const { data: subscribeDataList } =
    useSubscription<NotificationsListSubscription>(
      SUBSCRIPTION_GLOBAL_NOTIFICATION_LIST,
      { shouldResubscribe: true, variables: { userId: user?.id } }
    )

  useEffect(() => {
    const notificatons: GameResultNotification[] =
      notificationsQuery?.getNotifications?.notifications

    if (!notificatons) return

    const filteredNotifications = notificatons.filter(
      notification =>
        !currentNotifications.some(
          existingNotification => notification.id === existingNotification.id
        )
    )

    if (filteredNotifications.length === 0) return

    const newNotifications = [...currentNotifications, ...filteredNotifications]

    notificationListVar(newNotifications)

    const newNotificationIDs = notificatons?.map(el => {
      return el.id
    })

    handleReadNotifications(newNotificationIDs, newNotifications)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationsQuery])

  // eslint-disable-next-line complexity
  useEffect(() => {
    const notificationsList =
      subscribeDataList?.notificationsList as GameResultNotification[]

    if (!notificationsList) return

    const totalNotificationsBetAmount =
      notificationsList?.reduce((sum, n) => sum + (n.payload.amount || 0), 0) ||
      0

    const initialPayload = {
      gameType: notificationsList?.[0]?.payload?.gameType || GameType.Bullseye,
      amount: notificationsList?.[0]?.payload?.amount || 1,
      outcome: 0,
      status: '',
      isExact: false
    }

    const complexNotification = {
      id: notificationsList?.[0]?.id || v4(),
      userId: user?.id || v4(),
      type: NotificationType.GameResult,
      isRead: false,
      createdAt: Date.now(),
      payload: initialPayload
    }

    complexNotification.payload.outcome = notificationsList.reduce(
      (outcomeSum, n) => outcomeSum + (n.payload.outcome || 0),
      0
    )

    if (totalNotificationsBetAmount > complexNotification.payload.outcome) {
      complexNotification.payload.status = PredictStatus.Loss
    } else {
      complexNotification.payload.status = PredictStatus.Won
    }

    if (notificationsList?.[0]?.payload?.status === PredictStatus.Reject) {
      complexNotification.payload.status = PredictStatus.Reject
    }

    const isNotificationExists = currentNotifications.find(
      el => el.id === complexNotification?.id
    )

    if (isNotificationExists || complexNotification.id === lastNotification?.id)
      return

    handleMountNotification(complexNotification as GameResultNotification)

    setLastNotification(complexNotification as GameResultNotification)

    if (currentNotifications.length === 0) {
      refetchUnreadNotifications()
    } else {
      notificationListVar([
        complexNotification as GameResultNotification,
        ...currentNotifications
      ])
      setUnreadNotificationsAmount(prev => prev + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    subscribeDataList,
    handleMountNotification,
    refetchNotificationList,
    refetchUnreadNotifications
  ])

  useEffect(() => {
    const notification = subscribeData?.notifications as GameResultNotification

    if (!notification) return

    const isNotificationExists = currentNotifications.find(
      el => el.id === notification?.id
    )

    if (isNotificationExists || notification.id === lastNotification?.id) return

    handleMountNotification(notification)

    setLastNotification(notification)

    if (currentNotifications.length === 0) {
      refetchUnreadNotifications()
    } else {
      notificationListVar([notification, ...currentNotifications])
      setUnreadNotificationsAmount(prev => prev + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    subscribeData,
    handleMountNotification,
    refetchNotificationList,
    refetchUnreadNotifications
  ])

  useEffect(() => {
    if (user) return

    refetchNotificationList()
    refetchUnreadNotifications()
  }, [user, refetchNotificationList, refetchUnreadNotifications])

  return {
    loading,
    unreadNotificationsAmount,
    refetchNotificationList,
    refetchUnreadNotifications
  }
}
