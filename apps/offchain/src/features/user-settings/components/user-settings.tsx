import React from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Flex, Heading } from '@radix-ui/themes'
import { MeSocialQuery, User } from '__generated__/graphql'
import { GET_ME_SOCIAL } from 'api/auth/me-social'
import { RoundedSquareSkeleton } from 'shared/skeletons'
import { userVar } from 'shared/store/user'
import {
  EMAIL_NOTIFICATION_SETTINGS,
  EMAIL_NOTIFICATION_SETTINGS_TITLE,
  PRIVACY_SETTINGS,
  PRIVACY_SETTINGS_TITLE
} from '../constants'
import { UserSettingsMainItems } from './user-settings-main-items'
import { UserSettingsSecondaryItems } from './user-settings-secondary-items'
import styles from '../user-settings.module.scss'

export const UserSettings: React.FC = () => {
  const mainUser = useReactiveVar(userVar)
  const { data, loading } = useQuery<MeSocialQuery>(GET_ME_SOCIAL)
  const user = data?.me || mainUser

  if (loading) {
    return <RoundedSquareSkeleton height='100rem' />
  }

  return (
    <Flex
      direction={'column'}
      p={'6'}
      className={styles.settingsContainer}
    >
      <Heading
        size='7'
        weight={'medium'}
        className={styles.cardHeadingText}
      >
        Settings
      </Heading>
      <Flex
        direction={'column'}
        gap={'3'}
      >
        <UserSettingsMainItems user={user as User} />

        <UserSettingsSecondaryItems
          title={PRIVACY_SETTINGS_TITLE}
          items={PRIVACY_SETTINGS}
          // TODO: Remove any when server will provide API
          itemsInfo={{ showProfile: true } as any}
        />

        <UserSettingsSecondaryItems
          title={EMAIL_NOTIFICATION_SETTINGS_TITLE}
          items={EMAIL_NOTIFICATION_SETTINGS}
          // TODO: Remove any when server will provide API
          itemsInfo={{ sendNotificationsToEmail: true } as any}
        />
      </Flex>
    </Flex>
  )
}
