import React, { useRef } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { useResponsive } from 'shared/hooks/use-responsive'
import { isChatOpenedVar } from 'shared/store/chat-state-store'
import { useChatRoomIdLoader } from '../hooks/use-chat-room-id-loader'
import { ChatFooter } from './chat-footer'
import { ChatMessageList } from './chat-message-list'
import { ChatMobileHeader } from './chat-mobile-header'
import styles from '../chat.module.scss'

export const ChatMobile: React.FC = () => {
  const [isMobile] = useResponsive('xs')
  const isChatOpened = useReactiveVar(isChatOpenedVar)

  const messageListRef = useRef<HTMLDivElement | null>(null)

  useChatRoomIdLoader()

  if (!isChatOpened || !isMobile) return null

  return (
    <Flex
      className={styles.chatMobileWrapper}
      width={'100%'}
      direction={'column'}
    >
      <ChatMobileHeader />

      <ChatMessageList messageListRef={messageListRef} />

      <ChatFooter messageListRef={messageListRef} />
    </Flex>
  )
}
