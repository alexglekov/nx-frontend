/* eslint-disable max-lines */
import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { LampOnIcon } from 'shared/icons'
import {
  modeOnboardingUpDownBanner1,
  modeOnboardingUpDownBanner2,
  modeOnboardingUpDownBanner3,
  modeOnboardingUpDownBanner4,
  modeOnboardingUpDownBanner5
} from 'shared/images'
import { OnboardingContainer } from './onboarding-container'
import styles from '../onboarding.module.scss'

export const OnboardingUpDown: React.FC = () => {
  return (
    <OnboardingContainer>
      <Text
        weight={'bold'}
        className={styles.onboardingPageTitle}
        mb={'4'}
      >
        Up/Down
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
              src={modeOnboardingUpDownBanner1}
              alt='modeOnboardingUpDownBanner1'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            Up/Down is the quickest and easiest of the four games: initially,
            only one cryptocurrency (BTC) is available and there are only two
            options - up or down. A player needs to guess if the price will be
            higher or lower at a certain point after the timer resets.
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
          >
            <img
              src={modeOnboardingUpDownBanner2}
              alt='modeOnboardingUpDownBanner2'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            There’s no need to name a specific price target: if you select “Up”
            and the future price is even $0.01 above the initial price, you
            win.Users need to lock up an amount of USDT on Arbitrum to play.
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
          >
            <img
              src={modeOnboardingUpDownBanner3}
              alt='modeOnboardingUpDownBanner3'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            All the submitted funds are automatically grouped into two pools: Up
            and Down. Users can see how much money and how many players are in
            each pool, as well as the potential payout in case of winning.
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
          >
            <img
              src={modeOnboardingUpDownBanner4}
              alt='modeOnboardingUpDownBanner4'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            There’s also a timer showing the time remaining until the end (60
            seconds) of the game round. Players have limited time to make their
            decision (60 seconds) and click a button, after which they have to
            wait for the result.
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
          >
            <img
              src={modeOnboardingUpDownBanner5}
              alt='modeOnboardingUpDownBanner5'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            The reward is determined by the size of one’s bid and the size of
            the two pools. The losing pool is divided among the winners after a
            15% platform fee is deducted.
          </Text>
        </Flex>

        <Flex
          className={styles.exampleBox}
          position={'relative'}
          direction={'column'}
        >
          {/* TODO: Add example box if needed */}
          {/* <img
            src={upDownExampleBoxArtifacts}
            alt='example box artifacts'
            className={styles.exampleBoxArtifacts}
          /> */}

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
            size={'3'}
            weight={'medium'}
            mb={'5'}
          >
            The initial BTC price is $67,500, and some minutes later it reaches
            $67,550, so those who voted “Up” win. At the end of the cycle, the
            Up pool has 100 users and $1,500 in USDT, while the Down pool has 80
            users and $1,200 in USDT. Bob’s Up bid was $25, or 1/60th of the
            total Up pool. Therefore, his reward will be (after the 15% platform
            fee) 1/60th of the Down pool size, or 1,200 * 0.85 / 60 = $17.
          </Text>

          <Text
            className='color-white'
            size={'3'}
            weight={'medium'}
          >
            That’s a 68% profit on a 0.105% price move. If Bob was margin
            trading instead of using XYRO, he would need to use 800x leverage –
            and would almost certainly get liquidated on intraday volatility.{' '}
            <span className={styles.exampleBoxSpecialText}>
              In other words, the Up/Down game provides better returns than any
              major leverage trading platform.
            </span>
          </Text>
        </Flex>
      </Flex>
    </OnboardingContainer>
  )
}
