import { makeVar } from '@apollo/client'
import { UpDownGame } from '__generated__/graphql'
import { GameStateEnum } from 'shared/types'

export const upDownGameVar = makeVar<UpDownGame | null>(null)
export const upDownGameStateVar = makeVar<GameStateEnum | null>(null)
export const historyVar = makeVar<UpDownGame[] | null>([])

export const upDownButtonsPendingVar = makeVar<boolean>(false)
