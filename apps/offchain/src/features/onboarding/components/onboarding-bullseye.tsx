/* eslint-disable max-lines */
import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { LampOnIcon } from 'shared/icons'
import {
  modeOnboardingBullsEyeBanner1,
  modeOnboardingBullsEyeBanner2,
  modeOnboardingBullsEyeBanner3
} from 'shared/images'
import { OnboardingContainer } from './onboarding-container'
import styles from '../onboarding.module.scss'

export const OnboardingBullsEye: React.FC = () => {
  return (
    <OnboardingContainer>
      <Text
        weight={'bold'}
        className={styles.onboardingPageTitle}
        mb={'4'}
      >
        {"Bull's Eye"}
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
              src={modeOnboardingBullsEyeBanner1}
              alt='modeOnboardingBullsEyeBanner1'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            Bull’s Eye is for those who can analyze the market because the goal
            is to guess the future price as accurately as possible, not just the
            direction (as in Up/Down). It doesn’t matter if the estimate is
            higher or lower than the actual price; what matters is the
            difference between the two.
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
          >
            <img
              src={modeOnboardingBullsEyeBanner2}
              alt='modeOnboardingBullsEyeBanner2'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            Currently, the game is only available for BTC, with plans to add
            other cryptocurrencies. There is one timeframe: 3 minutes, and each
            user has 1 minute (1/3 of the timeframe) to try and guess the exact
            price of the asset at the end of the period.
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
          >
            <img
              src={modeOnboardingBullsEyeBanner3}
              alt='modeOnboardingBullsEyeBanner3'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            size={'4'}
            weight={'bold'}
            className='color-white'
          >
            The game works as follows:
          </Text>

          <ul className={styles.listContainer}>
            <li className={styles.listContainerItem}>
              <Text
                className='color-gray-light'
                weight={'medium'}
                size={'3'}
              >
                {' '}
                The player chooses an amount to play with and enters a price
                estimate.
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-gray-light'
                weight={'medium'}
                size={'3'}
              >
                All player forecasts are compared to the actual price, and the
                one closest to it is selected.
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-gray-light'
                weight={'medium'}
                size={'3'}
              >
                The player whose estimate is closest to the actual price takes
                home 50% of the money in the pool if their forecast hits the
                bull’s eye (closest guess). Those who come second and third in
                terms of precision get smaller prizes.
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-gray-light'
                weight={'medium'}
                size={'3'}
              >
                The player chooses an amount to play with and enters a price
                estimate.
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-gray-light'
                weight={'medium'}
                size={'3'}
              >
                The pool is then reset and starts accumulating funds again.
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-gray-light'
                weight={'medium'}
                size={'3'}
              >
                The platform fee is 10% from losers.
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Flex direction={'column'}>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  If no one reaches the exact price (5$ up or down from the
                  final price), the prize distribution without commission
                  deduction is as follows:
                </Text>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  For 2-5 players: 1st place - 90%, 2nd place - 10%.
                </Text>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  For 6-10 players: 1st place - 75%, 2nd place - 25%.
                </Text>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  For 10+ players: 1st place - 50%, 2nd place - 35%, 3rd place -
                  15%.
                </Text>
              </Flex>
            </li>

            <li className={styles.listContainerItem}>
              <Flex direction={'column'}>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  If one of the players reaches the exact price, the
                  distribution without commission deduction is as follows:
                </Text>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  For 2-5 players: 1st place - 100%.
                </Text>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  For 6-10 players: 1st place - 90%, 2nd place - 10%.
                </Text>
                <Text
                  className='color-gray-light'
                  weight={'medium'}
                  size={'3'}
                >
                  For 10+ players: 1st place - 75%, 2nd place - 15%, 3rd place -
                  15%.
                </Text>
              </Flex>
            </li>
          </ul>
        </Flex>

        <Flex
          className={styles.exampleBox}
          position={'relative'}
          direction={'column'}
        >
          <Flex
            align={'center'}
            gap={'4'}
            mb={'3'}
          >
            <LampOnIcon />

            <Text
              size={'6'}
              weight={'medium'}
              className='color-white'
            >
              Example
            </Text>
          </Flex>

          <Text
            className='color-white'
            size={'4'}
            weight={'medium'}
            mb={'3'}
          >
            Price of Bitcoin: $66,500
          </Text>

          <Text
            className='color-white'
            size={'4'}
            weight={'medium'}
          >
            Guesses:
          </Text>

          <ul className={styles.bullsEyeExampleList}>
            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Player 1: $10 on $66,510
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Player 2: $25 on $66,520
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Player 3: $15 on $66,525
              </Text>
            </li>
          </ul>

          <Text
            className='color-white'
            size={'4'}
            weight={'medium'}
          >
            Total Calculation:
          </Text>

          <ul className={styles.bullsEyeExampleList}>
            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                System commission (15% from losers): $15 * 0.1 = $1.5
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Total: $10 + $25 + $15 = $50
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Net prize pool after commission: $50 - $1.5 = $45
              </Text>
            </li>
          </ul>

          <Text
            className='color-white'
            size={'4'}
            weight={'medium'}
          >
            Determining the Winner:
          </Text>

          <ul className={styles.bullsEyeExampleList}>
            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                The closest guess to $66,500 is Player 1 with $66,510, so Player
                1 wins 1st place.
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Player 2 is the next closest with a guess of $66,520, so they
                take 2nd place.
              </Text>
            </li>
          </ul>

          <Text
            className='color-white'
            size={'4'}
            weight={'medium'}
          >
            Prize Distribution (Based on 2-5 Players):
          </Text>

          <ul className={styles.bullsEyeExampleList}>
            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                1st place gets 90% of the net prize pool: $48.5 * 0.9 = $43.65
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                2nd place gets 10% of the net prize pool: $48.5 * 0.1 = $4.85
              </Text>
            </li>
          </ul>

          <Text
            className='color-white'
            size={'4'}
            weight={'medium'}
          >
            Summary:
          </Text>

          <ul className={styles.bullsEyeExampleList}>
            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Player 1 wins: $43.65
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Player 2 wins: $4.85
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Player 3 wins: $0 (no prize, as they came third).
              </Text>
            </li>
          </ul>
        </Flex>
      </Flex>
    </OnboardingContainer>
  )
}
