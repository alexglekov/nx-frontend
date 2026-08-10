import {
  WIZARD_STATE_TO_SUBTITLE_MAP,
  WIZARD_STATE_TO_TITLE_MAP
} from '../constants'
import { WizardMode, WizardStep } from '../types'

const { signUp } = WizardMode

export function getTitleByWizardState(
  step: WizardStep,
  mode: WizardMode | null
) {
  return WIZARD_STATE_TO_TITLE_MAP?.[mode || signUp]?.[step]
}

export function getSubtitleByWizardState(
  step: WizardStep,
  mode: WizardMode | null
) {
  return WIZARD_STATE_TO_SUBTITLE_MAP?.[mode || signUp]?.[step]
}
