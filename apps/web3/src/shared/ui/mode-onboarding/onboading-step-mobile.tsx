import { Flex, Heading, Text } from '@radix-ui/themes'
import { OnboardingStep } from 'shared/types'
import styles from './mode-onboarding.module.scss'

interface StepProps {
  step: OnboardingStep
}
export const OnboardingStepItemMobile: React.FC<StepProps> = ({ step }) => {
  return (
    <Flex
      direction='column'
      p='2'
      gap='2'
      className={styles.onBoardingStepContainerMobile}
    >
      <Heading
        as='h3'
        size='4'
        className='color-white'
      >
        {step.title}
      </Heading>
      <Text
        className='color-white'
        size='1'
      >
        {step.description}
      </Text>
    </Flex>
  )
}
