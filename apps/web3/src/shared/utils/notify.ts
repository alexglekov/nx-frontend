import { NotificationState } from 'features/notification/types'
import { notificationStateVar } from 'shared/store/notification'

export const showNotificationToast = (
  params: Omit<NotificationState, 'isOpen'>
) => {
  console.info('Notification toast params', params)
  notificationStateVar({
    isOpen: true,
    type: params.type,
    title: params.title,
    description: params.description,
    duration: params.duration,
    winAmount: params.winAmount,
    actionText: params.actionText,
    linkAddress: params.linkAddress,
    buttonAction: params.buttonAction
  })
}
