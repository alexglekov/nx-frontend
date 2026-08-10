import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { Maybe, MeFragment } from '__generated__/graphql'
import { NAME_FALLBACK_DEFAULT } from 'shared/constants'
import { DiamondIcon } from 'shared/icons'
import { userVar } from 'shared/store/user'
import { formatRegisterDate } from '../utils/format-register-date'
import { ProfileAvatar } from './profile-avatar'
import { ProfileCashbackTab } from './profile-cashback-tab'
import { ProfileInfoStats } from './profile-info-stats'
import styles from '../user-profile.module.scss'

interface Props {
  user: Maybe<MeFragment>
}
export const UserProfileInfo: React.FC<Props> = ({ user }) => {
  const meUser = useReactiveVar(userVar)

  const name = user?.name ?? NAME_FALLBACK_DEFAULT
  const bio = user?.bio ?? ''
  const registeredDate =
    user ? formatRegisterDate(user.createdAt) : formatRegisterDate(Date.now())

  const isMyProfile = user?.id === meUser?.id

  return (
    <Flex
      className={styles.userProfileInfoWrapper}
      direction={'column'}
    >
      {isMyProfile && <ProfileCashbackTab />}

      <Flex
        direction={'column'}
        width={'100%'}
      >
        <Flex
          justify={'between'}
          width={'100%'}
          align={'start'}
        >
          <Flex
            gap={{ initial: '5', sm: '9' }}
            align={'start'}
            direction={{ initial: 'column', sm: 'row' }}
            width={'100%'}
          >
            <ProfileAvatar user={user} />

            <Flex
              direction={'column'}
              gap={'2'}
            >
              <Text
                size={{ initial: '3', sm: '2' }}
                weight={'regular'}
                className={styles.userProfileInfoRegistration}
              >
                Registered on {registeredDate}
              </Text>

              <Text
                weight={'bold'}
                className={styles.userProfileInfoName}
              >
                {name}
              </Text>

              <Text
                size={'2'}
                className={styles.userProfileInfoBio}
              >
                {bio}
              </Text>
            </Flex>
          </Flex>

          <Flex
            gap={'2'}
            align={'center'}
          >
            <Flex
              className={styles.diamondWrapper}
              align={'center'}
              justify={'center'}
            >
              <DiamondIcon
                width={'4rem'}
                height={'4rem'}
                color='var(--white)'
              />
            </Flex>
            <Flex
              className={styles.diamondWrapper}
              align={'center'}
              justify={'center'}
            >
              <DiamondIcon
                width={'4rem'}
                height={'4rem'}
                color='var(--white)'
              />
            </Flex>
            <Flex
              className={styles.diamondWrapper}
              align={'center'}
              justify={'center'}
            >
              <DiamondIcon
                width={'4rem'}
                height={'4rem'}
                color='var(--white)'
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <ProfileInfoStats userId={user?.id || ''} />
    </Flex>
  )
}
