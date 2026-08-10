import React from 'react'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import cn from 'classnames'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { TickBoldIcon } from 'shared/icons'
import { RewardsRoundProgressbarLocked } from './rewards-rounde-progressbar-locked'
import styles from '../rewards.module.scss'

interface Props {
  stepsAmount: number
  completedStepsAmount: number
  isLocked?: boolean
  isTooltipDisabled?: boolean
  customText?: string
}

export const RewardsRoundProgressbar: React.FC<Props> = ({
  stepsAmount,
  completedStepsAmount,
  isLocked = false,
  isTooltipDisabled = false,
  customText = ''
}) => {
  const isCompleted = stepsAmount === completedStepsAmount

  const tooltipString =
    isCompleted ?
      'Challenge completed'
    : 'Earn 500 points when you complete whole challenge'

  if (isLocked) {
    return <RewardsRoundProgressbarLocked />
  }

  const progressbarText =
    customText ? customText
    : isCompleted ? 'Challenge completed'
    : 'steps completed'

  return (
    <Flex
      align={'center'}
      gap={'3'}
    >
      <Tooltip
        content={tooltipString}
        className={styles.tooltip}
        delayDuration={100}
        hidden={isTooltipDisabled}
      >
        <Flex position={'relative'}>
          <CircularProgressbar
            className={styles.circularProgressbar}
            value={completedStepsAmount}
            maxValue={stepsAmount}
            counterClockwise={true}
            strokeWidth={8}
            background={true}
            styles={buildStyles({
              pathColor: 'var(--cyan)',
              trailColor: 'var(--c-black)',
              backgroundColor: 'var(--gray-4)',
              pathTransitionDuration: 0.3
            })}
          />

          <Flex
            position={'absolute'}
            className={styles.circularProgressbarContent}
          >
            {isCompleted ?
              <TickBoldIcon color='var(--cyan)' />
            : <Text
                size={'2'}
                className='color-white'
              >
                {completedStepsAmount}/{stepsAmount}
              </Text>
            }
          </Flex>
        </Flex>
      </Tooltip>

      <Text
        className={cn('color-white', {
          [styles.circularProgressbarDescription]: !customText
        })}
        size={'1'}
        weight={'regular'}
      >
        {progressbarText}
      </Text>
    </Flex>
  )
}
