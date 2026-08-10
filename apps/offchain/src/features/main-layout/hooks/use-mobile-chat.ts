import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useResponsive } from 'shared/hooks/use-responsive'
import { useScrollLock } from 'shared/hooks/use-scroll-lock'
import { isChatOpenedVar } from 'shared/store/chat-state-store'
import { CHAT_SIDEBAR_BUTTON_ID } from '../constants'

export const useMobileChat = (
  layoutScrollAreaRef: MutableRefObject<HTMLDivElement | null>
) => {
  const [isInitialClosed, setIsInitialClsoed] = useState(false)
  const [isMobile] = useResponsive('xs')
  const [lockScroll, unlockScroll] = useScrollLock(layoutScrollAreaRef)

  const isChatOpened = useReactiveVar(isChatOpenedVar)

  const handleScrollTopOnOpen = useCallback(() => {
    if (!layoutScrollAreaRef?.current) return

    layoutScrollAreaRef.current?.scrollTo(0, 0)
  }, [layoutScrollAreaRef])

  useEffect(() => {
    if (isInitialClosed || !isMobile || isMobile === undefined) return

    isChatOpenedVar(false)
    setIsInitialClsoed(true)
  }, [isInitialClosed, isMobile])

  useEffect(() => {
    if (isMobile && isChatOpened) {
      lockScroll()
      handleScrollTopOnOpen()
    }

    if (isMobile && !isChatOpened) {
      unlockScroll()
    }
  }, [isMobile, isChatOpened, lockScroll, unlockScroll, handleScrollTopOnOpen])

  useEffect(() => {
    if (!isMobile || isMobile === undefined) return

    const currectLayoutAreaRef = layoutScrollAreaRef.current

    const chatSidebarButton = document.getElementById(CHAT_SIDEBAR_BUTTON_ID)

    const handleClickOutOfChat = (event: MouseEvent) => {
      if (!event.target) return

      if (
        currectLayoutAreaRef &&
        currectLayoutAreaRef.contains(event.target as Node) &&
        !chatSidebarButton?.contains(event.target as Node)
      ) {
        if (isChatOpened) {
          isChatOpenedVar(false)
        }
      }
    }

    currectLayoutAreaRef?.addEventListener('click', handleClickOutOfChat)

    return () => {
      currectLayoutAreaRef?.removeEventListener('click', handleClickOutOfChat)
    }
  }, [isMobile, layoutScrollAreaRef])
}
