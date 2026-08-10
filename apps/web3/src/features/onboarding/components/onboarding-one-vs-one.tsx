/* eslint-disable max-lines */
import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import {
  modeOnboardingOneVsOneBanner1,
  modeOnboardingOneVsOneBanner2,
  modeOnboardingOneVsOneBanner3
} from 'shared/images'
import { OnboardingContainer } from './onboarding-container'
import styles from '../onboarding.module.scss'

export const OnboardingOneOvOne: React.FC = () => {
  return (
    <OnboardingContainer>
      <Text
        weight={'bold'}
        className={styles.onboardingPageTitle}
        mb={'4'}
      >
        1vs1
      </Text>

      <Flex
        direction={'column'}
        className={styles.upDownContentContainer}
      >
        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
          >
            <img
              src={modeOnboardingOneVsOneBanner1}
              alt='modeOnboardingOneVsOneBanner1'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            1vs1 is the most creative of the four game modes: any user can
            create their own game and publish it on the platform or propose it
            privately to another user.
          </Text>
        </Flex>

        <Flex
          direction={'column'}
          gap={'3'}
        >
          <Flex direction={'column'}>
            <Flex
              width={'100%'}
              mb={'4'}
              direction={'column'}
            >
              <Text
                size={'8'}
                weight={'bold'}
                className='color-white'
                mb={'3'}
              >
                Here’s how creating a game works:
              </Text>
              <img
                src={modeOnboardingOneVsOneBanner2}
                alt='modeOnboardingOneVsOneBanner2'
                className={styles.onboardingBanner}
              />
            </Flex>

            <ul className={styles.listContainer}>
              <li className={styles.listContainerItem}>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  Select an asset
                </Text>
              </li>

              <li className={styles.listContainerItem}>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  Select the price target
                </Text>
              </li>

              <li className={styles.listContainerItem}>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  The game works similarly to Bull’s Eye mode: the player
                  estimates that the price will reach a certain point, and the
                  opponent suggests their own price. The one whose guess is
                  closer to the actual price wins
                </Text>
              </li>

              <li className={styles.listContainerItem}>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  Select the duration (from 5 min to 4 weeks)
                </Text>
              </li>
            </ul>
          </Flex>

          <Flex direction={'column'}>
            <Flex
              width={'100%'}
              mb={'4'}
            >
              <img
                src={modeOnboardingOneVsOneBanner3}
                alt='modeOnboardingOneVsOneBanner3'
                className={styles.onboardingBanner}
              />
            </Flex>

            <ul className={styles.listContainer}>
              <li className={styles.listContainerItem}>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  Select an amount in USDT — the opponent will need to match it
                </Text>
              </li>

              <li className={styles.listContainerItem}>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  Choose whether the game should be public (in which case it
                  will be posted on the list of available games and anyone can
                  join) or private (if the user wants to send it to a specific
                  person).
                </Text>
              </li>

              <li className={styles.listContainerItem}>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  If private mode is selected, generate an invite link and send
                  it via email, messengers, etc
                </Text>
              </li>

              <li className={styles.listContainerItem}>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  Create the game; the amount will be blocked in the account
                  balance. The user will see their forecast on their dashboard
                </Text>
              </li>
            </ul>
          </Flex>
        </Flex>

        <Flex
          className={styles.exampleBoxWithoutBackground}
          position={'relative'}
          direction={'column'}
        >
          <Text
            className='color-gray-liht'
            size={'3'}
            weight={'medium'}
            mb={'5'}
          >
            In the future, users will also be able to create 1vs1 games centered
            on real-world events.
          </Text>

          <Text
            className='color-gray-liht'
            size={'3'}
            weight={'medium'}
            mb={'5'}
          >
            {
              "Price data for all assets is Chanklink data feeds from the world's largest verified exchanges"
            }
          </Text>

          <Text
            className='color-gray-liht'
            size={'5'}
            weight={'bold'}
            mb={'5'}
          >
            User-Friendly Guide for Managing Your Balance in the App
          </Text>
        </Flex>
      </Flex>
    </OnboardingContainer>
  )
}
