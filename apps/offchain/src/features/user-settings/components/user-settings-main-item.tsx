import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { MAX_USER_NAME_LENGHT } from 'shared/constants'
import { MAIN_SETTINGS } from '../constants'
import { UserSettingMainItem } from '../types'
import { ChangeEmailModal } from './change-email-modal'
import { ChangeNameModal } from './change-name-modal'
import { ChangePasswordModal } from './change-password-modal'
import styles from '../user-settings.module.scss'

export const UserSettingsMainItem: React.FC<UserSettingMainItem> = ({
  name,
  value,
  dataTestID
}) => {
  const IS_NAME_SETTING = name === MAIN_SETTINGS.NAME.name
  const IS_EMAIL_SETTINGS = name === MAIN_SETTINGS.EMAIL.name
  const IS_PASSWORD_SETTINGS = name === MAIN_SETTINGS.PASSWORD.name

  const formattedValue =
    IS_NAME_SETTING && value.length > MAX_USER_NAME_LENGHT ?
      value.slice(0, MAX_USER_NAME_LENGHT) + '...'
    : value

  return (
    <Flex
      align={'center'}
      justify={'between'}
    >
      <Flex
        direction={'column'}
        gap={'0'}
      >
        <Flex
          direction={'column'}
          gap={'2'}
        >
          <Text
            size={'1'}
            weight={'bold'}
            className={styles.mainItemTextTitle}
          >
            {name.toUpperCase()}
          </Text>
          <Text
            size={'3'}
            weight={'light'}
          >
            <Flex
              align={'center'}
              gap={'1'}
            >
              <Text
                className={'color-white'}
                size={'3'}
                weight={'bold'}
                data-testid={dataTestID}
              >
                {formattedValue}
              </Text>
            </Flex>
          </Text>
        </Flex>
      </Flex>

      {IS_NAME_SETTING && <ChangeNameModal />}

      {IS_EMAIL_SETTINGS && <ChangeEmailModal />}

      {IS_PASSWORD_SETTINGS && <ChangePasswordModal />}
    </Flex>
  )
}
