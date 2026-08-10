import { ApolloError } from '@apollo/client'
import { notificationStateVar } from 'shared/store/notification'

export const notifyOnAuthCompleted = () => {
  notificationStateVar({
    isOpen: true,
    title: 'You are logged in',
    type: 'info'
  })
}

export function notifyOnVerifyingError(error: ApolloError) {
  console.error('Failed to verify wallet', error)
  return notificationStateVar({
    title: error.message,
    type: 'error',
    isOpen: true
  })
}

export function notifyOnChallengeError(error: ApolloError) {
  notificationStateVar({
    title: 'Failed to get challenge',
    description: error.message,
    type: 'error',
    isOpen: true
  })
}
