import { GameModeType } from 'shared/types'
import { ONBOARDING_GAME_MODES } from './constants'

export const getOnboardingDataByMode = (mode: GameModeType) => {
  return ONBOARDING_GAME_MODES[mode] || null
}
