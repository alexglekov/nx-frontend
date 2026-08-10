import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Tooltip } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { activeChatRoomVar, activeGameVar } from 'shared/store/chat-state-store'
import { ChatRoomType } from 'shared/types/chat'
import styles from '../chat.module.scss'

interface ButtonProps {
  onClick: () => void
  className: string
  active?: boolean
  disabled?: boolean
  dataTestId?: DataTestIDs | ''
}

const ChatSwitcherButton: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  onClick,
  className,
  children,
  disabled,
  active,
  dataTestId = ''
}) => {
  return (
    <Button
      size={'2'}
      className={cn(styles.chatSwitcherButton, className, {
        [styles.chatSwitcherButtonActive]: active
      })}
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  )
}

export const ChatSwitcher: React.FC = () => {
  const activeGame = useReactiveVar(activeGameVar)
  const activeChatRoom = useReactiveVar(activeChatRoomVar)

  const isGlobalChatSelected = activeChatRoom === ChatRoomType.Global

  const handleSetGlobalChatRoom = () => {
    activeChatRoomVar(ChatRoomType.Global)
  }

  const handleSetActiveGameChatRoom = () => {
    activeChatRoomVar(activeGame)
  }

  return (
    <Flex width={'100%'}>
      <ChatSwitcherButton
        onClick={handleSetGlobalChatRoom}
        className={cn(styles.chatSwitcherButtonLeft, {
          [styles.chatSwitcherButtonLeftDisabled]: !isGlobalChatSelected
        })}
        active={isGlobalChatSelected}
        dataTestId={chatButtonSwitchToGlobalChat}
      >
        Global
      </ChatSwitcherButton>
      <Tooltip
        content={'Select game to switch game chat'}
        delayDuration={100}
        hidden={Boolean(activeGame)}
      >
        <ChatSwitcherButton
          onClick={handleSetActiveGameChatRoom}
          className={cn(styles.chatSwitcherButtonRight, {
            [styles.chatSwitcherButtonRightDisabled]: isGlobalChatSelected
          })}
          active={!isGlobalChatSelected}
          disabled={!activeGame}
          dataTestId={chatButtonSwitchToGameChat}
        >
          Game
        </ChatSwitcherButton>
      </Tooltip>
    </Flex>
  )
}

const { chatButtonSwitchToGlobalChat, chatButtonSwitchToGameChat } = DataTestIDs
