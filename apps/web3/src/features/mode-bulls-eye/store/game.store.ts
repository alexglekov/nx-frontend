import { makeVar } from '@apollo/client'
import { BullseyeGame } from '__generated__/graphql'
import { GameStateEnum } from 'shared/types'

export const bullsEyeGameStateVar = makeVar<GameStateEnum | null>(null)
export const bullsEyeGameVar = makeVar<BullseyeGame | null>(null)

export const isInviteAlertMessageShownVar = makeVar<boolean>(false)
