/* eslint-disable max-lines */
import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import {
  modeOnboardingRewardsSystemBanner1,
  modeOnboardingRewardsSystemBanner2,
  modeOnboardingRewardsSystemBanner3
} from 'shared/images'
import { OnboardingContainer } from './onboarding-container'
import styles from '../onboarding.module.scss'

export const OnboardingRewardsSystem: React.FC = () => {
  return (
    <OnboardingContainer>
      <Text
        weight={'bold'}
        className={styles.onboardingPageTitle}
        mb={'4'}
      >
        Rewards System
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
            <Text
              className='color-gray-light'
              weight={'medium'}
              size={'3'}
            >
              Our platform features a reward system where users can earn points.
              Upon launch, the platform will kick off its first season,
              dedicated to the TGE. After the TGE, the seasons will be regular.
              Points accumulate within each season, and at the end of the
              season, an airdrop takes place.
            </Text>
          </Flex>
        </Flex>

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
              mb={'5'}
            >
              Rewards
            </Text>

            <img
              src={modeOnboardingRewardsSystemBanner1}
              alt='modeOnboardingRewardsSystemBanner1'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Flex
            direction={'column'}
            gap={'2'}
          >
            <Text
              className='color-gray-light'
              weight={'bold'}
              size={'4'}
            >
              Daily Tasks
            </Text>

            <Text
              className='color-gray-light'
              weight={'medium'}
              size={'3'}
            >
              The XYRO platform offers three types of daily tasks. The first
              type is a task with a reward in native tokens of the ETH network.
              The second type is a standard task with points as the reward.
              Additionally, there are series of similar tasks with points as
              rewards, for example, winning 1, 2, or 5 games.
            </Text>
          </Flex>

          <Flex
            direction={'column'}
            gap={'2'}
            mt={'5'}
          >
            <Text
              className='color-gray-light'
              weight={'bold'}
              size={'4'}
            >
              Challenges
            </Text>

            <Text
              className='color-gray-light'
              weight={'medium'}
              size={'3'}
            >
              The platform will also offer various challenges. All challenges
              reward points. Upon registration, only the first challenge is
              available, which is dedicated to completing the profile. Once this
              is completed, the rest of the challenges become available. There
              is also a challenge dedicated to levels, where progress changes
              with each level gained, allowing users to earn rewards.
            </Text>
          </Flex>
        </Flex>

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
              mb={'5'}
            >
              Levels
            </Text>

            <img
              src={modeOnboardingRewardsSystemBanner2}
              alt='modeOnboardingRewardsSystemBanner2'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            XYRO users can level up their accounts. With each level increase,
            users earn a reward in points. The level is directly linked to the
            number and size of the games in which the user participates. Only
            completed games are counted, and canceled games do not contribute to
            the level.
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
            direction={'column'}
          >
            <img
              src={modeOnboardingRewardsSystemBanner3}
              alt='modeOnboardingRewardsSystemBanner3'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            To calculate the current level, the total fee paid by the user is
            considered. For each game, the user’s share of the total game fee is
            calculated and recorded. Upon reaching a new level, users receive a
            reward for that level.
          </Text>
        </Flex>

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
              mb={'4'}
            >
              Cashback
            </Text>
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            During the Mainnet phase until the TGE, XYRO is offering a cashback
            feature for testing the platform and attracting users. This feature
            allows users to receive back the fees they have paid.
          </Text>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
            mt={'5'}
          >
            All spent fees are tracked and displayed in the player’s profile.
            The cashback percentage ranges from 25% to 75%, depending on the
            user’s level. Payouts will be made in USDT, i.e., in the currency in
            which the fees were paid. The payout will occur after the TGE. The
            interface will include a “Claim Cashback” button
          </Text>
        </Flex>
      </Flex>
    </OnboardingContainer>
  )
}
