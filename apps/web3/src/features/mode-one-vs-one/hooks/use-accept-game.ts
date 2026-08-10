import { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useExactPrice } from 'contracts/exact-price'
import { GTM_EVENTS } from 'shared/constants/gtm-events'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { notificationStateVar } from 'shared/store/notification'
import { userVar } from 'shared/store/user'
import { OneVsOneGameCustomType } from 'shared/types'
import { Web3Adress } from 'shared/types/web3'
import { pushGtmEvent } from 'shared/utils/push-gtm-event'

export function useGame1vs1Accept() {
  const user = useReactiveVar(userVar)
  const isUserPlayed = user?.hasPlayed || false

  const exactPrice = useExactPrice()

  const { smartContractAddress } = useGetSmartContract('XyroToken')

  const acceptGame = useCallback(
    (gameId: Web3Adress, amount: number, price?: number) => {
      if (!exactPrice) return

      return exactPrice.accept({
        amount: String(amount),
        gameId,
        opponentPrice: String(price)
      })
    },
    [exactPrice]
  )

  const commitBetTo1vs1 = useCallback(
    async (game: OneVsOneGameCustomType, price?: number) => {
      const { id } = game
      if (acceptGame) {
        const tx = await acceptGame(
          id as Web3Adress,
          game.ownerPredict.amount,
          price
        )

        if (!isUserPlayed) {
          pushGtmEvent(GTM_EVENTS.firstDepositSuccessful, {
            deposit_value: game.ownerPredict.amount,
            deposit_currency:
              game.token === smartContractAddress ? 'XYRO' : 'USDT',
            conversion_id: tx,
            userId: user?.id || ''
          })
        } else {
          pushGtmEvent(GTM_EVENTS.depositSuccessful, {
            deposit_value: game.ownerPredict.amount,
            deposit_currency:
              game.token === smartContractAddress ? 'XYRO' : 'USDT',
            conversion_id: tx,
            userId: user?.id || ''
          })
        }

        notificationStateVar({
          title: 'Game created',
          description: `New 1vs1 game for ${game.ownerPredict.amount}`,
          isOpen: true,
          type: 'success'
        })
      }
    },
    [acceptGame, smartContractAddress, isUserPlayed]
  )

  return {
    commitBetTo1vs1
  }
}
