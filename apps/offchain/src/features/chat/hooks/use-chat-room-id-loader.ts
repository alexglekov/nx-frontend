import { useEffect } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { GetRoomByTypeQuery } from '__generated__/graphql'
import { GET_GLOBAL_ROOM_ID } from 'api/chat/get-global-room-id'
import { activeChatRoomVar, chatRoomIdVar } from 'shared/store/chat-state-store'

export const useChatRoomIdLoader = () => {
  const activeGame = useReactiveVar(activeChatRoomVar)

  const variables = {
    data: {
      type: activeGame
    }
  }

  const { data } = useQuery<GetRoomByTypeQuery>(GET_GLOBAL_ROOM_ID, {
    variables: variables,
    skip: !activeGame
  })

  useEffect(() => {
    if (!data?.getRoomByType?.id) return

    chatRoomIdVar(data.getRoomByType.id)
  }, [data])
}
