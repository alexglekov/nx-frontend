import { makeVar } from '@apollo/client'
import { TermsDialogTab } from '../constants'

export const isTermsDialogOpenVar = makeVar(false)
export const termsTabVar = makeVar<TermsDialogTab>(
  TermsDialogTab.TermsAndConditions
)
