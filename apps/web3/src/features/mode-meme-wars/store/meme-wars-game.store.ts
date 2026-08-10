import { makeVar } from '@apollo/client'
import { RaceGame } from '__generated__/graphql'
import { GameStateEnum } from 'shared/types'

export const memeWarsGameVar = makeVar<RaceGame | null>(null)
export const memeWarsGameStateVar = makeVar<GameStateEnum | null>(null)
