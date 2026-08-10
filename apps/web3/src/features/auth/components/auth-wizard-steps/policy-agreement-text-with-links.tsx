import { useCallback } from 'react'
import { Button } from '@radix-ui/themes'
import { TermsDialogTab } from 'features/terms-dialog/constants'
import {
  isTermsDialogOpenVar,
  termsTabVar
} from 'features/terms-dialog/store/dialog'
import { RadixText } from 'shared/ui'

export const PolicyAgreementTextWithLinks = ({}) => {
  const openTermsDialog = useCallback(() => {
    isTermsDialogOpenVar(true)
    termsTabVar(TermsDialogTab.TermsAndConditions)
  }, [])

  const openPrivacyDialog = useCallback(() => {
    isTermsDialogOpenVar(true)
    termsTabVar(TermsDialogTab.PrivacyPolicy)
  }, [])

  return (
    <RadixText
      size='2'
      align='center'
      color='gray'
    >
      By connecting your wallet, you agree to our
      <br />
      <Button
        onClick={openTermsDialog}
        color='green'
        mx='2'
        variant='ghost'
      >
        Terms of Service
      </Button>
      and our
      <Button
        onClick={openPrivacyDialog}
        color='green'
        mx='2'
        variant='ghost'
      >
        Privacy Policy
      </Button>
    </RadixText>
  )
}
