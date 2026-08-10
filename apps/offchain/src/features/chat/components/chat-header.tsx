import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { UserIcon } from 'shared/icons'
import { chatTitleVar } from 'shared/store/chat-state-store'
import { useOnlineUsers } from '../hooks/use-control-active-users'
import { ChatSwitcher } from './chat-switcher'
import styles from '../chat.module.scss'

export const ChatHeader: React.FC = () => {
  const title = useReactiveVar(chatTitleVar)
  const { activeUsersAmount } = useOnlineUsers()

  return (
    <Flex
      className={styles.chatHeader}
      align={'center'}
      justify={'between'}
    >
      <Flex
        direction={'column'}
        gap={'1'}
        width={'100%'}
      >
        <Text
          size={'5'}
          className={'color-white'}
        >
          {title} Chat
        </Text>

        <Flex
          align={'center'}
          gap={'1'}
        >
          <Text className={'color-gray'}>Online:</Text>
          <Flex align={'center'}>
            <UserIcon className='color-green' />
            <Text
              className='color-green'
              size={'3'}
            >
              {activeUsersAmount}
            </Text>
          </Flex>
        </Flex>

        <ChatSwitcher />
      </Flex>

      {/* TODO: complete the mentions feature for chat */}
      {/* <Flex
        align={'center'}
        justify={'center'}
        position={'relative'}
        className={styles.atSignContainer}
      >
        <Flex
          position={'absolute'}
          align={'center'}
          justify={'center'}
          className={styles.atSignBadge}
        >
          <Flex className={styles.atSignBadgeDot}></Flex>
        </Flex>

        <AtSignIcon color='var(--c-a-lazur)' />
      </Flex> */}
    </Flex>
  )
}
