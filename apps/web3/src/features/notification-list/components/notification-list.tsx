/* eslint-disable max-lines */
import React, { useRef, useState } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Button, DropdownMenu, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { Maybe, User } from '__generated__/graphql'
import { MARK_NOTIFICATIONS_READ } from 'api/general/mark-notifications-read'
import { Link } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { useControlNotifications } from 'shared/hooks/notifications/use-control-notifications'
import { NotificationBellIcon } from 'shared/icons'
import {
  notificationListVar,
  notificationsSkipAmountVar
} from 'shared/store/notification'
import { userVar } from 'shared/store/user'
import { NotificationListEmpty } from './notification-list-empty'
import { NotificationListItem } from './notification-list-item'
import styles from '../notification-list.module.scss'

// eslint-disable-next-line max-statements, complexity
export const NotificationList: React.FC = () => {
  const [isNotificationListOpen, setNotificationListOpen] = useState(false)

  const notificationList = useReactiveVar(notificationListVar)

  const notificationSkipAmount = useReactiveVar(notificationsSkipAmountVar)

  const user = useReactiveVar(userVar)

  const [
    commitMarkNotificationsRead,
    { loading: markNotificationReadLoading }
  ] = useMutation(MARK_NOTIFICATIONS_READ)

  const {
    loading,
    unreadNotificationsAmount,
    refetchNotificationList,
    refetchUnreadNotifications
  } = useControlNotifications(user as Maybe<User>, isNotificationListOpen)

  const isListEmpty = notificationList.length === 0
  const isNewNotificationExists =
    unreadNotificationsAmount ||
    notificationList.find(el => el.isRead === false)
  const notificationListRef = useRef(null)

  const onScroll = () => {
    if (notificationListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        notificationListRef.current

      if (
        scrollTop + clientHeight + RANDOM_MODAL_HEIGHT_DIFF_VALUE >=
        scrollHeight
      ) {
        notificationsSkipAmountVar(
          notificationSkipAmount + NOTIFICATION_PAGINATION_TAKE_AMOUNT
        )
      }
    }
  }

  if (!user) return null

  const handleReadAllNotifications = async () => {
    await commitMarkNotificationsRead({
      variables: {
        data: {}
      }
    })

    refetchNotificationList()
    refetchUnreadNotifications()
  }

  const handleOpenClose = () => setNotificationListOpen(prev => !prev)

  return (
    <Flex className={styles.notificationList}>
      <DropdownMenu.Root
        open={isNotificationListOpen}
        onOpenChange={handleOpenClose}
      >
        <DropdownMenu.Trigger>
          <Flex
            className={styles.notificationBell}
            position={'relative'}
          >
            {isNewNotificationExists ?
              <Flex className={styles.unreadNotificationsBadge} />
            : null}
            <NotificationBellIcon
              color='var(--gray-9)'
              width={'2rem'}
              height={'2rem'}
            />
          </Flex>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className={styles.dropDownContent}>
          <Flex
            className={styles.contentWrapper}
            direction={'column'}
            width={'100%'}
            gap={!isListEmpty ? '5' : '0'}
          >
            <Flex
              className={styles.notificationListHeader}
              justify={'between'}
              width={'100%'}
            >
              <Flex
                align={'center'}
                gap={'2'}
              >
                <Text
                  className={styles.notificationHeaderText}
                  size={'7'}
                >
                  Notifications
                </Text>
                {!isListEmpty && unreadNotificationsAmount ?
                  <Flex
                    className={styles.notificationCounterContainer}
                    align={'center'}
                    justify={'center'}
                  >
                    <Text size={'2'}>{unreadNotificationsAmount}</Text>
                  </Flex>
                : null}
              </Flex>
              {!isListEmpty && unreadNotificationsAmount !== 0 ?
                <Button
                  variant='ghost'
                  color='yellow'
                  size={'2'}
                  mt={'3'}
                  disabled={markNotificationReadLoading}
                  onClick={handleReadAllNotifications}
                >
                  <Text
                    size={'2'}
                    weight={'bold'}
                  >
                    {markNotificationReadLoading ?
                      'Loading...'
                    : 'Mark all as read'}
                  </Text>
                </Button>
              : null}
            </Flex>

            {!isListEmpty ?
              <ScrollArea
                scrollbars='vertical'
                size={'2'}
                type='always'
                className={styles.scrollArea}
                ref={notificationListRef}
                onScroll={onScroll}
              >
                <Flex
                  direction={'column'}
                  gap={'4'}
                  width={'100%'}
                  className={styles.itemsContainer}
                >
                  {notificationList.map(el => {
                    return (
                      <NotificationListItem
                        key={el.id}
                        notification={el}
                      />
                    )
                  })}
                </Flex>
              </ScrollArea>
            : <NotificationListEmpty loading={loading} />}

            <Flex
              className={styles.viewBtnContainer}
              width={'100%'}
            >
              <Link
                to={RouterPathes.notifications}
                className={styles.navLink}
              >
                <Button
                  className={styles.viewBtn}
                  onClick={handleOpenClose}
                >
                  <Text
                    size={'2'}
                    weight={'bold'}
                  >
                    VIEW ALL
                  </Text>
                </Button>
              </Link>
            </Flex>
          </Flex>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}

const NOTIFICATION_PAGINATION_TAKE_AMOUNT = 10
const RANDOM_MODAL_HEIGHT_DIFF_VALUE = 0.5
