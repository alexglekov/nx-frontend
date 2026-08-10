import { FC } from 'react'
import { Flex } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { ChatIcon } from 'shared/icons'
import {
  IS_CHAT_OPENED_KEY,
  isChatOpenedVar
} from 'shared/store/chat-state-store'
import { CHAT_SIDEBAR_BUTTON_ID } from '../constants'
import styles from '../main-layout.module.scss'

interface ButtonProps {
  isChatOpened: boolean
}
export const ChatSidebarButton: FC<ButtonProps> = ({ isChatOpened }) => {
  const handleChangeChatState = () => {
    isChatOpenedVar(!isChatOpened)
    sessionStorage.setItem(IS_CHAT_OPENED_KEY, `${!isChatOpened}`)
  }

  return (
    <Flex
      onClick={handleChangeChatState}
      className={styles.chatOpenBtn}
      align={'center'}
      justify={'center'}
      id={CHAT_SIDEBAR_BUTTON_ID}
      data-testid={DataTestIDs.buttonGlobalChatHeader}
      mt={{ initial: '1', sm: '0' }}
    >
      <ChatIcon
        width={'2.5rem'}
        height={'2.5rem'}
        color='var(--gray-9)'
      />
    </Flex>
  )
}
