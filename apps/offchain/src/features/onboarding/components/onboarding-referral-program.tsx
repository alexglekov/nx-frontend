import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import {
  modeOnboardingReferralProgramBanner1,
  modeOnboardingReferralProgramBanner2
} from 'shared/images'
import { OnboardingContainer } from './onboarding-container'
import styles from '../onboarding.module.scss'

export const OnboardingReferralProgram: React.FC = () => {
  return (
    <OnboardingContainer>
      <Text
        weight={'bold'}
        className={styles.onboardingPageTitle}
        mb={'4'}
      >
        Referral Program
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
              The XYRO platform offers a referral program to encourage users to
              invite others. The program rewards users who bring in active
              participants that engage in gameplay and spend time on the
              platform. XYRO offers a portion of the commission it earns from
              games played by users who invite new members to the platform.
            </Text>
          </Flex>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
          >
            <img
              src={modeOnboardingReferralProgramBanner1}
              alt='modeOnboardingReferralProgramBanner1'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            To invite a user, simply copy your personal link from the referral
            section and send it to another user. Once they register through your
            link, you will become their referrer.
          </Text>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
            mt={'2'}
          >
            As a reward for bringing in new users, the XYRO platform shares 25%
            of the commissions earned from those users with their referrers.
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
          >
            <img
              src={modeOnboardingReferralProgramBanner2}
              alt='modeOnboardingReferralProgramBanner2'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            To claim your rewards, go to the payout page and click the “Claim
            Payout” button. The processing time for requests is up to 24 hours,
            after which you will receive your reward. 
          </Text>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
            mt={'6'}
          >
            The minimum payout amount is 10 USDT.
          </Text>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
            mt={'6'}
          >
            Additionally, the payout history is displayed on this page.
          </Text>
        </Flex>
      </Flex>
    </OnboardingContainer>
  )
}
