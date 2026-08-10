import { CLAIM_BATCH_SIZE } from '../constants'

export const getClaimRakebackSetupBatches = (gameIds?: string[]) => {
  const data = gameIds || []
  const batches = []

  for (let i = 0; i < data.length; i += CLAIM_BATCH_SIZE) {
    const batch = data.slice(i, i + CLAIM_BATCH_SIZE)
    batches.push(batch)
  }

  return batches
}
