import { useCallback, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROFIT_FOR_REFERRALS_REDICTS } from 'api/referrals/get-profit-for-referrals-predicts'
import { MUTATION_CREATE_WITHDRAW_REQUEST } from 'api/referrals/mutation-create-withdraw-request'
import { notificationStateVar } from 'shared/store/notification'

export const useWithdrawRequest = () => {
  const [availabeWithdrawBalance, setAvailableWithdrawBalance] = useState(0)
  const [minimumAmountWithdrawBalance, setMinimumAmountWithdrawBalance] =
    useState(0)

  const { data: profitForReferralsQueryData, loading } = useQuery(
    GET_PROFIT_FOR_REFERRALS_REDICTS
  )

  const [commitCreateWithdrawRequest] = useMutation(
    MUTATION_CREATE_WITHDRAW_REQUEST
  )

  useEffect(() => {
    const profitForReferralsData =
      profitForReferralsQueryData?.getProfitForReferralsPredicts

    if (!profitForReferralsData) return

    setAvailableWithdrawBalance(
      profitForReferralsData.availableProfitAmountToWithdraw
    )
    setMinimumAmountWithdrawBalance(
      profitForReferralsData.minProfitAmountToWithdraw
    )
  }, [profitForReferralsQueryData?.getProfitForReferralsPredicts])

  const handleCreateWithdrawRequest = useCallback(async () => {
    if (
      availabeWithdrawBalance < minimumAmountWithdrawBalance ||
      availabeWithdrawBalance === 0
    ) {
      notificationStateVar({
        isOpen: true,
        type: 'warning',
        title: 'We can not proceed your request',
        description: `Minimum withdrawal amount is ${minimumAmountWithdrawBalance} tokens`
      })

      return
    }

    try {
      await commitCreateWithdrawRequest()

      notificationStateVar({
        isOpen: true,
        type: 'success',
        title: 'Withdraw request was succesfully created'
      })
    } catch {
      notificationStateVar({
        isOpen: true,
        type: 'error',
        title: 'Someting went wrong...',
        description: 'Withdraw request was not created, please try again later'
      })
    }
  }, [
    commitCreateWithdrawRequest,
    availabeWithdrawBalance,
    minimumAmountWithdrawBalance
  ])

  return {
    loading,
    handleCreateWithdrawRequest,
    availabeWithdrawBalance: availabeWithdrawBalance.toFixed(2)
  }
}
