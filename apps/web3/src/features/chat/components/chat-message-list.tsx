import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Flex } from '@radix-ui/themes'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { ChatMessageItemSkeleton } from 'shared/skeletons'
import { chatRoomIdVar } from 'shared/store/chat-state-store'
import { XyroLoadingSpinner } from 'shared/ui'
import { useMessageLoader } from '../hooks/use-message-loader'
import { newMessageLoadingVar } from '../store/chat-messages'
import { ChatMessageItem } from './chat-message-item'
import styles from '../chat.module.scss'

interface Props {
  messageListRef: React.MutableRefObject<HTMLDivElement | null>
}
// eslint-disable-next-line complexity
export const ChatMessageList: React.FC<Props> = ({ messageListRef }) => {
  const roomId = useReactiveVar(chatRoomIdVar)
  const newMessageLoading = useReactiveVar(newMessageLoadingVar)

  const {
    getChatMessages: fetchChatMessages,
    prevPaginationToken,
    messagesLoading,
    chatMessages
  } = useMessageLoader()

  const handleLoadMore = () => {
    if (!roomId) return

    fetchChatMessages()
  }

  const isInitialLoading = messagesLoading && chatMessages.length === 0

  return (
    <Flex
      ref={messageListRef}
      className={cn(
        styles.messageListWrapper,
        isInitialLoading ? styles.messageListWrapperLoading : ''
      )}
      direction={'column-reverse'}
      width={'100%'}
      height={'100%'}
      gap={{ initial: '2', sm: '5' }}
      px={'5'}
    >
      {newMessageLoading && (
        <Box
          pb={'4'}
          px={'2'}
          key={'new-message-loading'}
        >
          <Skeleton
            width={'100%'}
            height={'36px'}
            borderRadius={'var(--b-radius-3)'}
          />
        </Box>
      )}

      {chatMessages?.map(msg => {
        const msgId = `${msg?.id}`

        return (
          msgId && (
            <ChatMessageItem
              key={msgId}
              text={msg.text}
              sender={msg.sender}
              createdAt={msg.createdAt}
            />
          )
        )
      })}

      {isInitialLoading || (messagesLoading && prevPaginationToken) ?
        Array(10)
          .fill(null)
          .map((_, i) => {
            return (
              <ChatMessageItemSkeleton
                key={`chat-message-item-skeleton-${i}`}
              />
            )
          })
      : null}
      {prevPaginationToken ?
        <Button
          onClick={handleLoadMore}
          className={styles.loadMoreButton}
          variant={'outline'}
          color='yellow'
          size={'4'}
          key={'load-more-button'}
        >
          {isInitialLoading || (messagesLoading && prevPaginationToken) ?
            <XyroLoadingSpinner
              iconSize='0'
              variant='light'
            />
          : 'Load more'}
        </Button>
      : null}
    </Flex>
  )
}
