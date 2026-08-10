import { ApolloError } from '@apollo/client'
import { notificationStateVar } from 'shared/store/notification'
import { SwitchChainErrorType } from 'viem'
import { showNotificationToast } from './notify'

export const notifyOnCreationError = (err: ApolloError) => {
  const notificationState = {
    isOpen: true,
    title: 'Error! Game not created',
    description: err.message,
    type: 'error' as const
  }
  notificationStateVar(notificationState)
}

export const notifyOnUnknownError = (
  err: ApolloError | SwitchChainErrorType
) => {
  console.error('Error:', err)
  showNotificationToast({
    title: err.message,
    type: 'error'
  })
}

export const notifyOnAuthError = (err: ApolloError) => {
  notificationStateVar({
    title: 'Please, sign in',
    description: err.message,
    type: 'error',
    isOpen: true
  })
}

export const notifyOnBalanceError = () =>
  notificationStateVar({
    isOpen: true,
    description: `You can't select more than 1000 points`,
    title: 'Error!',
    type: 'error'
  })

export const notifyWithArbitraryErrorMessage = (errorMessage: string) =>
  notificationStateVar({
    isOpen: true,
    description: errorMessage,
    title: 'Error!',
    type: 'error'
  })
