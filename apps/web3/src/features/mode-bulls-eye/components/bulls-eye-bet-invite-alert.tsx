import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { isInviteAlertMessageShownVar } from '../store/game.store'
import styles from '../mode-bulls-eye.module.scss'

export const BullsEyeBetInviteAlert: React.FC = () => {
  const isAlertShown = useReactiveVar(isInviteAlertMessageShownVar)

  if (!isAlertShown) return null

  return (
    <Flex
      className={styles.betInviteAlertWrapper}
      align={'center'}
      justify={'center'}
    >
      <Text
        weight={'regular'}
        size={'1'}
        className={styles.betInviteAlertText}
        align={'center'}
      >
        You can make your prediction in the next game!
      </Text>
    </Flex>
  )
}
