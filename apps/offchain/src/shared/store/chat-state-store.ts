import { makeVar } from '@apollo/client'
import { GameType, Maybe } from '__generated__/graphql'
import { ChatRoomType } from '../types/chat'
import { isNotNullOrUndef } from '../utils/is-not-null-or-undef'

export const IS_CHAT_OPENED_KEY = 'isChatOpened'

const chatStatusFromSessionStorage = sessionStorage.getItem(IS_CHAT_OPENED_KEY)

const isChatOpened =
  isNotNullOrUndef(chatStatusFromSessionStorage) ?
    chatStatusFromSessionStorage === 'true'
  : true

export const isChatOpenedVar = makeVar<boolean>(isChatOpened)
export const chatRoomIdVar = makeVar<string | null>(null)
export const activeChatRoomVar = makeVar<Maybe<ChatRoomType>>(null)
export const activeGameVar = makeVar<Maybe<GameType>>(null)
export const chatTitleVar = makeVar<string>('')
