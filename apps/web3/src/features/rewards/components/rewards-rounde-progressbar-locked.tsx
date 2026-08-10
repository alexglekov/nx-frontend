import React from 'react'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import cn from 'classnames'
import { TaskLockIcon } from 'shared/icons'
import styles from '../rewards.module.scss'

export const RewardsRoundProgressbarLocked: React.FC = () => {
  return (
    <Flex
      align={'center'}
      gap={'1'}
    >
      <Tooltip
        content={'Complete previous challenge to unlock'}
        className={styles.tooltip}
        delayDuration={100}
      >
        <Flex
          className={styles.lockedProgressbarWrapper}
          align={'center'}
          justify={'center'}
        >
          <Flex
            className={cn(styles.lockedProgressbarContainer, 'curosr-pointer')}
            align={'center'}
            justify={'center'}
          >
            <TaskLockIcon color='var(--black)' />
          </Flex>
        </Flex>
      </Tooltip>

      <Text
        className={cn(styles.circularProgressbarDescription, 'color-white')}
        size={'1'}
        weight={'regular'}
      >
        Locked
      </Text>
    </Flex>
  )
}
