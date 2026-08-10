/* eslint-disable max-lines */
import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { LampOnIcon } from 'shared/icons'
import {
  memeWarsOnboardingStep1Path,
  memeWarsOnboardingStep2Path,
  memeWarsOnboardingStep3Path
} from 'shared/images'
import { OnboardingContainer } from './onboarding-container'
import styles from '../onboarding.module.scss'

export const OnboardingMemeWars: React.FC = () => {
  return (
    <OnboardingContainer>
      <Text
        weight={'bold'}
        className={styles.onboardingPageTitle}
        mb={'4'}
      >
        Meme Wars
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
              src={memeWarsOnboardingStep1Path}
              alt='modeOnboardingUpDownBanner1'
              className={styles.onboardingBannerRounded}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            Meme Wars is a game mode where top memecoins compete. Pick your
            favorite and watch it win – stay tuned to the news feeds!
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
          >
            <img
              src={memeWarsOnboardingStep2Path}
              alt='modeOnboardingUpDownBanner2'
              className={styles.onboardingBannerRounded}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            To start playing, select a memecoin, choose an amount of USDT (1, 3,
            or 5), and hit the Play button.
          </Text>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
            mt={'3'}
          >
            A timer shows the time left (** seconds) until the round ends.
            Players have ** seconds to decide and click the button, then wait
            for the result.
          </Text>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
            mt={'3'}
          >
            The multi-graph shows the % growth of each coin in real time – so
            you don’t miss your victory!
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
          >
            <img
              src={memeWarsOnboardingStep3Path}
              alt='modeOnboardingUpDownBanner3'
              className={styles.onboardingBannerRounded}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            If two or more coins grow by the same %, the game is canceled, and
            all funds are refunded to participants.
          </Text>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
            mt={'3'}
          >
            The winner is the coin that rises the most in price over a set
            period. Winnings are shared among those who voted for it (based on
            their stake), minus a 5% platform fee from the losing pool.
          </Text>
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
          >
            Coin Pools:
          </Text>

          <ul className={styles.bullsEyeExampleList}>
            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Coin 1: 5 players, $17
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Coin 2: 10 players, $10
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Coin 3: 2 players, $8 (Bob with $5, another player with $3)
              </Text>
            </li>
          </ul>

          <Text
            className='color-white'
            size={'4'}
            weight={'medium'}
          >
            Winning Coin:
          </Text>

          <ul className={styles.bullsEyeExampleList}>
            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Bob predicted Coin 3 would win.
              </Text>
            </li>
          </ul>

          <Text
            className='color-white'
            size={'4'}
            weight={'medium'}
          >
            Prize Pool Calculation:
          </Text>

          <ul className={styles.bullsEyeExampleList}>
            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Total losing pool = Coin 1 + Coin 2 = $17 + $10 = $27
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                After 5% platform fee: $27 * 0.95 = $25.65 (final winnings pool
                for Coin 3)
              </Text>
            </li>
          </ul>

          <Text
            className='color-white'
            size={'4'}
            weight={'medium'}
          >
            Winnings Distribution (based on stake % in Coin 3’s pool):
          </Text>

          <ul className={styles.bullsEyeExampleList}>
            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Total Coin 3 pool: $8
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Bob’s stake: $5, second player’s stake: $3
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Bob’s winnings: $25.65 / 8 * 5 = $16.03
              </Text>
            </li>

            <li>
              <Text
                size={'3'}
                className='color-white'
              >
                Second player’s winnings: $25.65 / 8 * 3 = $9.62
              </Text>
            </li>
          </ul>

          <Text
            className='color-white'
            size={'4'}
            weight={'medium'}
          >
            This ensures fair distribution based on each player’s contribution
            to the winning pool.
          </Text>
        </Flex>
      </Flex>
    </OnboardingContainer>
  )
}
