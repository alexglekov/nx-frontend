import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import {
  notificationQueueVar,
  notificationStateVar
} from 'shared/store/notification'
import { v4 } from 'uuid'
import { NOTIFICATION_TOAST_INIT_TITLE } from '../constants'
import { NotificationState } from '../types'

export const useNotificationQueue = () => {
  const notificationState = useReactiveVar(notificationStateVar)
  const notificationQueue = useReactiveVar(notificationQueueVar)

  useEffect(() => {
    if (notificationState.title === NOTIFICATION_TOAST_INIT_TITLE) return
    if (isForbiddenToShow(notificationState)) return

    notificationQueueVar([
      ...notificationQueue,
      { ...notificationState, id: v4() }
    ])
  }, [notificationState])
}

function isForbiddenToShow(notify: NotificationState) {
  if (notify.type === 'error' && notify.title === 'Unauthorized') return true

  return false
}
