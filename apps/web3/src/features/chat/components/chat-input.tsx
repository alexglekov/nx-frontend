import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Kbd, Text, TextArea, Tooltip } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { SendPlaneIcon } from 'shared/icons'
import { balanceVar } from 'shared/store/balance-store'
import { userVar } from 'shared/store/user'
import { MAX_SYMBOLS_INPUT_VALUE } from '../constants'
import { currentChatMessageVar } from '../store/chat-messages'
import styles from '../chat.module.scss'

interface Props {
  isMessageSending: boolean
  handleMessageSend: () => void
  textAreaRef: React.RefObject<HTMLTextAreaElement>
}
// eslint-disable-next-line complexity, max-statements
export const ChatInput: React.FC<Props> = ({
  isMessageSending,
  handleMessageSend,
  textAreaRef
}) => {
  const currentChatMessage = useReactiveVar(currentChatMessageVar)

  const [isMessageFull, setMessageFull] = useState<boolean>(false)
  const user = useReactiveVar(userVar)
  const balance = useReactiveVar(balanceVar)
  const isTextAreaDisabled = !user || !Boolean(balance)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // NOTE: send message on Ctrl/Cmd + Enter
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      handleMessageSend()
    }
  }

  // eslint-disable-next-line max-statements
  const handleSetMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length >= MAX_SYMBOLS_INPUT_VALUE + 1) {
      const diff = MAX_SYMBOLS_INPUT_VALUE - currentChatMessage.length
      const newMessage = currentChatMessage + e.target.value.slice(0, diff)
      currentChatMessageVar(newMessage)
      setMessageFull(true)

      return
    }

    if (e.target.value.length >= 300) {
      setMessageFull(true)
    } else {
      isMessageFull && setMessageFull(false)
    }

    currentChatMessageVar(e.target.value)
  }

  const isMessageEmpty = currentChatMessage.length === 0
  const chatClassNames = cn(styles.chatInput, styles.chatInputWithText, {
    [styles.chatInputWithTextDisabled]: isTextAreaDisabled,
    [styles.chatInputWithTextSending]: isMessageSending
  })

  return (
    <Flex
      direction={'column'}
      className={isMessageSending ? styles.chatInputWithTextSending : ''}
      width={'100%'}
      position={'relative'}
    >
      <Tooltip
        content={'Top up your balance to start a conversation'}
        delayDuration={100}
        hidden={!user || Boolean(balance)}
      >
        <TextArea
          ref={textAreaRef}
          className={chatClassNames}
          value={currentChatMessage}
          disabled={isTextAreaDisabled || isMessageSending}
          onChange={handleSetMessage}
          rows={3}
          maxLength={300}
          onKeyDown={handleKeyDown}
          placeholder='Type something...'
          data-testid={chatInput}
        />
      </Tooltip>

      <Flex
        width={'100%'}
        gap={'4'}
        className={styles.inputMenu}
        align={'center'}
        justify={!isMessageEmpty ? 'between' : 'end'}
        px='3'
        height='5rem'
      >
        <Text
          size={{ initial: '3', sm: '1' }}
          mr={'auto'}
          className={isMessageFull ? styles.inputMessageFull : 'color-gray'}
        >
          {currentChatMessage.length}/{MAX_SYMBOLS_INPUT_VALUE}
        </Text>

        {!isMessageEmpty ?
          <>
            <Kbd
              mt='1'
              className={styles.howToSendBox}
            >
              Ctrl/Cmd + Enter
            </Kbd>

            <Flex
              className={styles.emojiIcon}
              onClick={handleMessageSend}
              data-testid={buttonGlobalChatSendMessage}
            >
              <SendPlaneIcon color='var(--cyan)' />
            </Flex>
          </>
        : null}
      </Flex>
    </Flex>
  )
}

const { buttonGlobalChatSendMessage, chatInput } = DataTestIDs
