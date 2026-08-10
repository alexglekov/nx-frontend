import { makeVar } from '@apollo/client'
import { AccountTab } from '../types'

export const accountActiveTabVar = makeVar<AccountTab>(AccountTab.MY_ACCOUNT)
