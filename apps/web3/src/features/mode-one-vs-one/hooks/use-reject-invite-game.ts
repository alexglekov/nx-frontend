import { useCallback } from 'react'
import { useExactPrice } from 'contracts/exact-price'
import { OneVsOneGameCustomType } from 'shared/types'
import { Web3Adress } from 'shared/types/web3'
import { zeroAddress } from 'viem'

export function useGame1vs1RejectInvite() {
  const exactPrice = useExactPrice()

  const cancelGame = useCallback(
    ({ id, contractAddress }: OneVsOneGameCustomType) => {
      if (!exactPrice) return

      return exactPrice.cancelGame({
        gameId: id as Web3Adress,
        contractAddress: (contractAddress as Web3Adress) || zeroAddress
      })
    },
    [exactPrice]
  )

  const commitCancelGame = useCallback(
    async (game: OneVsOneGameCustomType) => {
      if (!cancelGame) return

      await cancelGame(game)
    },
    [cancelGame]
  )

  return {
    commitCancelGame
  }
}
