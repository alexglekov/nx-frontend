import { makeVar } from '@apollo/client'
import { MeFragment } from '__generated__/graphql'
import { Maybe } from 'shared/types'

export const userVar = makeVar<Maybe<MeFragment>>(null)
export const isUserAccessDeniedVar = makeVar<boolean>(false)
export const isUserAuthLoadingVar = makeVar<boolean>(false)
