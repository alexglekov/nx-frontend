/* eslint-disable max-lines */
import { RouterPathes } from 'shared/constants'
import {
  OnboardingBullsEye,
  OnboardingOneVsOne,
  OnboardingSetups,
  OnboardingUpDown
} from 'shared/icons'
import {
  upDownOnboardingStep1Path,
  upDownOnboardingStep2Path,
  upDownOnboardingStep3Path,
  bullsEyeOnboardingStep1Path,
  bullsEyeOnboardingStep2Path,
  bullsEyeOnboardingStep3Path,
  oneVsOneOnboardingStep1Path,
  oneVsOneOnboardingStep2Path,
  oneVsOneOnboardingStep3Path,
  setupsOnboardingStep1Path,
  setupsOnboardingStep2Path,
  setupsOnboardingStep3Path,
  memeWarsOnboardingStep1Path,
  memeWarsOnboardingStep2Path,
  memeWarsOnboardingStep3Path
} from 'shared/images'
import { OnboardingNavigationObject } from './types'

export const ONBOARDING_GAME_MODES = {
  upDown: {
    title: 'Up/Down',
    logo: OnboardingUpDown,
    description:
      'One of the fastest and most competitive game modes! Perfect for beginners - all you have to do is guess the direction in which the Bitcoin price will go! Every 60 seconds there’s a new opportunity to win!',
    headingFooterBackgroundImage: '',
    steps: [
      {
        title: 'Take a guess',
        description: 'Select whether the cost of the Bitcoin goes up or down.',
        image: upDownOnboardingStep1Path
      },
      {
        title: 'Hypnotize the chart',
        description: 'Will the price be higher or lower in 60 seconds?',
        image: upDownOnboardingStep2Path
      },
      {
        title: 'Win',
        description:
          "If your guess is accurate, you'll share the winnings with others who made similar decisions.",
        image: upDownOnboardingStep3Path
      }
    ]
  },
  oneVsOne: {
    title: '1vs1',
    logo: OnboardingOneVsOne,
    description:
      'Crypto-duels! Create one-on-one games and send them to other users. Play with friends or strangers and turn your knowledge into wins!',
    headingFooterBackgroundImage: '',
    steps: [
      {
        title: 'Select',
        description: 'Top assets, different duration & bid size!',
        image: oneVsOneOnboardingStep1Path
      },
      {
        title: 'Guess the price',
        description:
          'Think you can nail the value of a crypto asset by the end of the timeframe? Step up and take the challenge!',
        image: oneVsOneOnboardingStep2Path
      },
      {
        title: 'Win',
        description:
          "Get closest to the actual asset price by the end of the timeframe, and you win! The winner's prize is the loser's bid!",
        image: oneVsOneOnboardingStep3Path
      }
    ]
  },
  bullsEye: {
    title: "Bull's Eye",
    logo: OnboardingBullsEye,
    description:
      'Crypto-battle: guess and win! Join a game, forecast Bitcoin prices. Turn crypto insights into exciting victories!',
    headingFooterBackgroundImage: '',
    steps: [
      {
        title: 'Join the game',
        description:
          'Games are created automatically, wait for the new game to start and join in!',
        image: bullsEyeOnboardingStep1Path
      },
      {
        title: 'Take a guess',
        description:
          'Guess what the value of the asset will be after a specified time and start the game.',
        image: bullsEyeOnboardingStep2Path
      },
      {
        title: 'Wait for the results',
        description:
          'Claim a bigger share for an exact guess or a solid portion for the closest one among all players.',
        image: bullsEyeOnboardingStep3Path
      }
    ]
  },
  setups: {
    title: 'Setups',
    logo: OnboardingSetups,
    description:
      'Gamified Trading Ideas: Make a choice, Compete & Win! Join Setups, forecast asset prices. Turn crypto insights into exciting victories!',
    headingFooterBackgroundImage: '',
    steps: [
      {
        title: 'Select',
        description: 'Asset, Long/Short, TP/SL & duration.',
        image: setupsOnboardingStep1Path
      },
      {
        title: 'Take a guess',
        description:
          'Make your play for/against the setup by choosing a take profit or stop loss.',
        image: setupsOnboardingStep2Path
      },
      {
        title: 'Win',
        description:
          "If you were right, you'll share the winnings with others who made similar choices.",
        image: setupsOnboardingStep3Path
      }
    ]
  },
  memeWars: {
    title: 'Meme Wars',
    logo: OnboardingSetups,
    description:
      "You don't have to wait long to win! Choose the coin that grows the most and take your winnings in a few minutes.",
    headingFooterBackgroundImage: '',
    steps: [
      {
        title: 'Choose a meme coin!',
        description:
          'Choose your favorite memecoin – the one you believe will see the highest price increase over a specific period.',
        image: memeWarsOnboardingStep1Path
      },
      {
        title: 'Watch the battle of memecoins on the chart!',
        description:
          'Track price changes of your favorite memecoins with a clear multi-graph.',
        image: memeWarsOnboardingStep2Path
      },
      {
        title: 'Win',
        description:
          'If your chosen coin grows the most, you’ll share the winnings with your teammates.',
        image: memeWarsOnboardingStep3Path
      }
    ]
  }
}

export const PRIMARY_ONBOARDING_NAVIGATION: OnboardingNavigationObject[] = [
  {
    title: 'Up/Down',
    path: RouterPathes.onboardingUpDown
  },
  {
    title: "Bull's Eye",
    path: RouterPathes.onboardingBullsEye
  },
  {
    title: 'Setups',
    path: RouterPathes.onboardingSetups
  },
  {
    title: '1vs1',
    path: RouterPathes.onboardingOneVsOne
  },
  {
    title: 'Meme Wars',
    path: RouterPathes.onboardingMemeWars
  }
]

export const SECONDARY_ONBOARDING_NAVIGATION: OnboardingNavigationObject[] = [
  {
    title: 'Treasure',
    path: RouterPathes.onboardingTreasure
  },
  {
    title: 'Referral Program',
    path: RouterPathes.onboardingReferralProgram
  },
  {
    title: 'Rewards System',
    path: RouterPathes.onboardingRewardsSystem
  }
]
