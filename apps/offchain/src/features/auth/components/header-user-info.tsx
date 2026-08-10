import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { UserBalance } from 'features/balance-transactions/components/user-balance'
import NotificationList from 'features/notification-list'
import Profile from 'features/profile'
import { useResponsive } from 'shared/hooks/use-responsive'
import { isChatOpenedVar } from 'shared/store/chat-state-store'
import { AppSwitch } from '../../../shared/ui/app-switch/app-switch'
import { ChatSidebarButton } from '../../main-layout/components/chat-sidebar-button'
import { HeaderBonusLink } from '../../main-layout/components/header-bonus-link'

// eslint-disable-next-line max-statements
export const HeaderUserInfo = () => {
  const isChatOpened = useReactiveVar(isChatOpenedVar)
  // const [isMobile] = useResponsive(['xs', 'sm'])

  return (
    <Flex
      gap={{ initial: '4', xs: '5' }}
      align={'center'}
    >
      {/* <HeaderBonusLink /> */}
      {/* <UserBalance /> */}
      {/* <NotificationList /> */}
      {/* <ChatSidebarButton isChatOpened={isChatOpened} /> */}
      <Profile />
      {/* {!isMobile && <AppSwitch />} */}
    </Flex>
  )
}
