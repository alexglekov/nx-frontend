import { useRef, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { HeaderUserInfo } from 'features/auth/components/header-user-info'
import Chat from 'features/chat'
import { ChatMobile } from 'features/chat/components/chat-mobile'
import Navigation from 'features/navigation'
import { NavigationMobileModeSelection } from 'features/navigation/components/navigation-mobile-mode-selection'
import Notification from 'features/notification'
import { Outlet, useLocation } from 'react-router-dom'
import { AccessDeniedModal } from 'shared/components/access-denied-modal/access-denied-modal'
import { HTMLElementsIDs, RouterPathes } from 'shared/constants'
import { useScrollTop } from 'shared/hooks/use-scroll-top'
import { isChatOpenedVar } from 'shared/store/chat-state-store'
import { BetaWelcomeMessageModal } from 'shared/ui'
import { useMobileChat } from '../hooks/use-mobile-chat'
import { Footer } from './footer'
import { Header } from './header'
import { MainLayoutWrapper } from './main-layout-wrapper'
import styles from '../main-layout.module.scss'

export const MainLayout: React.FC = () => {
  const isChatOpened = useReactiveVar(isChatOpenedVar)

  const [isChatVisible, setIsChatVisible] = useState(isChatOpened)
  const scrollAreaRef = useRef<HTMLDivElement | null>(null)
  useScrollTop()

  const location = useLocation()
  const isEmptyPage = location.pathname === RouterPathes.passwordRecovery

  useMobileChat(scrollAreaRef)

  // NOTE: commented out due to the mobile version is almost ready
  // const host = window.location.host
  // if (isMobile && host === 'xyro.io') return <MobileStub />

  return (
    <Notification>
      <div
        className={cn(styles.mainLayoutWrapper, {
          [styles.mainLayoutWrapperWithoutChat]: isEmptyPage || !isChatVisible
        })}
        id={HTMLElementsIDs.MAIN_LAYOUT}
      >
        <Navigation />

        <main className={styles.content}>
          <MainLayoutWrapper
            isEmptyPage={Boolean(isEmptyPage)}
            scrollAreaRef={scrollAreaRef}
          >
            <Header>
              <HeaderUserInfo />
            </Header>

            <NavigationMobileModeSelection />

            <Flex
              className={cn(styles.contentWrapper, {
                [styles.contentWrapperWithoutChat]: !isChatOpened
              })}
              pr={{ initial: '0', md: '4' }}
              pt={{ initial: '0', md: '2' }}
              direction={'column'}
              gap='4'
            >
              <Outlet />
              <Footer />
            </Flex>
          </MainLayoutWrapper>
        </main>

        {!isEmptyPage && (
          <Chat
            isChatVisible={isChatVisible}
            setIsChatVisible={setIsChatVisible}
          />
        )}
      </div>

      <ChatMobile />
      <BetaWelcomeMessageModal />
      <AccessDeniedModal />
    </Notification>
  )
}
