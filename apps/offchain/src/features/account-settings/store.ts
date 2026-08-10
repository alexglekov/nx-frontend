import { makeVar } from '@apollo/client'
import { AccountSettingsTab } from './types'

export const accountSettingsActiveTabVar = makeVar<AccountSettingsTab>(
  AccountSettingsTab.PREFERENCE
)
