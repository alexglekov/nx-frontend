import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { Maybe, User } from '__generated__/graphql'
import cn from 'classnames'
import { UserProfileLink } from 'shared/ui'
import { XyroToken } from '../xyro-token'
import styles from './leaders.module.scss'

interface Props {
  id: number
  amountString: string
  user: Maybe<User>
  isEqualsXYROtoken?: boolean
  isCurrnetUser?: boolean
}
export const TodayLeadersItem: React.FC<Props> = ({
  id,
  user,
  amountString,
  isEqualsXYROtoken = false,
  isCurrnetUser = false
}) => {
  return (
    <Flex
      align={'center'}
      width={'100%'}
      justify={'between'}
      px={isCurrnetUser ? '4' : '0'}
      className={cn(styles.todayLeadersItemWrapper, {
        [styles.todayLeadersItemWrapperSelf]: isCurrnetUser
      })}
    >
      <Flex align={'center'}>
        <Text
          weight={'regular'}
          size={'3'}
          color={'yellow'}
          mr={'1'}
        >
          #{id}
        </Text>
        <UserProfileLink user={user} />
      </Flex>

      <Flex
        align={'center'}
        gap={'1'}
      >
        {isEqualsXYROtoken ? (
          <XyroToken
            size={'2rem'}
            color='yellow'
          />
        ) : null}

        <Text size={'5'}>{amountString}</Text>
      </Flex>
    </Flex>
  )
}
