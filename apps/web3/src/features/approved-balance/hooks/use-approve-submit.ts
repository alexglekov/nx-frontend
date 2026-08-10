import { useCallback, useState } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { MUTATION_FORCE_APPROVE_BALANCE } from 'api/balance/mutation-force-approve-balance'
import { useUsdc } from 'contracts/usdc'
import { useXyroToken } from 'contracts/xyro-token/use-xyro-token'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { showNotificationToast } from 'shared/utils/notify'
import { activeBalanceSwitchTypeVar } from '../store/switch-types'
import { ApprovedBalanceSwitchTypes } from '../types'

export const useApproveSubmit = () => {
  const [commitForceApproveBalanceSubscriptionUpdate] = useMutation(
    MUTATION_FORCE_APPROVE_BALANCE
  )

  const activeBalanceType = useReactiveVar(activeBalanceSwitchTypeVar)

  const { smartContractAddress: treasuryAddress } =
    useGetSmartContract('Treasury')

  const [loading, setLoading] = useState(false)

  const usdc = useUsdc()
  const xyroToken = useXyroToken()

  /* eslint-disable max-statements */
  const handleApprove = useCallback(
    async (amount: string) => {
      if (!usdc || !xyroToken) return

      setLoading(true)
      showNotificationToast({
        title: 'Approve action in your wallet',
        type: 'info'
      })
      try {
        let result

        if (activeBalanceType === ApprovedBalanceSwitchTypes.Tether) {
          result = await usdc.approveAmount(Number(amount))
        } else {
          result = await xyroToken.approveAmount({
            amount: Number(amount),
            spender: treasuryAddress
          })
        }

        await commitForceApproveBalanceSubscriptionUpdate()

        if (!result) return

        const tokenName =
          activeBalanceType === ApprovedBalanceSwitchTypes.Tether ?
            'USDT'
          : 'XYRO'

        showNotificationToast({
          title: `${amount} ${tokenName} approved`,
          type: 'success'
        })
      } catch (error) {
        showNotificationToast({
          title: `Something went wrong`,
          description: 'Please try again',
          type: 'error'
        })
      } finally {
        setLoading(false)
      }
    },
    [
      usdc,
      setLoading,
      commitForceApproveBalanceSubscriptionUpdate,
      xyroToken,
      activeBalanceType,
      treasuryAddress
    ]
  )

  return { loading, handleApprove }
}
