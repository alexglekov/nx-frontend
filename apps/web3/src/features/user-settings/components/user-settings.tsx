import React from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Flex, Heading } from '@radix-ui/themes'
import { MeSocialQuery, User } from '__generated__/graphql'
import { GET_ME_SOCIAL } from 'api/auth/me-social'
import { RoundedSquareSkeleton } from 'shared/skeletons'
import { userVar } from 'shared/store/user'
import { UserSettingsMainItems } from './user-settings-main-items'
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
      </Flex>
    </Flex>
  )
}
