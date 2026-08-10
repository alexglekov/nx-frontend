import React from 'react'
import { Flex, Separator } from '@radix-ui/themes'
import { BalanceTransactionsStepperItem } from './balance-transactions-stepper-item'
import styles from '../balance-transactions.module.scss'

interface Props {
  steps: string[]
  activeStep: string
}
export const BalanceTransactionsStepper: React.FC<Props> = ({
  steps,
  activeStep
}) => {
  const activeStepIndex = steps.indexOf(activeStep) + 1
  const stepsLength = steps.length

  return (
    <Flex
      className={styles.stepperWrapper}
      width={'100%'}
      gap={'2'}
    >
      {steps.map(s => {
        const isActive = s === activeStep
        const stepIndex = steps.indexOf(s) + 1
        const isCompleted = stepIndex < activeStepIndex
        const isLastStep = stepIndex === stepsLength

        return (
          <Flex
            align={'center'}
            mr={'1'}
            width={isLastStep ? 'fit-content' : '100%'}
            key={s}
          >
            <BalanceTransactionsStepperItem
              stepName={s}
              isActive={isActive}
              isCompleted={isCompleted}
              stepNumber={stepIndex}
            />

            {!isLastStep ?
              <Separator size={'4'} />
            : null}
          </Flex>
        )
      })}
    </Flex>
  )
}
