import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import styles from '../full-notification-list.module.scss'

interface Props {
  unreadNotificationsAmount: number
}

export const FullNotificationListHeader: React.FC<Props> = ({
  unreadNotificationsAmount
}) => {
  return (
    <Flex
      align={'center'}
      gap={'3'}
      className={styles.titleContainer}
    >
      <Text
        weight={'medium'}
        size={'7'}
        className='color-white'
      >
        Notifications
      </Text>
      
      {unreadNotificationsAmount ? (
        <Flex
          align={'center'}
          justify={'center'}
          className={styles.notificationsAmountBadge}
        >
          <Text
            size={'2'}
            weight={'medium'}
            className='color-white'
          >
            {unreadNotificationsAmount}
          </Text>
        </Flex>
      ) : null}
    </Flex>
  )
}
