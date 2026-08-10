import { useMutation } from '@apollo/client'
import { GameResultNotification } from '__generated__/graphql'
import { MARK_NOTIFICATIONS_READ } from 'api/general/mark-notifications-read'
import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { notificationListVar } from 'shared/store/notification'

// TODO: Heavy hook, requires refactoring in future.
// WARNING: Usage is not recommended, pls try to R&D new solution
export const useObserveNotificationsState = (
  notifications: GameResultNotification[]
) => {
  const [commitMarkNotificationsRead] = useMutation(MARK_NOTIFICATIONS_READ)
  const [viewedElementsIDs, setViewedElementsIDs] = useState<string[]>([])

  // eslint-disable-next-line max-statements
  const updateNotification = (id: string) => {
    const updatedData = [...notifications]

    const objectIndex = notifications.findIndex(obj => obj.id === id)

    const currentNotification = updatedData[objectIndex]

    if (objectIndex === -1 || currentNotification.isRead) return

    updatedData[objectIndex] = {
      ...currentNotification,
      isRead: true
    }

    notificationListVar(updatedData)

    if (viewedElementsIDs.find(el => el === currentNotification.id)) return

    flushSync(() =>
      setViewedElementsIDs(prev => [...prev, currentNotification.id])
    )
  }

  useEffect(() => {
    if (viewedElementsIDs.length === 0) return

    const timeout = setTimeout(() => {
      commitMarkNotificationsRead({
        variables: {
          data: {
            ids: viewedElementsIDs
          }
        }
      })
    }, 1000)

    setViewedElementsIDs([])

    return () => clearTimeout(timeout)
  }, [viewedElementsIDs, commitMarkNotificationsRead])

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return

        updateNotification(entry.target.id)
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0
    })

    notifications.forEach(notification => {
      const target = document.getElementById(notification.id)

      if (target) {
        observer.observe(target)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [notifications])
}
