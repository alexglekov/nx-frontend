import { GameType } from '__generated__/graphql'

export const ChatRoomType = {
  ...GameType,
  Global: 'GLOBAL'
} as const

export type ChatRoomType = (typeof ChatRoomType)[keyof typeof ChatRoomType]
