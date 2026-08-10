import { useEffect, useMemo } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { useFragment } from '__generated__'
import {
  GetSetupsUserPredictsQuery,
  PredictStatus,
  SetupsPredictFragment,
  UserSetupPredictsChangedSubscription
} from '__generated__/graphql'
import {
  FRAGMENT_SETUPS_PREDICT,
  GET_SETUPS_USER_PREDICTS
} from 'api/mode-setups'
import { USER_SETUPS_PREDICT_CHANGED } from 'api/mode-setups/subscription-user-setups-predict-changed'
import { JOINED_SETUPS_TAKE_VAR, SetupsPredictsTableType } from '../constants'
import {
  joinedSetupsTableTypeVar,
  skipJoinedPredictsVar
} from '../store/joined-setups-store'

/* eslint-disable-next-line max-statements */
export function useJoinedSetupsLoader(skipLoading?: boolean) {
  const activeType = useReactiveVar(joinedSetupsTableTypeVar)
  const skip = useReactiveVar(skipJoinedPredictsVar)

  const filters = useMemo(() => {
    if (activeType === SetupsPredictsTableType.Current) {
      return { status: [PredictStatus.Open] }
    }

    if (activeType === SetupsPredictsTableType.Completed) {
      return {
        status: [PredictStatus.Loss, PredictStatus.Reject, PredictStatus.Won]
      }
    }

    return {
      status: [PredictStatus.Reject, PredictStatus.Won],
      isRetrieved: false
    }
  }, [activeType])

  const variables = {
    filters,
    pagination: {
      skip,
      take: JOINED_SETUPS_TAKE_VAR
    }
  }

  const { data, loading, error, refetch, subscribeToMore } =
    useQuery<GetSetupsUserPredictsQuery>(GET_SETUPS_USER_PREDICTS, {
      variables,
      fetchPolicy: 'cache-and-network',
      skip: skipLoading
    })

  const handleNewPredict = (
    prev: GetSetupsUserPredictsQuery,
    newPredict: SetupsPredictFragment,
    currentPredicts: SetupsPredictFragment[]
  ) => {
    return {
      ...prev,
      getUserSetupPredicts: {
        ...prev.getUserSetupPredicts,
        total: prev.getUserSetupPredicts.total + 1,
        predicts:
          skip === 0 ?
            currentPredicts.length < JOINED_SETUPS_TAKE_VAR ?
              [newPredict, ...currentPredicts]
            : [
                newPredict,
                ...currentPredicts.slice(0, currentPredicts.length - 1)
              ]
          : currentPredicts
      }
    }
  }

  useEffect(() => {
    if (skipLoading) return

    const unsubscribe = subscribeToMore<UserSetupPredictsChangedSubscription>({
      document: USER_SETUPS_PREDICT_CHANGED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.userSetupPredictsChanged) return prev

        // NOTE: Finish after subscription update
        const newPredict = subscriptionData.data
          .userSetupPredictsChanged as SetupsPredictFragment

        const currentPredicts = prev.getUserSetupPredicts
          .predicts as SetupsPredictFragment[]

        if (
          newPredict.status === PredictStatus.Open &&
          activeType === SetupsPredictsTableType.Current
        ) {
          return handleNewPredict(prev, newPredict, currentPredicts)
        }

        if (
          newPredict.status !== PredictStatus.Open &&
          activeType !== SetupsPredictsTableType.Current
        ) {
          refetch()
        }

        return prev
      }
    })

    return () => unsubscribe()
  }, [subscribeToMore, activeType])

  const result = useFragment(
    FRAGMENT_SETUPS_PREDICT,
    data?.getUserSetupPredicts?.predicts ?? []
  )

  const total = data?.getUserSetupPredicts?.total ?? 0

  return {
    result: [...result],
    total,
    error,
    loading,
    refetch
  }
}
