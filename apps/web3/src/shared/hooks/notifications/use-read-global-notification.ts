import { useEffect } from 'react'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { GameResultNotification } from '__generated__/graphql'
import { GET_UNREAD_NOTIFICATIONS_COUNT } from 'api/general/get-unread-notifications-count'
import { MARK_NOTIFICATIONS_READ } from 'api/general/mark-notifications-read'
import { notificationListVar } from 'shared/store/notification'

const DEFAULT_READ_NOTIFICATION_TIMEOUT = 1000

export const useReadGlobalNotifications = (isNotificationListOpen = false) => {
  const currentNotifications = useReactiveVar(notificationListVar)

  const [commitMarkNotificationsRead] = useMutation(MARK_NOTIFICATIONS_READ)

  const { refetch: refetchUnreadNotifications } = useQuery(
    GET_UNREAD_NOTIFICATIONS_COUNT
  )

  const handleReadNotifications = (
    notificationsIDs: string[],
    newNotifications: GameResultNotification[]
  ) => {
    if (
      !notificationsIDs ||
      !isNotificationListOpen ||
      notificationsIDs.length === 0
    )
      return

    setTimeout(async () => {
      await commitMarkNotificationsRead({
        variables: {
          data: {
            ids: notificationsIDs
          }
        }
      })

      const notificationsIDsSet = new Set(notificationsIDs)

      const notificationListWithUpdatedStatuses = newNotifications?.map(
        notification => {
          if (notificationsIDsSet.has(notification.id)) {
            return { ...notification, isRead: true }
          }
          return notification
        }
      )

      if (notificationListWithUpdatedStatuses.length === 0) return

      notificationListVar(notificationListWithUpdatedStatuses)
      refetchUnreadNotifications()
    }, DEFAULT_READ_NOTIFICATION_TIMEOUT)
  }

  useEffect(() => {
    if (!isNotificationListOpen) return

    const ureadNotifications = currentNotifications.filter(
      el => el.isRead !== true
    )

    if (ureadNotifications.length === 0) return

    const newNotificationIDs = ureadNotifications?.map(
      (el: GameResultNotification) => {
        return el.id
      }
    )

    handleReadNotifications(newNotificationIDs, currentNotifications)
  }, [isNotificationListOpen])

  return {
    handleReadNotifications
  }
}
