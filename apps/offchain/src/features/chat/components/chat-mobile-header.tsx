import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { ExitCrossIcon, UserIcon } from 'shared/icons'
import { chatTitleVar, isChatOpenedVar } from 'shared/store/chat-state-store'
import { useOnlineUsers } from '../hooks/use-control-active-users'
import { ChatSwitcher } from './chat-switcher'

export const ChatMobileHeader: React.FC = () => {
  const title = useReactiveVar(chatTitleVar)
  const { activeUsersAmount } = useOnlineUsers()

  const handleCheckClick = () => {
    isChatOpenedVar(false)
  }

  return (
    <Flex
      direction='column'
      gap='1'
      width={'100%'}
      px={'6'}
      py={'4'}
    >
      <Flex justify={'between'}>
        <Text
          size={'5'}
          className='color-white'
        >
          {title} Chat
        </Text>

        <Flex
          align={'center'}
          gap={'1'}
        >
          <Flex mb={'1'}>
            <UserIcon className='color-green' />
          </Flex>
          <Text
            className='color-green'
            size={'4'}
          >
            {activeUsersAmount}
          </Text>
          <Flex
            width={'5rem'}
            height={'5rem'}
            onClick={handleCheckClick}
            justify={'center'}
            align={'center'}
          >
            <ExitCrossIcon
              color='var(--white)'
              onClick={handleCheckClick}
            />
          </Flex>
        </Flex>
      </Flex>

      <ChatSwitcher />
    </Flex>
  )
}
