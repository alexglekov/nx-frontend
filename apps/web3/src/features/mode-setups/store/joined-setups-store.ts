import { makeVar } from '@apollo/client'
import { SetupPredict } from '__generated__/graphql'
import { SetupsPredictsTableType } from '../constants'

export const joinedSetupsTableTypeVar = makeVar<SetupsPredictsTableType>(
  SetupsPredictsTableType.Current
)
export const joinedPredictsVar = makeVar<SetupPredict[]>([])
export const completedPredictsVar = makeVar<SetupPredict[]>([])
export const skipJoinedPredictsVar = makeVar<number>(0)
export const joinedPredictsTotalVar = makeVar<number>(0)
export const completedPredictsTotalVar = makeVar<number>(0)
