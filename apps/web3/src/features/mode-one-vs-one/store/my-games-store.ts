import { makeVar } from '@apollo/client'
import { OneVsOneGame } from '__generated__/graphql'
import { ONE_VS_ONE_MY_BETS_TYPES } from '../constants'

export const oneVsOneCurrentGamesVar = makeVar<OneVsOneGame[]>([])
export const oneVsOneCurrentGamesTotalVar = makeVar<number>(0)
export const oneVsOneClosedGamesVar = makeVar<OneVsOneGame[]>([])
export const oneVsOneClosedGamesTotalVar = makeVar<number>(0)
export const oneVsOneExpiredGamesVar = makeVar<OneVsOneGame[]>([])
export const oneVsOneExpiredGamesTotalVar = makeVar<number>(0)
export const oneVsOneMyGamesSkipVar = makeVar<number>(0)
export const oneVsOneMyGamesTableTypeVar = makeVar<string>(
  ONE_VS_ONE_MY_BETS_TYPES.CURRENT
)
