import { ApolloError } from '@apollo/client'
import { notificationStateVar } from 'shared/store/notification'

export const notifyOnError = (error: ApolloError) => {
  notificationStateVar({
    isOpen: true,
    title: 'Error',
    description: error.message,
    type: 'error'
  })
}
