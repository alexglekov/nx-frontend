import React, { FC, useEffect, useRef } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Box, Flex } from '@radix-ui/themes'
import { SendMessageMutation } from '__generated__/graphql'
import { SEND_ROOM_MESSAGE } from 'api/chat/send-global-room-message'
import { useResponsive } from 'shared/hooks/use-responsive'
import { chatRoomIdVar } from 'shared/store/chat-state-store'
import { notifyOnUnknownError } from 'shared/utils/notify-on-error'
import {
  currentChatMessageVar,
  newMessageLoadingVar
} from '../store/chat-messages'
import { scrollToBottom } from '../utils/scroll-to-bottom'
import { ChatInput } from './chat-input'
import styles from '../chat.module.scss'

interface Props {
  messageListRef: React.MutableRefObject<HTMLDivElement | null>
}
// eslint-disable-next-line max-statements
export const ChatFooter: FC<Props> = ({ messageListRef }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  const currentMessage = useReactiveVar(currentChatMessageVar)

  const isMobile = useResponsive(['xs', 'sm'])

  const [isSmallScreen] = useResponsive(['xs'])

  const roomId = useReactiveVar(chatRoomIdVar)

  const [sendGlobalRoomMessage, { loading }] =
    useMutation<SendMessageMutation>(SEND_ROOM_MESSAGE)

  const handleMessageSent = async () => {
    if (currentMessage.length === 0) return

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    newMessageLoadingVar(true)
    const { data } = await sendGlobalRoomMessage({
      variables: {
        data: {
          roomId,
          text: currentMessage
        }
      },
      onCompleted: () => scrollToBottom(messageListRef),
      onError: notifyOnUnknownError
    })
    newMessageLoadingVar(false)

    if (!data) return
    currentChatMessageVar('')
  }

  useEffect(() => {
    if (
      currentMessage ||
      !textAreaRef.current ||
      isSmallScreen ||
      isSmallScreen === null
    )
      return

    textAreaRef.current.focus()
  }, [loading, textAreaRef, isSmallScreen])

  return (
    <Flex
      pl={isMobile ? '5' : '4'}
      pr={isMobile ? '6' : '4'}
      pb={'4'}
      position={'relative'}
    >
      <Box className={styles.shadowBlock} />
      <ChatInput
        isMessageSending={loading}
        handleMessageSend={handleMessageSent}
        textAreaRef={textAreaRef}
      />
    </Flex>
  )
}
