import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { EmptyStateNotificationIcon } from 'shared/icons'
import styles from '../notification-list.module.scss'

interface Props {
  loading: boolean
}

export const NotificationListEmpty: React.FC<Props> = ({ loading }) => {
  if (loading) {
    return (
      <Flex
        className={styles.emptylistWrapper}
        align={'center'}
        justify={'center'}
        gap={'3'}
        direction={'column'}
      >
        Loading...
      </Flex>
    )
  }

  return (
    <Flex
      className={styles.emptylistWrapper}
      align={'center'}
      justify={'center'}
      gap={'3'}
      direction={'column'}
    >
      <EmptyStateNotificationIcon />
      <Text
        className={styles.emptyNotificationStateMainText}
        size={'5'}
      >
        You don’t have new notifications
      </Text>
      <Text
        className={styles.emptyNotificationStateSecondaryText}
        size={'2'}
      >
        Your notifications will appear here
      </Text>
    </Flex>
  )
}
