import { useCallback, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, TextField } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { DotTitle } from 'shared/ui'
import { useCheckReferralCode } from '../../hooks/use-check-code'
import {
  wizardFlowTypeVar,
  wizardModeVar,
  wizardStepVar
} from '../../store/wizard.store'
import { WizardStep } from '../../types'
import { getWizardNextStep } from '../../utils/get-wizard-next-step'
import { WizardSubmitButton } from '../wizard-submit-button'

export const WizardStepReferralCode: React.FC = () => {
  const [code, setCode] = useState('')

  const wizardFlowType = useReactiveVar(wizardFlowTypeVar)
  const wizardMode = useReactiveVar(wizardModeVar)

  const { checkCode, loading } = useCheckReferralCode()

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value)
  }

  const handleSubmit = useCallback(async () => {
    if (code?.length < 3) return

    const isAvailable = await checkCode(code)
    if (!isAvailable) return

    const nextStep = getWizardNextStep(
      wizardMode,
      wizardFlowType,
      WizardStep.referral
    )
    nextStep && wizardStepVar(nextStep)
  }, [code, checkCode, wizardFlowType, wizardMode])

  return (
    <Flex
      direction='column'
      justify='center'
      align='center'
      width='100%'
      gap={'2'}
    >
      <Flex
        direction={'column'}
        gap={'1'}
        my={'3'}
        width={'100%'}
      >
        <DotTitle>CODE</DotTitle>

        <TextField.Root
          onChange={handleValueChange}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          value={code}
          radius='large'
          type='text'
          size='3'
          data-testid={DataTestIDs.refferalCodeInput}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      </Flex>

      <WizardSubmitButton
        onClick={handleSubmit}
        disabled={code.length < 3}
        isLoading={loading}
        type='button'
        data-testid={DataTestIDs.buttonContinue}
      >
        Continue
      </WizardSubmitButton>
    </Flex>
  )
}
