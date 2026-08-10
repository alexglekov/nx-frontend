import { useCallback, useState } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { MUTATION_FORCE_APPROVE_BALANCE } from 'api/balance/mutation-force-approve-balance'
import { useTreasury } from 'contracts/treasury/hooks/use-treasury'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { Web3Adress } from 'shared/types'
import { showNotificationToast } from 'shared/utils/notify'
import { activeBalanceSwitchTypeVar } from '../store/switch-types'
import { ApprovedBalanceSwitchTypes } from '../types'

export const useClaimSubmit = (
  smartContractAddress: Web3Adress,
  smartContractVersion: number
) => {
  const [commitForceApproveBalanceSubscriptionUpdate] = useMutation(
    MUTATION_FORCE_APPROVE_BALANCE
  )

  const { smartContractAddress: xyroTokenAddress } =
    useGetSmartContract('XyroToken')
  const { smartContractAddress: usdcAddress } = useGetSmartContract('USDC')

  const [loading, setLoading] = useState(false)

  const treasury = useTreasury(smartContractAddress, smartContractVersion)
  const activeBalanceType = useReactiveVar(activeBalanceSwitchTypeVar)

  const handleClaim = useCallback(
    // eslint-disable-next-line max-statements
    async (amount: string) => {
      if (!treasury) return

      setLoading(true)

      showNotificationToast({
        title: 'Approve action in your wallet',
        type: 'info'
      })

      try {
        const token =
          activeBalanceType === ApprovedBalanceSwitchTypes.Tether ?
            usdcAddress
          : xyroTokenAddress

        const decimals =
          activeBalanceType === ApprovedBalanceSwitchTypes.Tether ? 6 : 18

        const currency =
          activeBalanceType === ApprovedBalanceSwitchTypes.Tether ?
            'USDT'
          : 'XYRO'

        const tx = await treasury.claimTreasury(amount, token, decimals)

        if (!tx) {
          return
        }

        showNotificationToast({
          title: `${amount}${currency} claimed`,
          type: 'success'
        })
      } catch (error) {
        console.error(error)
        showNotificationToast({
          title: `Something went wrong`,
          description: 'Please try again',
          type: 'error'
        })
      } finally {
        setLoading(false)
      }
    },
    [treasury, setLoading, activeBalanceType, usdcAddress, xyroTokenAddress]
  )

  const handleClaimOld = useCallback(
    // eslint-disable-next-line max-statements
    async (amount: string) => {
      if (!treasury) return

      setLoading(true)

      showNotificationToast({
        title: 'Approve action in your wallet',
        type: 'info'
      })

      try {
        const token =
          activeBalanceType === ApprovedBalanceSwitchTypes.Tether ?
            usdcAddress
          : xyroTokenAddress

        const tx = await treasury.claimOldTreasury(amount, token)

        if (!tx) {
          return
        }

        showNotificationToast({
          title: `${amount}USDT claimed`,
          type: 'success'
        })
      } catch (error) {
        console.error(error)
        showNotificationToast({
          title: `Something went wrong`,
          description: 'Please try again',
          type: 'error'
        })
      } finally {
        setLoading(false)
      }
    },
    [treasury, setLoading, activeBalanceType, usdcAddress, xyroTokenAddress]
  )

  return { handleClaim, handleClaimOld, loading }
}
