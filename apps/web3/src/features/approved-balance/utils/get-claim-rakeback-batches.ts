import { UserPendingRakebackGameFields } from '__generated__/graphql'
import { Web3Adress } from 'shared/types'
import { CLAIM_BATCH_SIZE } from '../constants'

export const getClaimRakebackBatches = (
  dataValues?: UserPendingRakebackGameFields[]
) => {
  const data = dataValues || []
  const batches = []

  for (let i = 0; i < data.length; i += CLAIM_BATCH_SIZE) {
    const batch = data.slice(i, i + CLAIM_BATCH_SIZE)
    const batchGameIds = batch.map(item => item.gameId as Web3Adress)
    const batchDepositIds = batch.map(item => BigInt(item.index))

    batches.push({ batchGameIds, batchDepositIds })
  }

  return batches
}
