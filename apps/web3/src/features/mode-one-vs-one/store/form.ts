import { makeVar } from '@apollo/client'
import { ONE_VS_ONE_CREATE_FORM_INITIAL_STATE } from '../constants'
import { OneVsOneCreateFormState } from '../types'

export const oneVsOneCreateFormStateVar = makeVar<OneVsOneCreateFormState>(
  ONE_VS_ONE_CREATE_FORM_INITIAL_STATE
)
