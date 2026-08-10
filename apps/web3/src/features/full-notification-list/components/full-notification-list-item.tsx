import { Flex, Text } from '@radix-ui/themes'
import { GameResultNotification, NotificationType } from '__generated__/graphql'
import cn from 'classnames'
import { formatDistance } from 'date-fns'
import {
  GAME_NOTIFICATION_STATUS_FIELDS,
  MY_BETS_MODES
} from 'shared/constants'
import styles from '../full-notification-list.module.scss'

interface Props {
  notification: GameResultNotification
}
// eslint-disable-next-line max-statements
export const FullNotificationListItem: React.FC<Props> = ({ notification }) => {
  const { payload, createdAt, isRead, type } = notification || {}

  const { gameType } = payload || {}

  const isNotificationNotShown =
    !payload || !('status' in payload) || type === NotificationType.Bonus

  if (isNotificationNotShown) return null

  const gameName = MY_BETS_MODES?.[gameType]?.name
  const timeframe = formatDistance(createdAt, Date.now(), {
    addSuffix: true
  })

  const notificationText = GAME_NOTIFICATION_STATUS_FIELDS[
    payload.status
  ]?.notificationText.replace('$gameName', gameName)

  const NotificationIcon =
    GAME_NOTIFICATION_STATUS_FIELDS[payload.status]?.notificationIcon

  const notificationIconColor =
    GAME_NOTIFICATION_STATUS_FIELDS[payload.status]?.color

  return (
    <Flex
      className={styles.notificationListItemContainer}
      width={'100%'}
    >
      <Flex
        width={'100%'}
        justify={'between'}
        align={'center'}
        gap={'3'}
        py={'3'}
        px={'2'}
        className={styles.notificationListItemInnerWrapper}
      >
        <Flex
          align={'center'}
          gap={'2'}
          className={cn({
            [styles.notificationInactive]: isRead
          })}
        >
          <NotificationIcon color={notificationIconColor} />
          <Text
            className={styles.notificationItemText}
            size={'3'}
          >
            {notificationText}
          </Text>
        </Flex>

        <Text
          size={'1'}
          className={styles.notificationItemCratedAtText}
        >
          {timeframe}
        </Text>
      </Flex>
    </Flex>
  )
}
