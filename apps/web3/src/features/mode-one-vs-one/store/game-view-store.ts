import { makeVar } from '@apollo/client'
import { OneVsOneGameType } from '__generated__/graphql'
import { Maybe } from 'shared/types'

export const gameIdViewVar = makeVar<Maybe<string>>(null)
export const gameTypeViewVar = makeVar<Maybe<OneVsOneGameType>>(null)
