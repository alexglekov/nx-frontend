import React from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { RadixText } from 'shared/ui'
import { isSignInDialogOpenVar, isSignUpDialogOpenVar } from '../store/dialogs'
import { wizardModeVar, wizardStepVar } from '../store/wizard.store'
import { WizardMode, WizardStep } from '../types'

interface Props {
  questionText: string
  actonText: string
}
export const AuthDialogFooter: React.FC<Props> = ({
  questionText,
  actonText
}) => {
  const wizardMode = wizardModeVar()

  const handleModeSwitch = () => {
    wizardStepVar(WizardStep.init)

    wizardMode && toggleAuthDialogMode(wizardMode)

    wizardMode === WizardMode.signIn && isSignUpDialogOpenVar(true)
    wizardMode === WizardMode.signUp && isSignInDialogOpenVar(true)
  }

  // TODO: Implement back button
  // const handleBack = () => {
  //   const prevStep = getPrevStep(wizardStepVar())
  //   wizardStepVar(prevStep)
  // }

  return (
    <Flex
      width={'100%'}
      align={'center'}
      justify={'center'}
      mt={'4'}
      direction={'column'}
    >
      <RadixText
        size={'4'}
        className={'color-gray'}
      >
        {questionText}
      </RadixText>

      <Button
        onClick={handleModeSwitch}
        color='gray'
        size='3'
        mx={'2'}
        variant='ghost'
        highContrast
      >
        <RadixText weight={'bold'}>{actonText}</RadixText>
      </Button>

      {/* TODO: Implement back button */}
      {/* <RadixText>
        Go to previous step
        <Link
          mx='2'
          onClick={handleBack}
        >
          <ArrowLeftIcon />
        </Link>
      </RadixText> */}
    </Flex>
  )
}

function toggleAuthDialogMode(currentMode: WizardMode) {
  if (currentMode === WizardMode.signIn) {
    wizardModeVar(WizardMode.signUp)
    isSignInDialogOpenVar(false)
    isSignUpDialogOpenVar(true)
  }

  if (currentMode === WizardMode.signUp) {
    wizardModeVar(WizardMode.signIn)
    isSignInDialogOpenVar(true)
    isSignUpDialogOpenVar(false)
  }
}
