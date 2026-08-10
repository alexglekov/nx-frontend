import { useReactiveVar } from '@apollo/client'
import * as Toast from '@radix-ui/react-toast'
import { Portal, Theme } from '@radix-ui/themes'
import { TOAST_DURATION } from 'shared/constants'
import { notificationQueueVar } from 'shared/store/notification'
import { useNotificationQueue } from '../hooks/useNotificationQueue'
import { NotificationToast } from './notification-toast'
import styles from '../notification.module.scss'

interface Props {
  children: React.ReactNode
}
export const Notification: React.FC<Props> = ({ children }) => {
  const notificationQueue = useReactiveVar(notificationQueueVar)

  useNotificationQueue()

  return (
    <Toast.Provider duration={TOAST_DURATION}>
      {children}

      <Portal>
        <Theme>
          {notificationQueue.map(el => {
            return (
              <NotificationToast
                key={el.id}
                notificationState={el}
              />
            )
          })}
          <Toast.Viewport className={styles.toastViewport} />
        </Theme>
      </Portal>
    </Toast.Provider>
  )
}
