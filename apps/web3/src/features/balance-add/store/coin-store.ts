import { makeVar } from '@apollo/client'
import { CoinType } from '../types'

export const coinDepositVar = makeVar<CoinType | null>(null)
export const depositAmountVar = makeVar(0)
