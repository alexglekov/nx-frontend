import { CashbackStatus } from '__generated__/graphql'

export const getCashbackButtonTextByStatus = (
  status: CashbackStatus | null
) => {
  if (status === CashbackStatus.Completed) {
    return 'DONE'
  }

  if (status === CashbackStatus.Rejected) {
    return 'REJECTED'
  }

  if (status === CashbackStatus.Pending) {
    return 'Approve in progress'
  }

  return 'CLAIM'
}
