import { useEffect, useState } from 'react'
import * as RadixAccordion from '@radix-ui/react-accordion'
import * as RadixNav from '@radix-ui/react-navigation-menu'
import { Flex, Separator } from '@radix-ui/themes'
import { STAND } from 'app/constants'
import { Stand } from 'app/types'
import { useClaimableRewards } from 'features/rewards/hooks/use-claimable-rewards'
import { useLocation } from 'react-router-dom'
import { DataTestIDs, RouterPathes } from 'shared/constants'
import { XyroLogoLink } from 'shared/ui'
import { gamesLinks, MODE_TYPE_TO_ICON_MAP, moreLinks } from '../constants'
import { getDefaultAccordionValue } from '../get-accordion-value'
import { NavigationHelpLinks } from './navigation-help-links'
import { NavigationLink } from './navigation-link'
import styles from '../navigation.module.scss'

export const Navigation: React.FC = () => {
  const [accordionValue, setAccordionValue] = useState('')
  const location = useLocation()
  const { isClaimable } = useClaimableRewards()

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
            <NavigationLink
              iconType='home'
              to={RouterPathes.home}
              dataTestID={buttonNavBarHome}
            />

            <RadixAccordion.Root
              type={'single'}
              collapsible
              onValueChange={setAccordionValue}
              value={accordionValue}
              className={styles.accordionRoot}
            >
              <RadixAccordion.Item
                value={'games'}
                className={styles.accordionItem}
              >
                <RadixAccordion.Header className={styles.accordionHeader}>
                  <RadixAccordion.Trigger className={styles.accordionTrigger}>
                    <NavigationLink
                      iconType='games'
                      title={'Games'}
                      isTrigger
                      dataTestID={buttonNavBarGames}
                    />
                  </RadixAccordion.Trigger>
                </RadixAccordion.Header>

                <RadixAccordion.Content className={styles.accordionContent}>
                  <Flex
                    direction={'column'}
                    gap={'2'}
                  >
                    {gamesLinks.map(link => (
                      <NavigationLink
                        key={link.to}
                        iconType={link.iconType}
                        to={link.to}
                        title={link.title}
                        dataTestID={link.dataTestID}
                      />
                    ))}
                  </Flex>
                </RadixAccordion.Content>
              </RadixAccordion.Item>

              <Separator
                size={'1'}
                m={'3'}
              />

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
                      dataTestID={buttonNavBarMore}
                    />
                  </RadixAccordion.Trigger>
                </RadixAccordion.Header>

                <RadixAccordion.Content className={styles.accordionContent}>
                  <Flex
                    direction={'column'}
                    gap={'2'}
                  >
                    {moreLinks.map(link => {
                      if (!link.isReleased) {
                        return null
                      }

                      const isRewards = link.iconType === 'rewards'
                      const ExtraIcon = MODE_TYPE_TO_ICON_MAP?.['rewards-extra']

                      return (
                        <NavigationLink
                          key={link.to}
                          iconType={link.iconType}
                          to={link.to}
                          title={link.title}
                          dataTestID={link.dataTestID}
                          ExtraIcon={
                            isRewards && isClaimable ? ExtraIcon : undefined
                          }
                        />
                      )
                    })}
                  </Flex>
                </RadixAccordion.Content>
              </RadixAccordion.Item>
            </RadixAccordion.Root>
          </Flex>
          <NavigationHelpLinks />
        </Flex>
      </Flex>
    </RadixNav.Root>
  )
}

const { buttonNavBarGames, buttonNavBarMore, buttonNavBarHome } = DataTestIDs
