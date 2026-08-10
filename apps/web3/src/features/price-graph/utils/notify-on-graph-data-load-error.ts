import { ApolloError } from '@apollo/client'
import { notificationStateVar } from 'shared/store/notification'

export function notifyOnGraphDataLoadError(err: ApolloError) {
  notificationStateVar({
    isOpen: true,
    title: 'Asset prices are not loaded',
    description: err.message,
    type: 'warning'
  })
}
