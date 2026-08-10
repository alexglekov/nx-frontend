import { useCallback } from 'react'
import { PredictStatus } from '__generated__/graphql'
import { useSetupsContract } from 'contracts/setups/hooks/use-setups-contract'
import { Web3Adress } from 'shared/types'

export const useClaimRetrievedSetup = () => {
  const setups = useSetupsContract()

  const handleClaim = useCallback(
    (gameId: string, status: PredictStatus, contractAddress: Web3Adress) => {
      if (!setups) return

      const { retrieve, refund } = setups

      if (status === PredictStatus.Won) {
        retrieve(gameId as Web3Adress, contractAddress)
      }

      if (status === PredictStatus.Reject) {
        refund(gameId as Web3Adress, contractAddress)
      }
    },
    [setups]
  )

  return { handleClaim }
}
