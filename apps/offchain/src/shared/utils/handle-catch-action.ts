import { notificationStateVar } from 'shared/store/notification'

export const handleCatchAction = (e: unknown) => {
  // @ts-expect-error Message does not exists
  if (e?.message?.includes('User rejected the request')) {
    notifyOnUserReject()

    return
  }

  console.error(e)

  if (
    // @ts-expect-error Message does not exists
    e?.message?.includes('Non-200') ||
    // @ts-expect-error Message does not exists
    e?.message?.includes('JSON-RPC error')
  ) {
    notifyOnRPCHighload()
    return
  }

  notifyOnContractError('Something went wrong')
}

const notifyOnContractError = (message: string) => {
  notificationStateVar({
    isOpen: true,
    description: message,
    title: 'Error!',
    type: 'error'
  })
}

const notifyOnRPCHighload = () => {
  notificationStateVar({
    isOpen: true,
    description: 'Please, try again later',
    title: 'Network highload!',
    type: 'warning'
  })
}

const notifyOnUserReject = () => {
  notificationStateVar({
    isOpen: true,
    description: 'Please try again',
    title: 'User denied transaction',
    type: 'error'
  })
}
