import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { FundsUpCircleIcon, WarningTriangleIcon } from 'shared/icons'
import styles from './bets-pool-callout.module.scss'
import { BetsPoolCalloutType } from './constants'

interface Props {
  messageType: BetsPoolCalloutType | null
}
export const BetsPoolCallout: React.FC<Props> = ({ messageType }) => {
  if (messageType === BetsPoolCalloutType.noPlayers) {
    return (
      <MessageWrapper containerClassname={styles.cyanContainer}>
        <Text
          align={'center'}
          size={'1'}
          className={styles.cyanContainerText}
        >
          Be the first one to join the game!
        </Text>
      </MessageWrapper>
    )
  }

  if (messageType === BetsPoolCalloutType.emptyPool) {
    return (
      <MessageWrapper containerClassname={styles.cyanContainer}>
        <WarningTriangleIcon color='var(--cyan)' />

        <Text
          align={'center'}
          size={'1'}
          className={styles.cyanContainerWarningText}
        >
          If no one joins this pool, the game will not be played
        </Text>
      </MessageWrapper>
    )
  }

  if (messageType === BetsPoolCalloutType.chanceToWin) {
    return (
      <MessageWrapper containerClassname={styles.yellowContainer}>
        <FundsUpCircleIcon color='var(--yellow)' />

        <Text
          align={'center'}
          size={'1'}
          className={styles.yellowContainerText}
        >
          You have a chance to win big prize by joining this pool!
        </Text>
      </MessageWrapper>
    )
  }

  return null
}

interface MessageWrapperProps {
  children: React.ReactNode
  containerClassname: string
}
const MessageWrapper: React.FC<MessageWrapperProps> = ({
  children,
  containerClassname
}) => {
  return (
    <Flex
      className={containerClassname}
      py={'3'}
      width={'100%'}
      direction={'column'}
      gap={'2'}
      align={'center'}
      justify={'center'}
    >
      {children}
    </Flex>
  )
}
