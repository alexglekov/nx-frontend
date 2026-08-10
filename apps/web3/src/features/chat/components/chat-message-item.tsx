import React, { memo } from 'react'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { Maybe, User } from '__generated__/graphql'
import { formatDistance } from 'date-fns'
import {
  AVAILABLE_EMOJI_ACHIEVEMENTS,
  DataTestIDs,
  HIDDEN_PROFILE_TOOLTIP_TEXT,
  NAME_FALLBACK_DEFAULT,
  RouterPathes
} from 'shared/constants'
import { XyroLink } from 'shared/ui'
import { UserProfileNameWithAvatar } from 'shared/ui/user-profile-link'
import styles from '../chat.module.scss'

interface Props {
  text: string
  createdAt: number
  sender?: Maybe<
    Pick<User, 'name' | 'avatarUris' | 'id' | 'discordRoles' | 'level'>
  >
}
export const ChatMessageItemBase: React.FC<Props> = ({
  text,
  sender,
  createdAt
}) => {
  const { name: userName, avatarUris, id, discordRoles, level } = sender || {}
  const isProfileHidden = userName === NAME_FALLBACK_DEFAULT

  const name = userName ? userName : NAME_FALLBACK_DEFAULT
  const timeframe = formatDistance(createdAt, Date.now(), { addSuffix: true })
  const profileLink = `${RouterPathes.profile}/${id}`
  const userLevel = level?.levelId || 0

  return (
    <Flex
      direction={'column'}
      gap={'2'}
      px={'2'}
      className={styles.chatMessageItemWrapper}
      data-testid={DataTestIDs.chatUsersMessage}
    >
      <Flex
        justify={'between'}
        gap='4'
      >
        <Tooltip
          content={!isProfileHidden ? '' : HIDDEN_PROFILE_TOOLTIP_TEXT}
          delayDuration={100}
          hidden={!isProfileHidden}
        >
          <Flex
            align={'center'}
            gap={'2'}
          >
            <XyroLink to={profileLink}>
              <UserProfileNameWithAvatar
                avatarUrl={avatarUris?.[0] || ''}
                avatarSize='2'
                isAchievementBadgesShown
                name={name}
                userLevel={userLevel}
              />
            </XyroLink>

            {AVAILABLE_EMOJI_ACHIEVEMENTS.map(el => {
              if (!discordRoles?.includes(el.id)) return null
              const emoji = el.name.slice(0, 2)
              const achievementName = el.name.slice(2, el.name.length)

              return (
                <Tooltip
                  content={achievementName}
                  key={`${sender}-${createdAt}-${el.id}`}
                  delayDuration={100}
                >
                  <Flex
                    align={'center'}
                    justify={'center'}
                    className={styles.emojiWrapper}
                  >
                    {emoji}
                  </Flex>
                </Tooltip>
              )
            })}
          </Flex>
        </Tooltip>

        <Text
          size={'1'}
          className={styles.timeframeText}
        >
          {timeframe}
        </Text>
      </Flex>

      <Text
        className={styles.chatMessageText}
        size={{ initial: '4', sm: '2' }}
      >
        {text}
      </Text>
    </Flex>
  )
}

export const ChatMessageItem = memo(
  ChatMessageItemBase,
  (prevProps, nextProps) => {
    const isNewProps =
      prevProps.createdAt === nextProps.createdAt &&
      prevProps.sender?.id === nextProps.sender?.id &&
      prevProps.text === nextProps.text

    return isNewProps
  }
)
