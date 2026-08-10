import React from 'react'
import { Button, Link, Text } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import styles from '../notification.module.scss'

interface Props {
  buttonText: string | null
  onClick: (() => void) | null
}

export const NotificationToastActionButton: React.FC<Props> = ({
  buttonText,
  onClick
}) => {
  if (!buttonText || !onClick) return null

  return (
    <Button
      onClick={onClick}
      className={styles.actionButton}
      data-testid={DataTestIDs.notificationButton}
    >
      <Text
        size={'2'}
        weight={'bold'}
      >
        {buttonText}
      </Text>
    </Button>
  )
}

export const NotificationToastLink = ({
  linkText,
  address
}: {
  linkText?: string
  address?: string
}) => {
  if (!linkText || !address) return null

  return (
    <Link
      href={address}
      target='_blank'
      rel='noreferrer noopener'
    >
      <Button className={styles.actionButton}>
        <Text
          size={'2'}
          weight={'bold'}
        >
          {linkText}
        </Text>
      </Button>
    </Link>
  )
}
