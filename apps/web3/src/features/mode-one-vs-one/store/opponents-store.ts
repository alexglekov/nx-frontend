import { makeVar } from '@apollo/client'
import { User } from '__generated__/graphql'

export const opponentsVar = makeVar<User[]>([])

export const choosenOpponentVar = makeVar<User | null>(null)
