import { Maybe } from 'shared/types'
import {
  isUserDetectedRegisteredVar,
  wizardFlowTypeVar,
  wizardModeVar,
  wizardStepVar
} from '../store/wizard.store'
import { WizardFlowType, WizardMode, WizardStep } from '../types'
import { cleanAuthSessionStorage } from './clean-auth-session-storage'

export function resetWizardState(
  wizardMode: Maybe<WizardMode> = WizardMode.signIn
) {
  wizardStepVar(WizardStep.init)
  wizardFlowTypeVar(WizardFlowType.none)
  wizardModeVar(wizardMode)
  isUserDetectedRegisteredVar(false)

  cleanAuthSessionStorage()
}
