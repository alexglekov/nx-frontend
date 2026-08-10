import React from 'react'
import { Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { GameModeType, OnboardingStep } from 'shared/types'
import styles from './mode-onboarding.module.scss'
import { OnboardingStepItemMobile } from './onboading-step-mobile'

interface Props {
  step: OnboardingStep
  mode: GameModeType
}
export const ModeOnboardingMobileStep: React.FC<Props> = ({ mode, step }) => {
  return (
    <Flex
      className={cn(styles.mobileStepContainer, styles[mode])}
      mt={'7'}
      ml={'1'}
    >
      <Flex
        className={styles.onboardingContentMobile}
        style={{
          backgroundImage: `url(${step.image})`
        }}
        position={'relative'}
        justify={'end'}
        direction={'column'}
        width={'100%'}
        height={'100%'}
      >
        <OnboardingStepItemMobile
          key={step.title}
          step={step}
        />
      </Flex>
    </Flex>
  )
}
