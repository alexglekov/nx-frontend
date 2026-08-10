import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useVerifyWallet } from '../../hooks/use-verify-wallet'
import { wizardStepVar } from '../../store/wizard.store'
import { WizardStep } from '../../types'
import { WizardStepName } from '../auth-web3-sign-up/wizard-step-name'
import { WizardStepDone } from '../auth-wizard-steps/auth-wizard-step-done'
import { AuthWizardStepWalletConnect } from '../auth-wizard-steps/auth-wizard-step-wallet-connect'

export const WizardWeb3ConnectWallet: React.FC = () => {
  const wizardStep = useReactiveVar(wizardStepVar)

  const { verifyWallet, loading } = useVerifyWallet()

  useEffect(() => {
    // NOTE: effect to verify wallet on done step without button click
    if (wizardStep !== WizardStep.done) return
    verifyWallet()
  }, [verifyWallet, wizardStep])

  return (
    <>
      {/* TODO: remove duplicated render of WizardStepWalletConnect via WizardStep.init step */}
      {wizardStep === init && <AuthWizardStepWalletConnect />}

      {wizardStep === name && <WizardStepName />}

      {wizardStep === done && (
        <WizardStepDone
          text='Welcome back'
          loading={loading}
        />
      )}
    </>
  )
}

const { init, done, name } = WizardStep
