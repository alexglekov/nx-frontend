import { useEffect, useState } from 'react'
import * as RadixNav from '@radix-ui/react-navigation-menu'
import { Flex } from '@radix-ui/themes'
import { useLocation } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { XyroLogoLink } from 'shared/ui'
import { getDefaultAccordionValue } from '../get-accordion-value'
import { NavigationHelpLinks } from './navigation-help-links'
import { NavigationLink } from './navigation-link'
import styles from '../navigation.module.scss'

export const Navigation: React.FC = () => {
  const [accordionValue, setAccordionValue] = useState('')
  const location = useLocation()

  useEffect(() => {
    const newAccordionValue = getDefaultAccordionValue(location.pathname)

    if (accordionValue === newAccordionValue) return

    setAccordionValue(newAccordionValue)
  }, [location.pathname])

  return (
    <RadixNav.Root
      className={styles.navigationMenuRoot}
      orientation='vertical'
    >
      <Flex
        direction='column'
        height='100%'
      >
        <XyroLogoLink withText={false} />

        <Flex
          className={styles.navigationItems}
          justify={'between'}
          direction={'column'}
          height={'100%'}
        >
          <Flex className={styles.navigationMenuList}>
            {/* <NavigationLink
              iconType={'games'}
              to={RouterPathes.games}
              title={'Games'}
            />

            <NavigationLink
              iconType={'favorites'}
              to={RouterPathes.favorites}
              title={'Favorites'}
            /> */}

            {/* <NavigationLink
              iconType={'account'}
              to={RouterPathes.accountMyAccount}
              title={'Account'}
            /> */}

            {/* <NavigationLink
              iconType={'referral'}
              to={RouterPathes.referral}
              title={'Referral'}
            /> */}

            {/*
            <NavigationLink
              iconType={'promotions'}
              to={'/promotions'}
              title={'Promotions'}
            />

            <Separator
              size={'1'}
              m={'3'}
            />

            <RadixAccordion.Root
              type={'single'}
              collapsible
              onValueChange={setAccordionValue}
              value={accordionValue}
              className={styles.accordionRoot}
            >
              <RadixAccordion.Item
                value={'more'}
                className={styles.accordionItem}
              >
                <RadixAccordion.Header className={styles.accordionHeader}>
                  <RadixAccordion.Trigger className={styles.accordionTrigger}>
                    <NavigationLink
                      iconType='more'
                      title='More'
                      isTrigger
                    />
                  </RadixAccordion.Trigger>
                </RadixAccordion.Header>
              </RadixAccordion.Item>
            </RadixAccordion.Root> */}
          </Flex>
          {/* <NavigationHelpLinks /> */}
        </Flex>
      </Flex>
    </RadixNav.Root>
  )
}
