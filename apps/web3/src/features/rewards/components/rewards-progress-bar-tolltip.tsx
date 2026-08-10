import React from 'react'
import { Flex, Tooltip } from '@radix-ui/themes'
import cn from 'classnames'
import { CupIcon } from 'shared/icons'
import styles from '../rewards.module.scss'

interface Props {
  currentStep: number
  activeProgressStep: number
  padding: '1' | '2' | '3'
}

export const RewardsProgressBarTooltip: React.FC<Props> = ({
  currentStep,
  activeProgressStep,
  padding
}) => {
  const tooltipText =
    activeProgressStep >= 9 ?
      `Earn 500 points when you complete whole challenge`
    : `Earn 500 points when you complete ${
        activeProgressStep / 3
      }/3 of challenge`

  return (
    <Tooltip
      content={tooltipText}
      className={styles.tooltip}
      delayDuration={100}
    >
      <Flex
        align={'center'}
        justify={'center'}
        p={padding}
        className={cn(
          styles.statisticsIconContainer,
          styles.cupContainer,
          'cursor-pointer',
          {
            [styles.progressBarStepActive]: currentStep >= activeProgressStep
          }
        )}
      >
        <CupIcon color='var(--black)' />
      </Flex>
    </Tooltip>
  )
}
