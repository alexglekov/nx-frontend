import { useCallback, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useTreasury } from 'contracts/treasury/hooks/use-treasury'
import { GTM_EVENTS } from 'shared/constants/gtm-events'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { userVar } from 'shared/store/user'
import { handleCatchAction } from 'shared/utils/handle-catch-action'
import { showNotificationToast } from 'shared/utils/notify'
import { pushGtmEvent } from 'shared/utils/push-gtm-event'
import { parseUnits } from 'viem'
import { activeBalanceSwitchTypeVar } from '../store/switch-types'
import { ApprovedBalanceSwitchTypes } from '../types'

/* eslint-disable-next-line max-statements */
export const useDepositSubmit = () => {
  const user = useReactiveVar(userVar)
  const isUserPlayed = user?.hasPlayed || false

  const [loading, setLoading] = useState(false)
  const { smartContractAddress, smartContractVersion } =
    useGetSmartContract('Treasury')

  const { smartContractAddress: usdcAddress } = useGetSmartContract('USDC')
  const { smartContractAddress: xyroTokenAddress } =
    useGetSmartContract('XyroToken')

  const treasury = useTreasury(smartContractAddress, smartContractVersion)

  const activeBalanceType = useReactiveVar(activeBalanceSwitchTypeVar)

  const token =
    activeBalanceType === ApprovedBalanceSwitchTypes.Tether ?
      usdcAddress
    : xyroTokenAddress
  const decimals =
    activeBalanceType === ApprovedBalanceSwitchTypes.Tether ? 6 : 18

  const handleDeposit = useCallback(
    // eslint-disable-next-line max-statements
    async (amount: string) => {
      if (!treasury) return

      setLoading(true)

      const { depositAmount } = treasury

      try {
        const tx = await depositAmount(parseUnits(amount, decimals), token)

        if (!tx) {
          return
        }

        if (!isUserPlayed) {
          pushGtmEvent(GTM_EVENTS.firstDepositSuccessful, {
            deposit_value: amount,
            deposit_currency: token === xyroTokenAddress ? 'XYRO' : 'USDT',
            conversion_id: tx,
            userId: user?.id || ''
          })
        } else {
          pushGtmEvent(GTM_EVENTS.depositSuccessful, {
            deposit_value: amount,
            deposit_currency: token === xyroTokenAddress ? 'XYRO' : 'USDT',
            conversion_id: tx,
            userId: user?.id || ''
          })
        }

        showNotificationToast({
          title: `${amount}USDT deposited`,
          type: 'success'
        })
      } catch (err) {
        handleCatchAction(err)
      } finally {
        setLoading(false)
      }
    },
    [treasury, decimals, token, xyroTokenAddress, isUserPlayed]
  )

  return { handleDeposit, loading }
}
