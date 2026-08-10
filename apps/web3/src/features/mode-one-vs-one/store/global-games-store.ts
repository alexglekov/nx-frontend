import { makeVar } from '@apollo/client'
import { OneVsOneGame } from '__generated__/graphql'
import { ONE_VS_ONE_OPEN_BETS_TYPES } from '../constants'

export const oneVsOneGlobalGamesVar = makeVar<OneVsOneGame[]>([])
export const oneVsOneGlobalGamesTotalVar = makeVar<number>(0)
export const oneVsOnePersonalGamesVar = makeVar<OneVsOneGame[]>([])
export const oneVsOnePersonalGamesTotalVar = makeVar<number>(0)
export const oneVsOneOpenGamesSkipVar = makeVar<number>(0)
export const oneVsOneOpenBetsTableTypeVar = makeVar<string>(
  ONE_VS_ONE_OPEN_BETS_TYPES.GLOBAL
)
