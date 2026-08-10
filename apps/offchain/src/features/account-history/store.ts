import { makeVar } from '@apollo/client'
import { AccountHistoryTab } from './types'

export const accountHistoryActiveTabVar = makeVar<AccountHistoryTab>(
  AccountHistoryTab.DEPOSIT
)
