import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { BUYBACK_TABS } from '../constants'
import styles from '../buy-back.module.scss'

export const BuyBackSwitcher = () => {
  const { pathname } = useLocation()

  return (
    <Flex gap={'5'}>
      {BUYBACK_TABS.map(switchType => {
        const isActive = pathname === switchType.href

        return (
          <RouterLink
            key={switchType.title}
            to={switchType.href}
            aria-pressed={isActive}
            data-testid={switchType.dataTestId}
            className={cn(styles.buyBackSwitchButton, {
              [styles.buyBackSwitchButtonActive]: isActive
            })}
          >
            <Text
              size={'3'}
              weight={'bold'}
            >
              {switchType.title}
            </Text>
          </RouterLink>
        )
      })}
    </Flex>
  )
}
