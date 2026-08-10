import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import styles from '../balance-transactions.module.scss'

interface Props {
  stepNumber: number
  stepName: string
  isActive: boolean
  isCompleted: boolean
}
export const BalanceTransactionsStepperItem: React.FC<Props> = ({
  isActive = false,
  stepNumber,
  isCompleted = false,
  stepName
}) => {
  return (
    <Flex
      align={'center'}
      gap={'2'}
      width={'100%'}
    >
      <Flex
        align={'center'}
        justify={'center'}
        className={cn(styles.stepperStep, {
          [styles.stepperStepActive]: isActive,
          [styles.stepperStepCompleted]: isCompleted
        })}
      >
        <Text
          size='2'
          weight='bold'
          className={
            isActive ? 'color-white'
            : isCompleted ?
              'color-green'
            : 'color-gray'
          }
        >
          {stepNumber}
        </Text>
      </Flex>

      <Text
        className={isActive ? 'color-white' : 'color-gray-light'}
        size={'2'}
        weight={'medium'}
      >
        {stepName.charAt(0).toUpperCase() + stepName.slice(1)}
      </Text>
    </Flex>
  )
}
