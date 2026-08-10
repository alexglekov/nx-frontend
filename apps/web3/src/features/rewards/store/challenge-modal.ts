import { makeVar } from '@apollo/client'
import { SeasonChallenge } from '__generated__/graphql'

export const challengeModalStateVar = makeVar<SeasonChallenge | null>(null)
