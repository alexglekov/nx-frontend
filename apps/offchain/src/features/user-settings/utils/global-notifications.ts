import { notificationStateVar } from 'shared/store/notification'

// TODO: Replace to shared
export const errorGlobalNotification = (message = 'Unexpected error') => {
  notificationStateVar({
    isOpen: true,
    title: 'Error',
    description: message,
    type: 'error'
  })
}

// TODO: Replace to shared
export const successGloalNotification = (message = 'Success') => {
  notificationStateVar({
    isOpen: true,
    title: 'Success',
    description: message,
    type: 'success'
  })
}
