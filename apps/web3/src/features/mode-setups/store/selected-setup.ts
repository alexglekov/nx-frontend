import { makeVar } from '@apollo/client'
import { SetupsGameFragment } from '__generated__/graphql'
import { Maybe } from 'shared/types'

export const selectedSetupVar = makeVar<Maybe<SetupsGameFragment>>(null)
