import { makeVar } from '@apollo/client'
import { AccountSection } from '../types'

export const accountActiveSectionVar = makeVar<AccountSection>(
  AccountSection.ACCOUNT
)
