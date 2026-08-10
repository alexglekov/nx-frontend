import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { User } from '__generated__/graphql'
import { useControlNotifications } from 'shared/hooks/notifications/use-control-notifications'
import { notificationListVar } from 'shared/store/notification'
import { userVar } from 'shared/store/user'
import { v4 } from 'uuid'
import { useFullNotificationListPagination } from '../hooks/use-full-notification-list-pagination'
import { FullNotificationListHeader } from './full-notification-list-header'
import { FullNotificationListItem } from './full-notification-list-item'
import styles from '../full-notification-list.module.scss'

export const FullNotificationList: React.FC = () => {
  const notifications = useReactiveVar(notificationListVar)
  const user = useReactiveVar(userVar)

  const { unreadNotificationsAmount } = useControlNotifications(
    user as User,
    true
  )
  useFullNotificationListPagination()

  return (
    <Flex
      height={'100%'}
      className={styles.notificationListWrapper}
      direction={'column'}
      width={'100%'}
    >
      <FullNotificationListHeader
        unreadNotificationsAmount={unreadNotificationsAmount}
      />
      <Flex
        direction={'column'}
        height={'100%'}
        width={'100%'}
        className={styles.notificationList}
      >
        {notifications.map(el => {
          return (
            <FullNotificationListItem
              key={v4()}
              notification={el}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}
