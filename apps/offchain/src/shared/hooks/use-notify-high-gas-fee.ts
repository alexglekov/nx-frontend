import { useEffect } from 'react'
import { ApolloError } from '@apollo/client'
import { notificationStateVar } from 'shared/store/notification'

export const useNotifyHighGasFee = (error: ApolloError | null) => {
  useEffect(() => {
    if (!error) return

    notifyOnHighGas()
  }, [error])
}

const notifyOnHighGas = () => {
  notificationStateVar({
    isOpen: true,
    type: 'warning',
    title: 'High gas fee detected',
    description: 'The game is temporary unavailable, please try again later.'
  })
}
