import { ChatRoomType } from 'shared/types/chat'

export const CHAT_TITLE_BY_CHAT_ROOM: { [key: string]: string } = {
  [ChatRoomType.Onevsone]: '1vs1',
  [ChatRoomType.Setup]: 'Setups',
  [ChatRoomType.Bullseye]: "Bull's Eye",
  [ChatRoomType.Updown]: 'Up/Down',
  [ChatRoomType.Race]: 'Meme Wars',
  [ChatRoomType.Global]: 'Global'
}
