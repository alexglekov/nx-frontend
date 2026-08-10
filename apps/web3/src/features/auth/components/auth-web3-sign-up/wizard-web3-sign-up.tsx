import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { useVerifyWallet } from '../../hooks/use-verify-wallet'
import { wizardStepVar } from '../../store/wizard.store'
import { WizardStep } from '../../types'
import { WizardStepDone } from '../auth-wizard-steps/auth-wizard-step-done'
import { AuthWizardStepWalletConnect } from '../auth-wizard-steps/auth-wizard-step-wallet-connect'
import { WizardStepName } from './wizard-step-name'

export const WizardWeb3Signup: React.FC = () => {
  const wizardStep = useReactiveVar(wizardStepVar)
  const isWeb3Step = wizardStep === walletSelect || wizardStep === nftCheck

  const { verifyWallet, loading } = useVerifyWallet()

  useEffect(() => {
    // NOTE: effect to verify wallet on done step without button click
    if (wizardStep !== WizardStep.done) return
    verifyWallet()
  }, [verifyWallet, wizardStep])

  return (
    <Flex
      width={'100%'}
      align={'center'}
      justify={'center'}
      gap={'2'}
    >
      {isWeb3Step && <AuthWizardStepWalletConnect />}

      {wizardStep === name && <WizardStepName />}

      {wizardStep === done && (
        <WizardStepDone
          text='Now you have an account'
          loading={loading}
        />
      )}
    </Flex>
  )
}

const { name, walletSelect, nftCheck, done } = WizardStep
