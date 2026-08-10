import { FC, useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Grid } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import authBgImage from 'shared/images/auth-bg-image.jpg'
import authBgVideo from 'shared/images/auth-bg-video.mp4'
import { XyroDialog } from 'shared/ui'
import { isSignUpDialogOpenVar } from '../store/dialogs'
import {
  wizardFlowTypeVar,
  wizardModeVar,
  wizardStepVar
} from '../store/wizard.store'
import { WizardFlowType, WizardMode, WizardStep } from '../types'
import { resetWizardState } from '../utils/reset-wizard-state'
import { AuthDialogFooter } from './auth-dialog-footer'
import { AuthDialogHeader } from './auth-dialog-header'
import { AuthDialogOpenButton } from './auth-dialog-open-button'
import { WizardStepInit } from './auth-web3-sign-up/wizard-step-init'
import { WizardStepReferralCode } from './auth-web3-sign-up/wizard-step-referral-code'
import { WizardWeb3Signup } from './auth-web3-sign-up/wizard-web3-sign-up'
import styles from '../sign-up.module.scss'

const { web3, web3Nft } = WizardFlowType

const { signUp } = WizardMode
const { init, referral } = WizardStep

// eslint-disable-next-line complexity, max-statements
export const AuthDialogSignUp: FC = () => {
  const isDialogOpen = useReactiveVar(isSignUpDialogOpenVar)
  const wizardMode = useReactiveVar(wizardModeVar)
  const wizardStep = useReactiveVar(wizardStepVar)
  const wizardFlowType = useReactiveVar(wizardFlowTypeVar)

  const [isMobile] = useResponsive(['xs', 'sm'])

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
  const isNotSignUpInit = wizardMode === signUp && wizardStep !== init

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
        {!isMobile ?
          <video
            className={styles.authBgVideo}
            src={authBgVideo}
            poster={authBgImage}
            controls={false}
            autoPlay
            muted
            loop
          />
        : null}

        <Flex
          className={styles.authDialogFormSection}
          direction={'column'}
          width='auto'
          justify='center'
          align='center'
          px='9'
          pt={{ initial: '9', sm: '2' }}
          pb={{ initial: '9', sm: '7' }}
          gap='5'
        >
          {isSignUpInit && <WizardStepInit />}

          {isNotSignUpInit ?
            <>
              <AuthDialogHeader />

              {/* NOTE: init auth steps */}
              {wizardStep === referral && <WizardStepReferralCode />}

              {isWeb3Flow && <WizardWeb3Signup />}

              <AuthDialogFooter
                questionText='Already have an account?'
                actonText='Log In'
              />
            </>
          : null}
        </Flex>
      </Grid>
    </XyroDialog>
  )
}
