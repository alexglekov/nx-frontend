import React from 'react'
import { Flex } from '@radix-ui/themes'
import { useFragment } from '__generated__'
import { FRAGMENT_ME } from 'api/auth/fragment-me'
import { useUser } from 'features/auth/hooks/use-user'
import { useParams } from 'react-router-dom'
import { useFetchProfileByUrlParam } from '../../../shared/hooks/use-fetch-user-by-url-param'
import { UserProfileInfo } from './profile-info'
import { ProfileModeStats } from './profile-mode-stats'

export const UserProfile: React.FC = () => {
  const { userData } = useUser()
  const user = useFragment(FRAGMENT_ME, userData) ?? null

  const { id } = useParams()

  const { user: watchingProfile } = useFetchProfileByUrlParam(id)

  const isAnotherUserProfile = id && watchingProfile?.id !== user?.id
  const profile = isAnotherUserProfile ? watchingProfile : user
  const profileId = profile?.id || null

  return (
    <Flex
      direction={'column'}
      width={'100%'}
      gap={'2'}
    >
      <UserProfileInfo user={profile} />

      {profileId ?
        <>
          <ProfileModeStats userId={profileId} />

          {/* TODO: Uncommnet when server will be able to provide achievements logic */}
          {/* <WinrateGraph userId={profile.id} /> */}

          {/* TODO: Uncommnet when server will be able to provide achievements logic */}
          {/* <ProfileAchievements /> */}

          {/* TODO: Uncommnet when server will be able to provide MyPredicts logic */}
          {/* <MyBetsTable user={profile as User} /> */}
        </>
      : null}
    </Flex>
  )
}
