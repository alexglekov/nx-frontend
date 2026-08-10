import { FC } from 'react'
import { User } from '__generated__/graphql'
import { UserProfileLink } from 'shared/components'

interface Props {
  user: User | null
  className?: string
  isLevelShown?: boolean
}
export const TableCellPlayerProfile: FC<Props> = ({
  isLevelShown = false,
  user,
  className
}) => {
  return (
    <UserProfileLink
      user={user ?? null}
      textClassname={className}
      isAchievementBadgesShown={isLevelShown}
    />
  )
}
