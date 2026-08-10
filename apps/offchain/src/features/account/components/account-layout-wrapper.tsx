import React from 'react'
import { useMutation } from '@apollo/client'
import { Button, Flex, Text } from '@radix-ui/themes'
import { LOG_OUT } from 'api/auth/logout'
import { Outlet, useLocation } from 'react-router-dom'
import { useResponsive } from 'shared/hooks/use-responsive'
import { ExitLogout } from 'shared/icons'
import { AccountEmailVerified } from './account-email-verified'
import { AccountSectionSwitcher } from './account-section-switcher'
import styles from '../account.module.scss'

export const AccountLayoutWrapper: React.FC = () => {
  const [isMobile] = useResponsive('xs')
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const emailToken = queryParams.get('confirmEmail')

  const [commitLogout, { loading }] = useMutation(LOG_OUT)

  const handleLogout = async () => {
    await commitLogout()

    window.location.reload()
  }

  if (emailToken) {
    return <AccountEmailVerified emailToken={emailToken} />
  }

  return (
    <Flex
      p={{ initial: '1', sm: '5' }}
      direction={'column'}
      gap={'3rem'}
    >
      <Flex
        direction={'column'}
        gap={'2rem'}
      >
        <Text
          className='color-white'
          size={'9'}
          weight={'light'}
        >
          Profile
        </Text>

        <Flex
          gap={{ initial: '2', sm: '0' }}
          align={'center'}
          justify={'between'}
          width={'100%'}
          className={styles.accountNavigation}
        >
          <AccountSectionSwitcher />

          {!isMobile ?
            <Button
              size={'4'}
              variant='outline'
              color='pink'
              onClick={handleLogout}
              disabled={loading}
            >
              <ExitLogout />

              <Text
                size={'2'}
                weight={'bold'}
                className={styles.logoutText}
              >
                LOG OUT
              </Text>
            </Button>
          : null}
        </Flex>
      </Flex>

      <Outlet />
    </Flex>
  )
}
