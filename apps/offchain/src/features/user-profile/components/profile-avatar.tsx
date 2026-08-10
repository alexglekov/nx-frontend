import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { Maybe, MeFragment } from '__generated__/graphql'
import { NAME_FALLBACK_DEFAULT } from 'shared/constants'
import { LEVELS_ICONS_MAP } from 'shared/constants/levels-icons-map'
import { XyroAvatar } from 'shared/ui'
import styles from '../user-profile.module.scss'

interface Props {
  user: Maybe<MeFragment>
}
export const ProfileAvatar: React.FC<Props> = ({ user }) => {
  const name = user?.name ?? NAME_FALLBACK_DEFAULT
  const avatarFallback = name[0]
  const avatarUrl = user?.avatarUris?.[0] || ''
  const userLevel = user?.level?.levelId || 0
  const userLevelName = user?.level?.level?.name || 'Newcomer'

  const rewardLevelIcon = LEVELS_ICONS_MAP[userLevel]

  return (
    <Flex
      width={{ initial: '100%', sm: 'auto' }}
      className={styles.profileAvatarWrapper}
      direction={{ initial: 'row', sm: 'column' }}
      align={'center'}
    >
      <Flex
        className={styles[`profileAvatar-${userLevel}`]}
        position={'relative'}
        mb={{ initial: '0', sm: '6' }}
      >
        <XyroAvatar
          src={avatarUrl}
          size={{ initial: '7', sm: '9' }}
          fallback={avatarFallback}
          userLevel={userLevel}
          displayLevel={false}
        />

        <Flex
          className={styles.profileAvatarLevelIcon}
          align={'center'}
          justify={'center'}
        >
          {rewardLevelIcon}
        </Flex>
      </Flex>

      <Flex
        direction={'column'}
        align={{ initial: 'start', sm: 'center' }}
        justify={'center'}
        gap={{ initial: '0', sm: '1' }}
      >
        <Text
          size={{ initial: '5', sm: '3' }}
          className={'color-white'}
        >
          {userLevelName}
        </Text>

        <Text
          size={{ initial: '4', sm: '2' }}
          className={'color-gray-light'}
        >
          Level {userLevel}
        </Text>
      </Flex>
    </Flex>
  )
}
