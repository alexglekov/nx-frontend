import { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text, TextField } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { MAX_USER_NAME_LENGHT } from 'shared/constants/restrictive-units'
import { useValidateUserName } from 'shared/hooks/use-validate-user-name'
import { DotTitle } from 'shared/ui'
import { useCheckNames } from '../../hooks/use-check-name'
import {
  userNameVar,
  wizardFlowTypeVar,
  wizardModeVar,
  wizardStepVar
} from '../../store/wizard.store'
import { WizardStep } from '../../types'
import { getWizardNextStep } from '../../utils/get-wizard-next-step'
import { WizardSubmitButton } from '../wizard-submit-button'

// eslint-disable-next-line max-statements
export const WizardStepName: React.FC = () => {
  const { name, handleNameChange, isNameInvalid } = useValidateUserName()

  const flowType = useReactiveVar(wizardFlowTypeVar)
  const wizardMode = useReactiveVar(wizardModeVar)

  const { checkNames, loading } = useCheckNames()

  const handleSubmit = useCallback(async () => {
    const isNameAvailable = await checkNames(name)
    if (!isNameAvailable) return

    userNameVar(name)

    const nextStep = getWizardNextStep(wizardMode, flowType, WizardStep.name)
    wizardStepVar(nextStep || WizardStep.init)
  }, [checkNames, name, flowType, wizardMode])

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
        <Flex
          align={'center'}
          justify={'between'}
          width={'100%'}
        >
          <DotTitle>NAME</DotTitle>

          <Text
            size={'2'}
            weight={'medium'}
            className={cn('color-white', {
              ['color-pink']: isNameInvalid
            })}
          >
            {name.length}/{MAX_USER_NAME_LENGHT}
          </Text>
        </Flex>

        <TextField.Root
          onChange={handleNameChange}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          value={name}
          radius='large'
          type='text'
          size='3'
          data-testid={createNameInput}
        />
      </Flex>

      <WizardSubmitButton
        type='button'
        onClick={handleSubmit}
        isLoading={loading}
        disabled={name.length < 3}
        data-testid={buttonSaveCreatedName}
      >
        Continue
      </WizardSubmitButton>
    </Flex>
  )
}

const { createNameInput, buttonSaveCreatedName } = DataTestIDs
