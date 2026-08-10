import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { DotTitle } from 'shared/ui'
import { wizardModeVar, wizardStepVar } from '../store/wizard.store'
import { WizardMode } from '../types'
import {
  getSubtitleByWizardState,
  getTitleByWizardState
} from '../utils/get-titles'

interface Props {
  withAuthMode?: boolean
}
export const AuthDialogHeader: FC<Props> = ({ withAuthMode = true }) => {
  const wizardStep = useReactiveVar(wizardStepVar)
  const wizardMode = useReactiveVar(wizardModeVar)

  const title = getTitleByWizardState(wizardStep, wizardMode)
  const secondaryTitle = getSubtitleByWizardState(wizardStep, wizardMode)
  const authMode =
    (wizardMode === WizardMode.signUp && 'Sign Up') ||
    (wizardMode === WizardMode.signIn && 'Sign In') ||
    (wizardMode === WizardMode.connectWallet && 'Connect Wallet') ||
    null

  return (
    <Flex
      direction={'column'}
      align={'center'}
      gap={'2'}
    >
      {withAuthMode && (
        <DotTitle
          color='gray'
          size='3'
        >
          {authMode}
        </DotTitle>
      )}

      <Heading
        className={'color-white'}
        as={'h3'}
        size={'7'}
        mt='-2'
        weight={'medium'}
        align={'center'}
      >
        {title}
      </Heading>

      {secondaryTitle ?
        <Text
          size={'5'}
          weight={'regular'}
          align={'center'}
        >
          {secondaryTitle}
        </Text>
      : null}
    </Flex>
  )
}
