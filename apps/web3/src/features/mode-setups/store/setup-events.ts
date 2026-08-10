import { makeVar } from '@apollo/client'
import { Maybe } from '__generated__/graphql'

export const setupEventVar = makeVar<Maybe<any>>(null)
export const setupsFactoryEventVar = makeVar<Maybe<any>>(null)