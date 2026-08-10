import { useLazyQuery, useReactiveVar } from '@apollo/client'
import {
  GetUserPendingRakebackGamesQuery,
  GetUserPendingSetupGamesQuery
} from '__generated__/graphql'
import { GET_USER_PENDING_RAKEBACK_GAMES } from 'api/balance/get-user-pending-rakeback-games'
import { GET_USER_PENDING_SETUP_GAMES } from 'api/balance/get-user-pending-setup-games'
import { notificationStateVar } from 'shared/store/notification'
import { userVar } from 'shared/store/user'
import { getClaimRakebackBatches } from '../utils/get-claim-rakeback-batches'
import { getClaimRakebackSetupBatches } from '../utils/get-claim-rakeback-setup-batches'

export const useLoadAndPrepareBatches = () => {
  const user = useReactiveVar(userVar)

  const [loadUserPendingRakebackGames] =
    useLazyQuery<GetUserPendingRakebackGamesQuery>(
      GET_USER_PENDING_RAKEBACK_GAMES
    )

  const [loadUserPendingSetupGames] =
    useLazyQuery<GetUserPendingSetupGamesQuery>(GET_USER_PENDING_SETUP_GAMES)

  const loadAndPrepareBatches = async () => {
    if (!user) {
      notifyOnError('Error: Please, connect or reconnect wallet')
      return { batches: [], setupBatches: [] }
    }

    const queryResult = await loadUserPendingRakebackGames({
      variables: { userId: user.id }
    })

    const setupsQueryResult = await loadUserPendingSetupGames({
      variables: { userId: user.id }
    })

    const batches = getClaimRakebackBatches(
      queryResult.data?.getUserPendingRakebackGames
    )

    const setupBatches = getClaimRakebackSetupBatches(
      setupsQueryResult.data?.getUserPendingSetupGames
    )

    return { batches, setupBatches }
  }

  return { loadAndPrepareBatches }
}

const notifyOnError = (message: string) =>
  notificationStateVar({
    isOpen: true,
    title: 'Error',
    description: message,
    type: 'error'
  })
