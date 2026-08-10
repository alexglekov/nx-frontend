import { MutableRefObject } from 'react'

export function scrollToBottom(
  messageListRef: MutableRefObject<HTMLDivElement | null>
) {
  messageListRef.current?.scrollTo({
    top: 0
  })
}
