import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { User } from '__generated__/graphql'
import cn from 'classnames'
import { UserProfileLink } from '../user-profile-link'
import styles from './winner-modal.module.scss'

interface Props {
  position: number
  user: User
  isCurrentUser: boolean
  winnerBorderColor: string
  winAmount?: string
}
export const WinnerModalWinnersListItem: React.FC<Props> = ({
  position,
  user,
  isCurrentUser,
  winnerBorderColor,
  winAmount = 0
}) => {
  return (
    <Flex
      align={'center'}
      justify={'between'}
      // color={winnerBorderColor}
      className={cn(
        styles.winnerItemContainer,
        isCurrentUser ? styles.winnerItemContainerBorder : ''
      )}
    >
      <Flex
        align={'center'}
        gap={'2'}
      >
        <Text
          className={styles.winnerPositionText}
          size={'2'}
          weight={'bold'}
        >
          #{position}
        </Text>

        <UserProfileLink
          textClassname={styles.whiteColor}
          avatarSize={1}
          iconsTextGap={0}
          user={user}
          isAchievementBadgesShown={false}
        />
      </Flex>

      <Flex
        align={'center'}
        gap={'1'}
      >
        <Text
          size={'2'}
          weight={'bold'}
          className={isCurrentUser ? styles.whiteColor : styles.grayColor}
        >
          ${winAmount}
        </Text>
      </Flex>
    </Flex>
  )
}
