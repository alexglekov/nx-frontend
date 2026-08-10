import React from 'react'
import { Flex, Separator } from '@radix-ui/themes'
import { User } from '__generated__/graphql'
import { MAIN_SETTINGS } from '../constants'
import { UserSettingsBio } from './user-settings-bio'
import { UserSettingsMainItem } from './user-settings-main-item'
import { UserSettingsPhoto } from './user-settings-photo'
import { UserSettignsSocials } from './user-settings-socials'

interface Props {
  user: User | null
}
export const UserSettingsMainItems: React.FC<Props> = ({ user }) => {
  return (
    <Flex
      direction={'column'}
      gap={'4'}
    >
      <UserSettingsPhoto />

      <Separator size={'4'} />

      <UserSettingsMainItem
        name={MAIN_SETTINGS.NAME.name}
        value={user?.name || ''}
        buttonText={MAIN_SETTINGS.NAME.buttonText}
        dataTestID={MAIN_SETTINGS.NAME.dataTestIdLocator}
      />

      <Separator size={'4'} />

      <UserSettingsBio />

      <Separator size={'4'} />

      <UserSettignsSocials user={user} />
    </Flex>
  )
}
