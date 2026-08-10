import { Maybe } from 'shared/types'
import { WIZARD_STEPS_BY_MODE_MAP as WIZARD_STEPS_BY_MODE_MAP } from '../constants'
import { WizardFlowType, WizardMode, WizardStep } from '../types'

// eslint-disable-next-line max-statements, complexity
export function getWizardNextStep(
  wizardMode: Maybe<WizardMode>,
  flowType: WizardFlowType,
  currentStep: WizardStep
) {
  if (wizardMode === null) return null

  const currentStepsMap = WIZARD_STEPS_BY_MODE_MAP?.[wizardMode]?.[flowType]

  if (!currentStepsMap) return null

  const currentStepIndex = currentStepsMap?.indexOf(currentStep)

  if (currentStepIndex === -1) return currentStepsMap?.[0] || null

  const nextStep = currentStepsMap?.[currentStepIndex + 1]

  if (!nextStep) return null

  return nextStep
}
