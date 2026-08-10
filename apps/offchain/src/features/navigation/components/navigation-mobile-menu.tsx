import { FC, MouseEventHandler, useCallback } from 'react'
import { Button, Flex, Grid } from '@radix-ui/themes'
import cn from 'classnames'
import { useLocation } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import {
  ChatIcon,
  HomeRoundedIcon,
  NotificationBellFilledIcon
} from 'shared/icons'
import { XyroButton } from 'shared/ui'
import { AppSwitch } from 'shared/ui/app-switch/app-switch'
import { XyroLink } from 'shared/ui/xyro-link'
import { MENU_ICON_SIZE } from '../constants'
import { mobileNavSectionVar } from '../store/navigation-mobile'
import { ModeSelectionToggle } from './navigation-mobile-mode-selection-toggle'
import styles from '../navigation.module.scss'

export const NavigationMobileMenu: FC = ({}) => {
  const [isMobile] = useResponsive(['xs', 'sm'])

  return (
    <Flex
      direction={'column'}
      gap={'3'}
    >
      <Grid
        align={'center'}
        justify={'start'}
        columns={'auto 1fr'}
      >
        {/* <HomeLink /> */}

        {/* <ModeSelectionToggle type={'more'} /> */}

        {/* NOTE: this buttons temporary postponed until features will be required on the mobile layout */}
        {/* <Flex gap='1'>
        <NotificationsButtos />
        <ChatButton />
      </Flex> */}
      </Grid>

      {/* {isMobile && <AppSwitch />} */}
    </Flex>
  )
}

const HomeLink: FC = () => {
  const { pathname } = useLocation()
  const isCurrentPageHome = pathname === RouterPathes.home

  return (
    <XyroLink
      to='/'
      onClick={() => mobileNavSectionVar(null)}
    >
      <XyroButton
        shape='cutted-left'
        isIconOnly
        size='3'
        className={styles.homeButton}
      >
        <HomeRoundedIcon
          className={cn({ [styles.homeButtonActive]: isCurrentPageHome })}
          width={MENU_ICON_SIZE}
          height={MENU_ICON_SIZE}
          color={isCurrentPageHome ? 'var(--c-a-pink)' : 'var(--gray)'}
        />
      </XyroButton>
    </XyroLink>
  )
}

// TODO: implement link to notifications
const NotificationsButtos: FC = () => {
  const handleNotificationClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(event => {
    throw new Error('Function not implemented.')
  }, [])

  return (
    <Button
      onClick={handleNotificationClick}
      variant='surface'
      className={styles.navButton}
    >
      <NotificationBellFilledIcon
        color='var(--gray)'
        height={MENU_ICON_SIZE}
        width={MENU_ICON_SIZE}
      />
    </Button>
  )
}

const ChatButton: FC = () => {
  // TODO: implement chat sidebar and toggling

  const handleChatClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    event => {
      throw new Error('Function not implemented.')
    },
    []
  )

  return (
    <Button
      onClick={handleChatClick}
      variant='surface'
      className={styles.navButton}
    >
      <ChatIcon
        height={MENU_ICON_SIZE}
        width={MENU_ICON_SIZE}
        color='var(--gray)'
      />
    </Button>
  )
}
