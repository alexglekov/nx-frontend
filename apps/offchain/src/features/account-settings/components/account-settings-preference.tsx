import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { UserSettingsSecondaryItems } from 'features/user-settings/components/user-settings-secondary-items'
import {
  EMAIL_NOTIFICATION_SETTINGS,
  EMAIL_NOTIFICATION_SETTINGS_TITLE,
  PRIVACY_SETTINGS,
  PRIVACY_SETTINGS_TITLE
} from 'features/user-settings/constants'
// TODO: Split styles file per feature
import styles from '../../account/account.module.scss'

export const AccountSettingsPreference: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      gap={'3rem'}
      className={styles.settingsContainerWrapper}
    >
      <Text
        size={'8'}
        weight={'medium'}
        className='color-white'
      >
        Preference settings
      </Text>

      {/* TODO: Remove when API for privacy settings will be ready */}
      {/* <UserSettingsSecondaryItems
        title={PRIVACY_SETTINGS_TITLE}
        items={PRIVACY_SETTINGS}
        // TODO: Remove any when server will provide API
        itemsInfo={{ showProfile: true } as any}
      /> */}

      <UserSettingsSecondaryItems
        title={EMAIL_NOTIFICATION_SETTINGS_TITLE}
        items={EMAIL_NOTIFICATION_SETTINGS}
        // TODO: Remove any when server will provide API
        itemsInfo={{ sendNotificationsToEmail: true } as any}
      />
    </Flex>
  )
}
