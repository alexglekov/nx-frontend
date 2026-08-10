import { useReactiveVar } from '@apollo/client'
import { Tooltip } from '@radix-ui/themes'
import { Maybe, User } from '__generated__/graphql'
import {
  HIDDEN_PROFILE_TOOLTIP_TEXT,
  NAME_FALLBACK_DEFAULT
} from 'shared/constants'
import { userVar } from 'shared/store/user'
import { UserProfileModal } from './user-profile-modal'

interface UserIdProps {
  textClassname?: string
  isAchievementBadgesShown?: boolean
  isMeShown?: boolean
  avatarSize?: 1 | 2 | 3
  iconsTextGap?: 0 | 1 | 2
  user: Maybe<User>
}
export const UserProfileLink: React.FC<UserIdProps> = ({
  user,
  textClassname,
  isAchievementBadgesShown = true,
  avatarSize = 3,
  iconsTextGap = 1,
  isMeShown = false
}) => {
  const meUser = useReactiveVar(userVar)

  const name = user ? user.name : NAME_FALLBACK_DEFAULT
  const id = user?.id ?? null
  const avatarUrl = user?.avatarUris?.[0]
  const isProfileHidden = name === NAME_FALLBACK_DEFAULT // TODO: remove this workaround for the hidden profiles
  const userLevel = user?.level?.levelId || 0

  const isLoggedUser = meUser?.id === id

  return (
    <Tooltip
      content={!isProfileHidden ? '' : HIDDEN_PROFILE_TOOLTIP_TEXT}
      delayDuration={100}
      hidden={!isProfileHidden}
    >
      <UserProfileModal
        avatarSize={`${avatarSize}`}
        iconsTextGap={`${iconsTextGap}`}
        avatarUrl={avatarUrl}
        name={name}
        textClassname={textClassname}
        isAchievementBadgesShown={isAchievementBadgesShown}
        isLoggedUser={isMeShown ? isLoggedUser : null}
        id={user?.id}
        userLevel={userLevel}
      />
    </Tooltip>
  )
}
