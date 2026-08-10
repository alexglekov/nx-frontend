import { memo } from 'react'
import { Flex } from '@radix-ui/themes'
import classnames from 'classnames'
import { AVATAR_FALLBACK_DEFAULT } from 'shared/constants'
import { RadixText } from '../radix-text'
import { XyroAvatar } from '../xyro-avatar/xyro-avatar'

interface UserNameProps {
  avatarSize: '1' | '2' | '3'
  avatarUrl?: string
  isAchievementBadgesShown?: boolean
  name?: string
  textClassname?: string
  iconsTextGap?: '0' | '1' | '2'
  isLoggedUser?: boolean | null
  id?: string
  userLevel?: number | null
}
const UserProfileNameWithAvatarBase: React.FC<UserNameProps> = ({
  avatarUrl,
  name,
  avatarSize,
  iconsTextGap = '1',
  textClassname,
  isLoggedUser,
  userLevel
}) => {
  const nameFallback = name?.at(0) || AVATAR_FALLBACK_DEFAULT

  return (
    <Flex
      gap={'2'}
      align={'center'}
      height={'100%'}
    >
      <XyroAvatar
        displayLevel={false}
        src={avatarUrl}
        size={avatarSize}
        userLevel={userLevel}
        fallback={nameFallback}
      />

      <Flex
        direction={'column'}
        gap={iconsTextGap}
      >
        <RadixText
          size={{ initial: '3', sm: '2' }}
          weight={'medium'}
          className={classnames(textClassname ? textClassname : '')}
        >
          {name} {isLoggedUser ? '(you)' : null}
        </RadixText>

        {/* TODO: implement the discord groups list */}
        {/* {isAchievementBadgesShown ?
          <Flex align={'center'}>
            <DiamondIcon color='var(--pink)' />
            <DiamondIcon color='var(--yellow-11)' />
          </Flex>
        : null} */}
      </Flex>
    </Flex>
  )
}

export const UserProfileNameWithAvatar = memo(
  UserProfileNameWithAvatarBase,
  (prevProps, nextProps) => {
    return prevProps.id === nextProps.id
  }
)
