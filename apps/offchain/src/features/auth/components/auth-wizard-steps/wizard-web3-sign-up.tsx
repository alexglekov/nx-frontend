import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { wizardStepVar } from 'features/auth/store/wizard.store'
import { useVerifyWallet } from 'features/auth/hooks/use-verify-wallet'
import { WizardStep } from 'features/auth/types'
import { AuthWizardStepWalletConnect } from './auth-wizard-step-wallet-connect'
import { WizardStepDone } from './auth-wizard-step-done'

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
