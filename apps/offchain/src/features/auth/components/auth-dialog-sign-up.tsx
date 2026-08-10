import { FC, useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Grid } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { XyroDialog } from 'shared/ui'
import { isSignUpDialogOpenVar } from '../store/dialogs'
import {
  wizardFlowTypeVar,
  wizardModeVar,
  wizardStepVar
} from '../store/wizard.store'
import { WizardFlowType, WizardMode, WizardStep } from '../types'
import { resetWizardState } from '../utils/reset-wizard-state'
import { AuthDialogHeader } from './auth-wizard-extras/auth-dialog-header'
import { AuthDialogOpenButton } from './auth-wizard-extras/auth-dialog-open-button'
import styles from '../sign-up.module.scss'
import { WizardStepInit } from './auth-wizard-steps/wizard-step-init'
import { WizardWeb3Signup } from './auth-wizard-steps/wizard-web3-sign-up'

const { web3, web3Nft } = WizardFlowType

const { signUp } = WizardMode
const { init } = WizardStep

// eslint-disable-next-line complexity, max-statements
export const AuthDialogSignUp: FC = () => {
  const isDialogOpen = useReactiveVar(isSignUpDialogOpenVar)
  const wizardMode = useReactiveVar(wizardModeVar)
  const wizardStep = useReactiveVar(wizardStepVar)
  const wizardFlowType = useReactiveVar(wizardFlowTypeVar)

  const isWeb3Flow = wizardFlowType === web3Nft || wizardFlowType === web3

  const handleDialogOpenChange = useCallback((newIsOpen: boolean) => {
    isSignUpDialogOpenVar(newIsOpen)

    // NOTE: switch to the SignUp mode only on open
    const newWizardMode = newIsOpen ? signUp : null
    wizardModeVar(newWizardMode)

    // NOTE: reset the wizard step on close
    if (!newIsOpen) resetWizardState()
  }, [])

  const isSignUpInit = wizardMode === signUp && wizardStep === init
  const isNotSignUpInit = Boolean(wizardMode === signUp && wizardStep !== init)

  return (
    <XyroDialog
      open={isDialogOpen}
      onOpenChange={handleDialogOpenChange}
      dialogTrigger={
        <AuthDialogOpenButton dataTestID={DataTestIDs.buttonHeaderGetStarted}>
          GET STARTED
        </AuthDialogOpenButton>
      }
      isCloseButtonEnabled
      className={styles.dialogRoot}
    >
      <Grid
        className={styles.dialogContainer}
        data-testid={DataTestIDs.signUpModal}
      >
        <Flex
          direction={'column'}
          width='100%'
          justify='center'
          align='center'
          px='6'
          pt={{ initial: '9', sm: '7' }}
          pb={{ initial: '9', sm: '7' }}
          gap='5'
        >
          {isSignUpInit && <WizardStepInit mode='signup' />}

          {isNotSignUpInit && (
            <>
              <AuthDialogHeader />

              {isWeb3Flow && <WizardWeb3Signup />}
            </>
          )}
        </Flex>
      </Grid>
    </XyroDialog>
  )
}
