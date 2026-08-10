import { Maybe } from '__generated__/graphql'
import { useSetupsContract } from 'contracts/setups/hooks/use-setups-contract'
import { useTreasury } from 'contracts/treasury/hooks/use-treasury'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { notificationStateVar } from 'shared/store/notification'
import { Web3Adress } from 'shared/types'

export const useClaimRakebackBatches = () => {
  const { smartContractAddress, smartContractVersion } =
    useGetSmartContract('Treasury')

  const treasury = useTreasury(smartContractAddress, smartContractVersion)
  const setups = useSetupsContract()

  /* eslint-disable-next-line max-statements */
  const claimBatches = (
    gamesBatches: { batchGameIds: Web3Adress[]; batchDepositIds: bigint[] }[],
    setupBatches: Web3Adress[][]
  ) => {
    if (!treasury || !setups) {
      notifyOnError('Error: Please, connect or reconnect wallet')
      return
    }

    const { claimRakebackBatch } = treasury

    const { retrieveSetupsBatch } = setups

    const promiseArr: Promise<Maybe<Web3Adress>>[] = []

    if (gamesBatches.length > 0) {
      gamesBatches.forEach(({ batchGameIds, batchDepositIds }) => {
        promiseArr.push(claimRakebackBatch(batchGameIds, batchDepositIds))
      })
    }

    if (setupBatches.length > 0) {
      setupBatches.forEach(batchGameIds => {
        promiseArr.push(retrieveSetupsBatch(batchGameIds))
      })
    }

    return Promise.all(promiseArr)
  }

  return { claimBatches }
}

const notifyOnError = (message: string) =>
  notificationStateVar({
    isOpen: true,
    title: 'Error',
    description: message,
    type: 'error'
  })
