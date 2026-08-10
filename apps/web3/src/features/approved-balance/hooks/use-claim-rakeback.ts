import { useState } from 'react'
import { ApolloError, ApolloQueryResult } from '@apollo/client'
import { GetRakebackSummaryQuery } from '__generated__/graphql'
import { notificationStateVar } from 'shared/store/notification'
import { Web3Adress } from 'shared/types'
import { handleCatchAction } from 'shared/utils/handle-catch-action'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { useClaimRakebackBatches } from './use-claim-rakeback-batches'
import { useLoadAndPrepareBatches } from './use-load-and-prepare-batches'

export const useClaimRakeback = (
  total: number,
  refetch: () => Promise<ApolloQueryResult<GetRakebackSummaryQuery>>
) => {
  const [loading, setLoading] = useState(false)

  const disabled = loading || total === 0

  const { claimBatches } = useClaimRakebackBatches()

  const { loadAndPrepareBatches } = useLoadAndPrepareBatches()

  /* eslint-disable-next-line max-statements */
  const handleButtonClick = async () => {
    setLoading(true)

    try {
      const { batches, setupBatches } = await loadAndPrepareBatches()

      try {
        const tx = await claimBatches(batches, setupBatches as Web3Adress[][])

        if (tx?.some(t => !isNotNullOrUndef(t))) {
          return
        }

        notifyOnSuccess('Rakeback claimed successfully')
        refetch()
      } catch (error) {
        handleCatchAction(error)
      } finally {
        setLoading(false)
      }
    } catch (error: unknown) {
      notifyOnError((error as ApolloError).message)
    } finally {
      setLoading(false)
    }
  }

  return { handleButtonClick, loading, disabled }
}

const notifyOnError = (message: string) =>
  notificationStateVar({
    isOpen: true,
    title: 'Error',
    description: message,
    type: 'error'
  })

const notifyOnSuccess = (message: string) =>
  notificationStateVar({
    isOpen: true,
    title: 'Success',
    description: message,
    type: 'success'
  })
