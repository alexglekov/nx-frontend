import { makeVar } from '@apollo/client'
import { CreatedSetupsTableType } from '../constants'

export const createdSetupsTableTypeVar = makeVar<CreatedSetupsTableType>(
  CreatedSetupsTableType.Active
)
export const skipCreatedSetupsVar = makeVar<number>(0)
