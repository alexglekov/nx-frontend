/* eslint-disable max-statements */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import classnames from 'classnames'
import { useLocation } from 'react-router-dom'
import { DataTestIDs } from 'shared/constants'
import { HideSidebarIcon } from 'shared/icons'
import {
  activeChatRoomVar,
  activeGameVar,
  chatTitleVar,
  IS_CHAT_OPENED_KEY,
  isChatOpenedVar
} from 'shared/store/chat-state-store'
import { ChatRoomType } from 'shared/types/chat'
import { ACTIVE_GAME_BY_ROUTE_MAP } from '../constants/chat-active-game'
import { CHAT_TITLE_BY_CHAT_ROOM } from '../constants/chat-rooms'
import { useChatRoomIdLoader } from '../hooks/use-chat-room-id-loader'
import { ChatFooter } from './chat-footer'
import { ChatHeader } from './chat-header'
import { ChatMessageList } from './chat-message-list'
import styles from '../chat.module.scss'

interface Props {
  isChatVisible: boolean
  setIsChatVisible: React.Dispatch<React.SetStateAction<boolean>>
}
export const Chat: React.FC<Props> = ({ isChatVisible, setIsChatVisible }) => {
  const activeChatRoom = useReactiveVar(activeChatRoomVar)
  const location = useLocation()
  const [isFirstRender, setIsFirstRender] = useState(true)

  const messageListRef = useRef<HTMLDivElement | null>(null)

  const isChatOpened = useReactiveVar(isChatOpenedVar)

  useChatRoomIdLoader()

  const closeChat = useCallback(() => {
    sessionStorage.setItem(IS_CHAT_OPENED_KEY, 'false')
    isChatOpenedVar(false)
  }, [])

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }

    let timeout: NodeJS.Timeout

    if (isChatOpened) {
      setIsChatVisible(true)
    } else {
      timeout = setTimeout(() => {
        setIsChatVisible(false)
      }, 300)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isChatOpened])

  useEffect(() => {
    const pathname = location.pathname

    const activeGame = ACTIVE_GAME_BY_ROUTE_MAP[pathname] ?? null
    const activeChatRoom = activeGame ? activeGame : ChatRoomType.Global

    activeGameVar(activeGame)
    activeChatRoomVar(activeChatRoom)
  }, [location])

  useEffect(() => {
    if (!activeChatRoom) {
      return
    }

    const title = CHAT_TITLE_BY_CHAT_ROOM[activeChatRoom]

    chatTitleVar(title)
  }, [activeChatRoom])

  return (
    <Flex
      className={classnames(styles.chatWrapper, {
        [styles.opening]: isChatVisible,
        [styles.closing]: !isChatOpened,
        [styles.closed]: !isChatOpened
      })}
      position={'relative'}
      width={'100%'}
      data-testid={chatBlock}
    >
      <Flex
        position={'absolute'}
        className={styles.chatCloseButton}
        onClick={closeChat}
        align={'center'}
        justify={'center'}
        data-testid={buttonGlobalChatClose}
      >
        <Flex
          align={'center'}
          justify={'center'}
          width={'100%'}
          height={'100%'}
          className={styles.chatCloseIconContainer}
        >
          <HideSidebarIcon
            color='var(--gray-9)'
            width={'3rem'}
            height={'3rem'}
          />
        </Flex>
      </Flex>

      <Flex
        className={styles.chat}
        direction={'column'}
      >
        {isChatVisible && <ChatHeader />}

        {isChatVisible && <ChatMessageList messageListRef={messageListRef} />}

        <ChatFooter messageListRef={messageListRef} />
      </Flex>
    </Flex>
  )
}

const { buttonGlobalChatClose, chatBlock } = DataTestIDs
