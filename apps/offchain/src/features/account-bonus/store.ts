import { makeVar } from '@apollo/client'
import { AccountBonusTab, BonusStatusSelector } from './types'

export const accountBonusActiveTabVar = makeVar<AccountBonusTab>(
  AccountBonusTab.ACCOUNT_BONUSES
)

export const accountBonusStatusSelectorVar = makeVar<BonusStatusSelector>(
  BonusStatusSelector.AVAILABLE
)
