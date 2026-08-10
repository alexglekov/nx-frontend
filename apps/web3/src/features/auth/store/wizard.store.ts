import { makeVar } from '@apollo/client'
import { WizardMode, WizardFlowType, WizardStep } from '../types'

export const referrerIdVar = makeVar<string | null>(null)

export const userNameVar = makeVar<string | null>(null)

export const wizardModeVar = makeVar<WizardMode | null>(null)
export const wizardFlowTypeVar = makeVar<WizardFlowType>(WizardFlowType.none)
export const wizardStepVar = makeVar<WizardStep>(WizardStep.init)

// TODO: combine this vars into an object
export const walletAddressVar = makeVar<string | null>(null)
export const walletSignatureVar = makeVar<string | null>(null)

export const isUserDetectedRegisteredVar = makeVar<boolean>(false)
