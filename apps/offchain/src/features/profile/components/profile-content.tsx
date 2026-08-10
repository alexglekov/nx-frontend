import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { Stand } from 'app/types'
import {
  AVATAR_FALLBACK_DEFAULT,
  DataTestIDs,
  NAME_FALLBACK_DEFAULT,
  RouterPathes,
  UserRoles
} from 'shared/constants'
import { userVar } from 'shared/store/user'
import { XyroAvatar } from 'shared/ui'
import { PROFILE_LINK_ICONS } from '../constants'
import { ProfileMenuItem } from './drop-down-link'
import { Logout } from './logout'
import styles from '../profile.module.scss'

const STAND = import.meta.env.VITE_STAND as Stand
const isDevelopmentEnv = STAND === Stand.dev

export const ProfileContent: React.FC = () => {
  const user = useReactiveVar(userVar)

  if (!user) return

  const userName = user?.name ?? NAME_FALLBACK_DEFAULT
  const isUserAdmin = user?.role === UserRoles.ADMIN
  const userLevel = user?.level?.levelId || 0

  return (
    <DropdownMenu.Content className={styles.dropDownContent}>
      <Flex
        gap='2'
        className={styles.dropDownWrapper}
        align={'center'}
        px={'2'}
        mb={'1'}
        data-testid={DataTestIDs.profileHeaderContent}
      >
        <XyroAvatar
          src={user.avatarUris[0] || ''}
          userLevel={userLevel}
          fallback={user.name[0] || AVATAR_FALLBACK_DEFAULT}
          size={'4'}
        />
        <Flex
          direction={'column'}
          justify={'center'}
        >
          <Text
            weight='bold'
            className={styles.userName}
          >
            {userName}
          </Text>
        </Flex>
      </Flex>

      <Box
        className={styles.separator}
        mt={'4'}
        mb={'1'}
      />

      <Flex
        direction={'column'}
        gap={'2'}
      >
        <ProfileMenuItem
          link={RouterPathes.accountMyAccount}
          title='Account'
          icon={PROFILE_LINK_ICONS.ACCOUNT_ICON}
          dataTestID={DataTestIDs.buttonSettingsLink}
        />

        {/* <ProfileMenuItem
          link={RouterPathes.bonusAccountBonus}
          title='My bonus'
          icon={PROFILE_LINK_ICONS.BONUS_ICON}
          dataTestID={DataTestIDs.buttonSettingsLink}
        /> */}

        {/* <ProfileMenuItem
          link={RouterPathes.referral}
          title='Referral'
          icon={PROFILE_LINK_ICONS.REFERRAL_ICON}
          dataTestID={DataTestIDs.buttonSettingsLink}
        /> */}
        {/* 
        <ProfileMenuItem
          link={RouterPathes.historyDeposit}
          title='Transaction history'
          icon={PROFILE_LINK_ICONS.TRANSACTIONS_ICON}
          dataTestID={DataTestIDs.buttonSettingsLink}
        />

        <ProfileMenuItem
          link={RouterPathes.settingsPreference}
          title='Settings'
          icon={PROFILE_LINK_ICONS.SETTINGS_ICON}
          dataTestID={DataTestIDs.buttonSettingsLink}
        /> */}

        {isUserAdmin && (
          <ProfileMenuItem
            link={
              isDevelopmentEnv ?
                'https://backoffice-dev.xyrotech.net/'
              : 'https://backoffice.xyro.io/'
            }
            title='Backoffice'
            icon={PROFILE_LINK_ICONS.TRANSACTIONS_ICON}
            dataTestID={DataTestIDs.buttonSettingsLink}
          />
        )}
      </Flex>

      <Box
        className={styles.separator}
        my={'1'}
      />

      <Logout />
    </DropdownMenu.Content>
  )
}
