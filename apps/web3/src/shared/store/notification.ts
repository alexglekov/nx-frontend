import { makeVar } from '@apollo/client'
import { GameResultNotification } from '__generated__/graphql'
import { NOTIFICATION_TOAST_INIT_TITLE } from 'features/notification/constants'
import {
  NotificationState,
  NotificationStateWithId,
  NotificationToastTypes
} from 'features/notification/types'

const notificationInitialState = {
  isOpen: false,
  title: NOTIFICATION_TOAST_INIT_TITLE,
  type: NotificationToastTypes.INFO,
  duration: 3000
}

export const notificationStateVar = makeVar<NotificationState>(
  notificationInitialState
)

export const notificationQueueVar = makeVar<NotificationStateWithId[]>([])

export const notificationListVar = makeVar<GameResultNotification[]>([])

export const notificationsSkipAmountVar = makeVar<number>(0)
