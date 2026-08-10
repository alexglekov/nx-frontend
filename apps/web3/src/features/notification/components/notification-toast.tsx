import React, { useEffect, useRef } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Cross1Icon } from '@radix-ui/react-icons'
import * as Toast from '@radix-ui/react-toast'
import { Flex, Heading, IconButton, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { WinningToastBadge, winToastDecorationPath } from 'shared/icons'
import {
  notificationQueueVar,
  notificationStateVar
} from 'shared/store/notification'
import { NOTIFICATION_TOAST_INIT_TITLE } from '../constants'
import { NotificationStateWithId, NotificationToastTypes } from '../types'
import {
  NotificationToastActionButton,
  NotificationToastLink
} from './notification-toast-action-button'
import { NotificationToastWinAmount } from './notification-toast-win-amount'
import styles from '../notification.module.scss'

interface Props {
  notificationState: NotificationStateWithId
}
// eslint-disable-next-line max-statements
export const NotificationToast: React.FC<Props> = ({ notificationState }) => {
  const notificationQueue = useReactiveVar(notificationQueueVar)
  const timerRef = useRef(0)
  const {
    duration,
    type,
    isOpen,
    buttonAction,
    description,
    winAmount,
    title,
    actionText,
    linkAddress
  } = notificationState

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  const handleToastClose = () => {
    notificationStateVar({
      isOpen: false,
      title: NOTIFICATION_TOAST_INIT_TITLE,
      type: 'info'
    })

    const filteredToasts = notificationQueue.filter(
      t => t.id !== notificationState.id
    )

    notificationQueueVar(filteredToasts)
  }

  const handleOpenChange = () => {
    timerRef.current = window.setTimeout(() => {
      handleToastClose()
    }, duration)
  }

  const isWinToastType = type === NotificationToastTypes.WIN

  const toastClassNames = classnames(styles.toastRoot, {
    [styles.error]: type === NotificationToastTypes.ERROR,
    [styles.success]:
      type === NotificationToastTypes.SUCCESS ||
      type === NotificationToastTypes.BONUS,
    [styles.win]: isWinToastType,
    [styles.loss]: type === NotificationToastTypes.LOSS,
    [styles.warning]: type === NotificationToastTypes.WARNING,
    [styles.reject]: type === NotificationToastTypes.REJECT,
    [styles.info]: type === NotificationToastTypes.INFO
  })

  const handleToastAction = () => {
    if (!buttonAction) return

    buttonAction()

    handleToastClose()
  }

  const titleEllipsed = getEllipsedText(title, 50)
  const descriptionElliped = getEllipsedText(description, 100)

  return (
    <Toast.Root
      className={toastClassNames}
      open={isOpen}
      onOpenChange={handleOpenChange}
      data-testid={DataTestIDs.notificationContainer}
      asChild
    >
      <Flex
        direction='column'
        gap='2'
      >
        {isWinToastType ?
          <>
            <img
              src={winToastDecorationPath}
              className={styles.toastDecorations}
              alt='win decorations'
            />
            <WinningToastBadge className={styles.winningToastBadge} />
          </>
        : null}

        <Toast.Title
          className={classnames(
            styles.toastTitle,
            isWinToastType ? styles.toastTitleLimiter : ''
          )}
          asChild
        >
          <Heading
            weight={'bold'}
            size={'4'}
          >
            {titleEllipsed}
          </Heading>
        </Toast.Title>

        <Toast.Description className={styles.toastDescription}>
          <NotificationToastWinAmount
            notificationStateType={type}
            winAmount={String(winAmount)}
          />
          <Text size='2'>{descriptionElliped}</Text>
        </Toast.Description>

        {actionText && buttonAction ?
          <NotificationToastActionButton
            buttonText={actionText || null}
            onClick={handleToastAction}
          />
        : null}

        {actionText && linkAddress ?
          <NotificationToastLink
            address={linkAddress}
            linkText={actionText}
          />
        : null}

        <Toast.Close
          className={styles.toastClose}
          asChild
        >
          <IconButton
            size={'2'}
            radius='full'
            variant='solid'
            onClick={handleToastClose}
          >
            <Cross1Icon />
          </IconButton>
        </Toast.Close>
      </Flex>
    </Toast.Root>
  )
}

const getEllipsedText = (text?: string, length = 100) => {
  return text && text.length > length ? text?.slice(0, length) + '...' : text
}
