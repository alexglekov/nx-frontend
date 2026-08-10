/* eslint-disable max-lines */
import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import {
  modeOnboardingtreasureBanner1,
  modeOnboardingtreasureBanner2,
  modeOnboardingtreasureBanner3,
  modeOnboardingtreasureBanner4
} from 'shared/images'
import { OnboardingContainer } from './onboarding-container'
import styles from '../onboarding.module.scss'

export const OnboardingTreasure: React.FC = () => {
  return (
    <OnboardingContainer>
      <Text
        weight={'bold'}
        className={styles.onboardingPageTitle}
        mb={'4'}
      >
        Treasure
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
              src={modeOnboardingtreasureBanner1}
              alt='modeOnboardingtreasureBanner1'
              className={styles.onboardingBanner}
            />
          </Flex>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
            direction={'column'}
          >
            <Text
              size={'6'}
              weight={'bold'}
              className='color-white'
              mb={'5'}
            >
              Total Balance
            </Text>

            <img
              src={modeOnboardingtreasureBanner2}
              alt='modeOnboardingtreasureBanner2'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            The Total Balance is the sum of your funds from both the Wallet
            Balance and the Treasure Balance. These funds are available for
            games and other activities within the app.
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
            direction={'column'}
          >
            <Text
              size={'6'}
              weight={'bold'}
              className='color-white'
              mb={'5'}
            >
              Wallet Balance
            </Text>

            <img
              src={modeOnboardingtreasureBanner3}
              alt='modeOnboardingtreasureBanner3'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            {`This shows the amount of tokens in your wallet. You can use these
            funds for games. To simplify your game experience, you can
            pre-approve a portion of your Wallet Balance using the "Approve
            Balance" function, allowing you to sign transactions in a single
            action.`}
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
            direction={'column'}
          >
            <Text
              size={'6'}
              weight={'bold'}
              className='color-white'
              mb={'5'}
            >
              Treasure Balance
            </Text>

            <img
              src={modeOnboardingtreasureBanner4}
              alt='modeOnboardingtreasureBanner4'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            {`These are the funds you’ve won from games. Winnings are automatically added to your Treasure Balance. To transfer Treasure Balance funds back to your wallet, you’ll need to use the "Claim Treasure" function. Both Treasure Balance and Wallet Balance can be used for games; however, Treasure Balance is prioritized. `}
          </Text>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
            mt={'5'}
          >
            If you don’t have enough funds in your Treasure Balance for a game,
            the app will automatically use your Wallet Balance.
          </Text>
        </Flex>
      </Flex>
    </OnboardingContainer>
  )
}
