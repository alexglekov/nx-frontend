import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import ApprovedBalance from 'features/approved-balance'
import BalanceAdd from 'features/balance-add'
import NotificationList from 'features/notification-list'
import Profile from 'features/profile'
import { RewardsBalance } from 'features/rewards'
import { useResponsive } from 'shared/hooks/use-responsive'
import { isChatOpenedVar } from 'shared/store/chat-state-store'
import { AppSwitch } from 'shared/ui/app-switch/app-switch'
import { ChatSidebarButton } from '../../main-layout/components/chat-sidebar-button'
import { ConnectWalletDialog } from './connect-wallet-dialog'

// eslint-disable-next-line max-statements
export const HeaderUserInfo = () => {
  const isChatOpened = useReactiveVar(isChatOpenedVar)
  const [isMobile] = useResponsive(['xs', 'sm'])

  return (
    <Flex
      gap={{ initial: '4', xs: '5' }}
      align={'center'}
    >
      <RewardsBalance />
      <ConnectWalletDialog />
      <BalanceAdd />
      <ApprovedBalance />
      <NotificationList />
      <ChatSidebarButton isChatOpened={isChatOpened} />
      <Profile />
      {/* {!isMobile && <AppSwitch />} */}
    </Flex>
  )
}
