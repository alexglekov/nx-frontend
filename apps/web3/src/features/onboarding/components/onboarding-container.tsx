import React from 'react'
import { Flex, Separator, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import {
  PRIMARY_ONBOARDING_NAVIGATION,
  SECONDARY_ONBOARDING_NAVIGATION
} from '../constants'
import styles from '../onboarding.module.scss'

interface Props {
  children: React.ReactNode
}
export const OnboardingContainer: React.FC<Props> = ({ children }) => {
  return (
    <Flex
      className={styles.onboardingContainer}
      direction={{ initial: 'column', sm: 'row' }}
    >
      <Flex
        className={styles.navigationListContainer}
        direction={'column'}
      >
        <Flex direction={'column'}>
          <Text
            className={cn('color-white', styles.onboardingNavigationItem)}
            size={{ initial: '1', sm: '3' }}
            weight={'bold'}
          >
            Game Modes
          </Text>
          <Flex
            direction={{ initial: 'row', sm: 'column' }}
            gap={'2'}
          >
            {PRIMARY_ONBOARDING_NAVIGATION.map(n => {
              const isActive = window.location.pathname === n.path

              return (
                <Link
                  key={n.path}
                  to={n.path}
                  className={cn(styles.onboardingNavigationItem, {
                    [styles.onboardingNavigationItemActive]: isActive
                  })}
                >
                  <Text
                    className={cn('color-gray-light', {
                      [styles.onboardingNavigationItemTextActive]: isActive
                    })}
                    size={{ initial: '1', sm: '3' }}
                    weight={isActive ? 'bold' : 'medium'}
                  >
                    {n.title}
                  </Text>
                </Link>
              )
            })}
          </Flex>
        </Flex>

        <Separator
          size={'4'}
          my={'2'}
        />

        <Flex direction={'column'}>
          <Text
            className={cn('color-white', styles.onboardingNavigationItem)}
            size={{ initial: '1', sm: '3' }}
            weight={'bold'}
          >
            XYRO App
          </Text>

          <Flex
            gap={'2'}
            direction={{ initial: 'row', sm: 'column' }}
          >
            {SECONDARY_ONBOARDING_NAVIGATION.map(n => {
              const isActive = window.location.pathname === n.path

              return (
                <Link
                  key={n.path}
                  to={n.path}
                  className={cn(styles.onboardingNavigationItem, {
                    [styles.onboardingNavigationItemActive]: isActive
                  })}
                >
                  <Text
                    className={cn('color-gray-light', {
                      [styles.onboardingNavigationItemTextActive]: isActive
                    })}
                    size={{ initial: '1', sm: '3' }}
                    weight={isActive ? 'bold' : 'medium'}
                  >
                    {n.title}
                  </Text>
                </Link>
              )
            })}
          </Flex>
        </Flex>
      </Flex>

      <Flex
        direction={'column'}
        className={styles.onboardingModeContentContainer}
      >
        {children}
      </Flex>
    </Flex>
  )
}
