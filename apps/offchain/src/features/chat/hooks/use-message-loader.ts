import { useEffect, useState } from 'react'
import { useLazyQuery, useReactiveVar, useSubscription } from '@apollo/client'
import { Message } from '__generated__/graphql'
import { GET_GLOBAL_ROOM_MESSAGES } from 'api/chat/get-global-room-messages'
import { SUBSCRIPTION_GLOBAL_ROOM_MESSAGES } from 'api/chat/subscription-global-room-messages'
import { chatRoomIdVar } from 'shared/store/chat-state-store'
import { userVar } from 'shared/store/user'

const SERVER_RESPONSE_PAGE_MESSAGES_AMOUNT = 20

// eslint-disable-next-line max-statements
export const useMessageLoader = () => {
  const [prevPaginationToken, setPrevPaginationToken] = useState<string>('')
  const [chatMessages, setChatMessages] = useState<Message[]>([])

  const me = useReactiveVar(userVar)
  const roomId = useReactiveVar(chatRoomIdVar)

  const [
    getRoomMessagesPaginated,
    { data: currentChatMessages, loading: messagesLoading }
  ] = useLazyQuery(GET_GLOBAL_ROOM_MESSAGES, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache'
  })

  const { data: chatMessagesSubscription } = useSubscription(
    SUBSCRIPTION_GLOBAL_ROOM_MESSAGES,
    {
      variables: { roomId: roomId as string },
      skip: !roomId
    }
  )

  const getChatMessages = (manualToken = '') => {
    if (manualToken && roomId) {
      return getRoomMessagesPaginated({
        variables: {
          data: {
            roomId,
            paginationToken: manualToken || prevPaginationToken
          }
        }
      })
    }

    if (!roomId || !prevPaginationToken) return

    return getRoomMessagesPaginated({
      variables: {
        data: {
          roomId,
          paginationToken: manualToken || prevPaginationToken
        }
      }
    })
  }

  useEffect(() => {
    if (!roomId) return

    getRoomMessagesPaginated({
      variables: {
        data: {
          roomId
        }
      }
    })
  }, [getRoomMessagesPaginated, roomId])

  useEffect(() => {
    if (!roomId) return

    const newMessageSubscription = chatMessagesSubscription?.roomMessages
    if (!newMessageSubscription) return

    setChatMessages(prev => {
      if (prev.some(({ id }) => id === newMessageSubscription.id)) return prev
      return [newMessageSubscription as Message, ...prev]
    })
  }, [chatMessagesSubscription, me?.id, roomId])

  useEffect(() => {
    setChatMessages([])
  }, [roomId])

  useEffect(() => {
    const messagesData = currentChatMessages?.getRoomMessagesPaginated
    if (!messagesData) return

    setPrevPaginationToken(messagesData?.prevToken || '')

    if (messagesData?.messages?.length < SERVER_RESPONSE_PAGE_MESSAGES_AMOUNT) {
      getChatMessages(messagesData?.prevToken || '')
    }

    const incomingMessages = messagesData?.messages
      ?.filter(
        message =>
          !chatMessages.some(
            existingMessage => message.id === existingMessage.id
          )
      )
      ?.reverse() as Message[]

    setChatMessages(prev => [...prev, ...incomingMessages])
  }, [currentChatMessages])

  return {
    getChatMessages,
    prevPaginationToken,
    chatMessages,
    messagesLoading
  }
}
