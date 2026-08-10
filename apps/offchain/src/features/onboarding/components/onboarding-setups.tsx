/* eslint-disable max-lines */
import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { LampOnIcon } from 'shared/icons'
import {
  modeOnboardingSetupsBanner1,
  modeOnboardingSetupsBanner2,
  modeOnboardingSetupsBanner3
} from 'shared/images'
import { OnboardingContainer } from './onboarding-container'
import styles from '../onboarding.module.scss'

export const OnboardingSetups: React.FC = () => {
  return (
    <OnboardingContainer>
      <Text
        weight={'bold'}
        className={styles.onboardingPageTitle}
        mb={'4'}
      >
        Setups
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
              src={modeOnboardingSetupsBanner1}
              alt='modeOnboardingSetupsBanner1'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            Setups are trading ideas, for example, “Long ETH, TP $3,183 / SL
            $3,060, duration 6 hours.” Anyone can post a setup, although this
            feature is aimed primarily at pro traders and influencers, who earn
            a percentage from all users who join their setups.
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
          >
            <img
              src={modeOnboardingSetupsBanner2}
              alt='modeOnboardingSetupsBanner2'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            size={'4'}
            weight={'bold'}
            className='color-white'
          >
            A setup’s creator needs to select:
          </Text>

          <ul className={styles.listContainer}>
            <li className={styles.listContainerItem}>
              <Text
                className='color-gray-light'
                weight={'medium'}
                size={'3'}
              >
                Asset
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-gray-light'
                weight={'medium'}
                size={'3'}
              >
                Long or Short position
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-gray-light'
                weight={'medium'}
                size={'3'}
              >
                Duration (min 30 min, max 24 weeks)
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-gray-light'
                weight={'medium'}
                size={'3'}
              >
                Take Profit and Stop Loss values.
              </Text>
            </li>
          </ul>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
            mt={'3'}
          >
            Once a setup is posted, other users can either vote for its success
            by clicking on the TP icon (i.e., they believe the price will reach
            the Take Profit level) or for its failure by clicking on SL. Users
            can choose the amount to bid, and new forecasts can be submitted
            only as long as there is enough time remaining until the setup
            expires (e.g., users can join the game until 1/3 of the time has
            passed).
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex
            width={'100%'}
            mb={'4'}
          >
            <img
              src={modeOnboardingSetupsBanner3}
              alt='modeOnboardingSetupsBanner3'
              className={styles.onboardingBanner}
            />
          </Flex>

          <Text
            className='color-gray-light'
            weight={'medium'}
            size={'3'}
          >
            Each setup accumulates bids in two pools: TP and SL (those who agree
            with the setup author and those who don’t). The amounts in the pools
            determine the earnings multiplier, which constantly changes.
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
            size={'3'}
            weight={'medium'}
          >
            A trader posts the following idea:{' '}
          </Text>

          <Text
            className='color-white'
            size={'3'}
            weight={'medium'}
            mb={'5'}
          >
            A trader posts the following idea: Long ETH at $3,000, TP $3,100, SL
            $2,950, duration 24 hours. There are $5,000 in bids in the TP pool
            and $10,000 in the SL pool (most users think the trader is wrong),
            so the current multiplier is 2. Bob, however, is sure the price will
            go up, so he places $50 in the TP pool. With the 2x multiplier, he
            stands to win almost $100 (minus the 10% author’s fee and the 10%
            platform fee).
          </Text>

          <Text
            className='color-white'
            size={'3'}
            weight={'medium'}
            mb={'7'}
          >
            As the price starts moving up, more people join the TP side, and
            fewer join the SL side. At the end of the round, there are $15,000
            in the TP pool and $12,000 in the SL pool, so the final multiplier
            is 0.8.
          </Text>

          <Text
            size={'6'}
            weight={'bold'}
            className='color-white'
          >
            Bob’s winnings:
          </Text>

          <ul className={styles.listContainer}>
            <li className={styles.listContainerItem}>
              <Text
                className='color-white'
                weight={'medium'}
                size={'3'}
              >
                Platform fee = 10% of the losing and winning pools = 0.1 *
                $12,000 = $1,200
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-white'
                weight={'medium'}
                size={'3'}
              >
                Setup author’s reward = 10% of both pools = 0.1 * $27,000 =
                $2,700
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-white'
                weight={'medium'}
                size={'3'}
              >
                To be distributed to winners = $9,600
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-white'
                weight={'medium'}
                size={'3'}
              >
                Each $1 in the winning pool earns $9,600 / $15,000 = $0.64
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-white'
                weight={'medium'}
                size={'3'}
              >
                Bob’s winnings: $50 * 0.64 = $32.
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-white'
                weight={'medium'}
                size={'3'}
              >
                Bob receives $45 out of his $50, as $5 (10%) goes to the author
                of the setup. In total, Bob receives $45 + $32 = $77.
              </Text>
            </li>

            <li className={styles.listContainerItem}>
              <Text
                className='color-white'
                weight={'medium'}
                size={'3'}
              >
                This isn’t the $100 he had hoped for, but it’s still a $27
                profit.
              </Text>
            </li>
          </ul>

          <Text
            className='color-white'
            size={'3'}
            weight={'medium'}
            mt={'6'}
          >
            Which idea one chooses depends on one’s risk appetite and strategy.
            Setups by influencers with high win rates may offer a higher chance
            of winning on the TP side, but as most users join that side, the
            multiplier will be low. Joining the SL side is riskier but offers
            higher rewards. Joining setups with the highest multiplier means
            going against the majority, but users can check the author’s
            previous setups and win rate to assess their ability to analyze the
            market.
          </Text>

          <Text
            className='color-white'
            size={'3'}
            weight={'medium'}
            mt={'6'}
          >
            A user with good crypto trading experience might attract many
            supporters, even if they are occasionally wrong. For instance, after
            ETF approval, many believed BTC would rise quickly to $52,000, but
            instead, it dropped below $43,000.
          </Text>
        </Flex>
      </Flex>
    </OnboardingContainer>
  )
}
