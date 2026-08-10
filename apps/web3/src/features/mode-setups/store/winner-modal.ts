import { makeVar } from '@apollo/client'
import {
  SetupsPredictFragment,
  SetupsGameFragment
} from '__generated__/graphql'

export const setupsWinnerModalGameVar = makeVar<SetupsGameFragment | null>(null)

export const setupsWinnerModalParticipantsListVar = makeVar<
  SetupsPredictFragment[] | null
>(null)
