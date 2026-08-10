import { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Grid, Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import authBgImage from 'shared/images/auth-bg-image.jpg'
import authBgVideo from 'shared/images/auth-bg-video.mp4'
import { XyroDialog } from 'shared/ui'
import { isSignInDialogOpenVar } from '../store/dialogs'
import { wizardModeVar, wizardStepVar } from '../store/wizard.store'
import { WizardMode, WizardStep } from '../types'
import { resetWizardState } from '../utils/reset-wizard-state'
import { AuthDialogFooter } from './auth-dialog-footer'
import { AuthDialogHeader } from './auth-dialog-header'
import { AuthDialogOpenButton } from './auth-dialog-open-button'
import { WizardWeb3SignIn } from './auth-web3-sign-in/wizard-web3-sign-in'
import styles from '../sign-up.module.scss'

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

  return (
    <XyroDialog
      open={isDialogOpen}
      onOpenChange={handleDialogOpenChange}
      className={cn(styles.dialogRoot, styles.dialogRootSignIn, {
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
      <Grid className={styles.dialogContainer}>
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
          pt={isMobile ? '7' : '2'}
          pb={isMobile ? '8' : '7'}
          gap='5'
        >
          {wizardMode === WizardMode.signIn ?
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

              <AuthDialogFooter
                questionText="Don't have an account?"
                actonText='Create one'
              />
            </>
          : null}
        </Flex>
      </Grid>
    </XyroDialog>
  )
}
