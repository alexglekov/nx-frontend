import { UserProfileModal } from 'shared/ui/user-profile-link/user-profile-modal'

interface Props {
  userName: string
  userId: string
  userAvatarUrl?: string
}

export const TableItemUser: React.FC<Props> = ({
  userId,
  userName,
  userAvatarUrl
}) => {
  return (
    <UserProfileModal
      avatarSize={'3'}
      iconsTextGap={'1'}
      avatarUrl={userAvatarUrl}
      name={userName}
      id={userId}
    />
  )
}
