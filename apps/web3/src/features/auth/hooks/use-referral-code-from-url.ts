import { useEffect } from 'react'
import { useQueryParams } from 'shared/hooks/use-query'
import { showNotificationToast } from 'shared/utils/notify'
import { isSignUpDialogOpenVar } from '../store/dialogs'
import {
  wizardFlowTypeVar,
  wizardModeVar,
  wizardStepVar
} from '../store/wizard.store'
import { WizardMode, WizardFlowType, WizardStep } from '../types'
import { resetWizardState } from '../utils/reset-wizard-state'
import { useCheckReferralCode } from './use-check-code'

export const useReferralCodeFromUrl = () => {
  const query = useQueryParams()
  const referralCode = query.get('referralCode') || ''

  const { checkCode } = useCheckReferralCode()

  useEffect(() => {
    if (!referralCode) return

    checkCode(referralCode).then(isAvailable => {
      if (!isAvailable)
        showNotificationToast({
          type: 'warning',
          title: 'Invalid referral code'
        })

      wizardModeVar(WizardMode.connectWallet)
      wizardFlowTypeVar(WizardFlowType.web3)
      wizardStepVar(WizardStep.init)
      isSignUpDialogOpenVar(true)
    })

    return () => {
      resetWizardState()
    }
  }, [checkCode, referralCode])
}
