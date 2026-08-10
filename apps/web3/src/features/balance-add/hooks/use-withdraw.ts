import { useMutation } from '@apollo/client'
import { WithdrawalMutation } from '__generated__/graphql'
import { WITHDRAW } from 'api/payments/withdraw'
import { useCallback } from 'react'
import { notificationStateVar } from 'shared/store/notification'
import { notifyOnCreationError } from 'shared/utils/notify-on-error'

export interface WithdrawProps {
  amountUsd: number
  currency: string
  address: string
}

export const useWithdraw = () => {
  const [commitWithdrawHandle] = useMutation<WithdrawalMutation>(WITHDRAW)

  const commitWithdraw = useCallback(
    ({ amountUsd, currency, address }: WithdrawProps) => {
      const mutationOptions = {
        variables: { data: { amountUsd, currency, address } },
        onError: notifyOnCreationError,
        onCompleted: () => {
          notificationStateVar({
            isOpen: true,
            title: 'Withdraw created',
            type: 'success'
          })
          window.location.assign('/withdrawals')
        }
      }

      commitWithdrawHandle(mutationOptions)
    },
    [commitWithdrawHandle]
  )
  return {
    commitWithdraw
  }
}
