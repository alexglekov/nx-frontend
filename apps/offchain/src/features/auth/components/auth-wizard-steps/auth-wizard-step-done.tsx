import { Flex } from '@radix-ui/themes'
import { OperationSuccessIcon } from 'shared/icons'
import { XyroLoadingSpinner } from 'shared/ui'
import { WizardSubmitButton } from '../auth-wizard-extras/wizard-submit-button'

interface Props {
  text: string
  loading?: boolean
}
export const WizardStepDone: React.FC<Props> = ({ text, loading }) => {
  return (
    <Flex
      direction='column'
      justify='center'
      align='center'
      gap={'2'}
      width='100%'
    >
      <OperationSuccessIcon />

      <WizardSubmitButton isLoading={loading}>
        {loading ?
          <XyroLoadingSpinner
            iconSize='0'
            variant='light'
          />
        : 'Done'}
      </WizardSubmitButton>
    </Flex>
  )
}
