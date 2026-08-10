import { makeVar } from '@apollo/client'
import { BetDirection } from '../types'

export const betAmountVar = makeVar<number>(1)
export const selectedBetVar = makeVar<BetDirection | null>(null)
