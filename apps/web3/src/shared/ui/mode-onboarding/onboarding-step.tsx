import { Flex, Heading, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { OnboardingStep } from 'shared/types'
import styles from './mode-onboarding.module.scss'

interface StepProps {
  step: OnboardingStep
  isActive: boolean
  setStep: React.Dispatch<React.SetStateAction<OnboardingStep>>
}
export const OnboardingStepItem: React.FC<StepProps> = ({
  step,
  setStep,
  isActive
}) => {
  const stepClassnames = cn(
    styles.onBoardingStepContainer,
    isActive ? styles.stepActive : ''
  )

  return (
    <Flex
      direction='column'
      p='2'
      gap='2'
      className={stepClassnames}
      // TODO: remove onclick in future
      onClick={() => setStep(step)}
    >
      <Heading
        as='h3'
        size='4'
      >
        {step.title}
      </Heading>
      <Text size='1'>{step.description}</Text>
    </Flex>
  )
}
