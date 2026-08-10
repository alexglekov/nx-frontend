import { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Grid, Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import { XyroDialog } from 'shared/ui'
import { isSignInDialogOpenVar } from '../store/dialogs'
import { wizardModeVar, wizardStepVar } from '../store/wizard.store'
import { WizardMode, WizardStep } from '../types'
import { resetWizardState } from '../utils/reset-wizard-state'
import { AuthDialogHeader } from './auth-wizard-extras/auth-dialog-header'
import { AuthDialogOpenButton } from './auth-wizard-extras/auth-dialog-open-button'
import { WizardWeb3SignIn } from './auth-wizard-steps/wizard-web3-sign-in'
import styles from '../sign-up.module.scss'
import { WizardStepInit } from './auth-wizard-steps/wizard-step-init'

const { signIn } = WizardMode
const { init } = WizardStep

// eslint-disable-next-line complexity
export const SignInDialog: React.FC = () => {
  const isDialogOpen = useReactiveVar(isSignInDialogOpenVar)
  const wizardMode = useReactiveVar(wizardModeVar)
  const wizardStep = useReactiveVar(wizardStepVar)
  const [isMobile] = useResponsive(['xs', 'sm'])

  const handleDialogOpenChange = useCallback((newIsOpen: boolean) => {
    isSignInDialogOpenVar(newIsOpen)

    // NOTE: switch to the SignIn mode on open
    const newWizardMode = newIsOpen ? WizardMode.signIn : null
    wizardModeVar(newWizardMode)

    // NOTE: reset the wizard step on close
    if (!newIsOpen) resetWizardState()
  }, [])

  const isSignInInit = wizardMode === signIn && wizardStep === init
  const isNotSignInInit = Boolean(wizardMode === signIn && wizardStep !== init)

  return (
    <XyroDialog
      open={isDialogOpen}
      onOpenChange={handleDialogOpenChange}
      className={cn(styles.dialogRoot, {
        [styles.doneStep]: wizardStep === WizardStep.done
      })}
      dialogTrigger={
        <AuthDialogOpenButton
          mode={WizardMode.signIn}
          dataTestID={DataTestIDs.buttonLoginHeader}
        >
          LOG IN
        </AuthDialogOpenButton>
      }
    >
      <Grid
        className={styles.dialogContainer}
        width={'100%'}
      >
        <Flex
          direction={'column'}
          width='100%'
          justify='center'
          align='center'
          px='6'
          pt={isMobile ? '7' : '7'}
          pb={isMobile ? '8' : '7'}
          gap='5'
        >
          {isSignInInit && <WizardStepInit mode='signin' />}

          {isNotSignInInit && (
            <>
              <AuthDialogHeader />

              <Flex
                width={'100%'}
                align={'center'}
                justify={'center'}
                gap={'2'}
              >
                <WizardWeb3SignIn />
              </Flex>
            </>
          )}
        </Flex>
      </Grid>
    </XyroDialog>
  )
}
