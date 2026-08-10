import React from 'react'
import { Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { TaskLockIcon, TickBoldIcon } from 'shared/icons'
import styles from '../rewards.module.scss'

interface Props {
  type: 'done' | 'current' | 'locked'
  isLastItem?: boolean
}

export const RewardTaskStep: React.FC<Props> = ({
  type,
  isLastItem = false
}) => {
  return (
    <Flex
      direction={'column'}
      align={'center'}
      justify={'center'}
    >
      <Flex
        className={cn(styles.stepWrapper, {
          [styles.stepWrapperBlue]: type === 'done' || type === 'current',
          [styles.stepContentLocked]: type === 'locked'
        })}
        align={'center'}
        justify={'center'}
      >
        <Flex
          className={cn(styles.stepContent, {
            [styles.stepContentLocked]: type === 'locked'
          })}
          align={'center'}
          justify={'center'}
        >
          {type === 'done' && <TickBoldIcon color='var(--cyan)' />}

          {type === 'locked' && <TaskLockIcon color='var(--black)' />}
        </Flex>
      </Flex>

      {!isLastItem ?
        <div
          className={cn(styles.stepLine, {
            [styles.stepLineDone]: type === 'done'
          })}
        ></div>
      : null}
    </Flex>
  )
}
