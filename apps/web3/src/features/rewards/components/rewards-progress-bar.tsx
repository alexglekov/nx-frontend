import React from 'react'
import { Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { RewardsProgressBarTooltip } from './rewards-progress-bar-tolltip'
import styles from '../rewards.module.scss'

interface Props {
  currentStep: number
}

export const RewardsProgressBar: React.FC<Props> = ({ currentStep }) => {
  return (
    <Flex
      align={'end'}
      gap={'1'}
    >
      <Flex
        className={cn(styles.progressBarStep, {
          [styles.progressBarStepActive]: currentStep >= 1
        })}
      />
      <Flex
        className={cn(styles.progressBarStep, {
          [styles.progressBarStepActive]: currentStep >= 2
        })}
      />
      <Flex
        className={cn(styles.progressBarStep, {
          [styles.progressBarStepActive]: currentStep >= 3
        })}
      />

      <RewardsProgressBarTooltip
        currentStep={currentStep}
        activeProgressStep={3}
        padding='1'
      />

      <Flex
        className={cn(styles.progressBarStep, {
          [styles.progressBarStepActive]: currentStep >= 4
        })}
      />
      <Flex
        className={cn(styles.progressBarStep, {
          [styles.progressBarStepActive]: currentStep >= 5
        })}
      />
      <Flex
        className={cn(styles.progressBarStep, {
          [styles.progressBarStepActive]: currentStep >= 6
        })}
      />

      <RewardsProgressBarTooltip
        currentStep={currentStep}
        activeProgressStep={6}
        padding='2'
      />

      <Flex
        className={cn(styles.progressBarStep, {
          [styles.progressBarStepActive]: currentStep >= 7
        })}
      />
      <Flex
        className={cn(styles.progressBarStep, {
          [styles.progressBarStepActive]: currentStep >= 8
        })}
      />
      <Flex
        className={cn(styles.progressBarStep, {
          [styles.progressBarStepActive]: currentStep >= 9
        })}
      />

      <RewardsProgressBarTooltip
        currentStep={currentStep}
        activeProgressStep={9}
        padding='3'
      />
    </Flex>
  )
}
