import { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { featureFlags } from 'app/app-feature-flags'
import { Web3Icon } from 'shared/icons'
import { RadixText } from 'shared/ui'
import {
  wizardModeVar,
  wizardFlowTypeVar,
  wizardStepVar
} from '../store/wizard.store'
import { WizardFlowType, WizardStep } from '../types'
import { getWizardNextStep } from '../utils/get-wizard-next-step'
import { AuthButton } from './auth-buttons'
const isWalletDisabled = !featureFlags.auth.isWalletAllowed

export const AuthButtonWeb3: React.FC = () => {
  const wizardMode = useReactiveVar(wizardModeVar)
  const wizardStep = useReactiveVar(wizardStepVar)

  const handleClick = useCallback(() => {
    const nextStep = getWizardNextStep(
      wizardMode,
      WizardFlowType.web3,
      wizardStep
    )
    wizardStepVar(nextStep || WizardStep.init)
    wizardFlowTypeVar(WizardFlowType.web3)
  }, [wizardMode, wizardStep])

  return (
    <Flex
      direction='column'
      gap='2'
      width={'100%'}
    >
      <AuthButton
        onClick={handleClick}
        disabled={isWalletDisabled}
      >
        <Web3Icon
          width={'6rem'}
          height={'6rem'}
          className={'color-pink'}
        />
      </AuthButton>

      <RadixText
        unselectable={'on'}
        align={'center'}
        size={'3'}
      >
        WEB 3.0
      </RadixText>
    </Flex>
  )
}
