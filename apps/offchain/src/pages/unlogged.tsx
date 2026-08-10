import { useCallback, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Card, Flex, Heading } from '@radix-ui/themes'
import {
  isSignInDialogOpenVar,
  isSignUpDialogOpenVar
} from 'features/auth/store/dialogs'
import { wizardModeVar } from 'features/auth/store/wizard.store'
import { WizardMode } from 'features/auth/types'
import { Head } from 'features/head'
import { useNavigate } from 'react-router-dom'
import { useResponsive } from 'shared/hooks/use-responsive'
import { InfoCircleIcon } from 'shared/icons'
import { userVar } from 'shared/store/user'

export const UnloggedPage: React.FC = () => {
  const user = useReactiveVar(userVar)
  const wizardMode = useReactiveVar(wizardModeVar)
  const navigate = useNavigate()
  const queryString = window.location.search

  const [isMobile] = useResponsive('xs')

  const openSignDialog = useCallback(() => {
    if (wizardMode === WizardMode.signIn) {
      isSignInDialogOpenVar(true)
      isSignUpDialogOpenVar(false)
    } else {
      isSignInDialogOpenVar(false)
      isSignUpDialogOpenVar(true)
    }
  }, [wizardMode])

  useEffect(() => {
    if (isMobile === null || isMobile) return

    wizardModeVar(WizardMode.signUp)
    openSignDialog()
  }, [isMobile])

  useEffect(() => {
    if (user) {
      navigate(`/${queryString}`, {
        replace: true
      })
    }
  }, [navigate, openSignDialog, queryString, user])

  return (
    <>
      <Head title='Please sign in' />
      <Card>
        <Flex
          direction={'column'}
          gap='4'
          height='100%'
          p='4'
          align='center'
        >
          <InfoCircleIcon
            height='6rem'
            width='6rem'
            color='var(--yellow)'
          />
          <Heading mb='3'>
            This page is available only to logged-in users
          </Heading>
        </Flex>
      </Card>
    </>
  )
}
