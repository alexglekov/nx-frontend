/* eslint-disable max-lines */

import { RouterPathes } from 'shared/constants'
import {
  modeRewardsCardIconPath,
  modeSetupsCardIconPath,
  modeBullsEyeCardIconPath,
  modeOneVsOneCardIconPath,
  modeUpDownCardIconPath,
  modeStakingCardIconPath,
  scullWithBg,
  OneVsOneIcon,
  BullsEyeIcon,
  UpDownIcon,
  RewardsIcon,
  SetupsIcon,
  modeReferralsCardIconPath,
  ReferralsIcon,
  ModeStakingCardBackground,
  modeTokenCardIconPath,
  ModeTokenCardBackground,
  modeAirdropCardIconPath,
  ModeAirdropCardBackground,
  modeMemeWarsCardIconPath,
  MemeWarsIcon
} from 'shared/icons'
import { HeroBannerType } from 'shared/types'
import { CardMode } from './types'

export type HomeCardType = CardMode | OnboardingCard
interface OnboardingCard {
  key: 'howto'
  title: string
  callToAction: string[]
}
export const CARD_MODES: HomeCardType[] = [
  {
    key: 'howto',
    title: 'How to play',
    callToAction: [
      'Explore game modes',
      'Explore rewards',
      'Explore referral program'
    ]
  },
  {
    key: 'rewards',
    title: 'Rewards',
    color: 'var(--c-a-sky)',
    logo: modeRewardsCardIconPath,
    backgroundElement: RewardsIcon,
    path: RouterPathes.rewards,
    description:
      'Daily Tasks and Challenges! Jump in to claim your XYRO points and score rewards!'
  },
  {
    key: 'onevsone',
    title: '1 vs 1',
    color: 'var(--c-one-vs-one)',
    logo: modeOneVsOneCardIconPath,
    backgroundElement: OneVsOneIcon,
    path: RouterPathes.oneVsOne,
    description:
      'Real crypto duels! Compete in private or public matches, and outplay others to win!'
  },
  {
    key: 'bullseye',
    title: 'Bull’s Eye',
    color: 'var(--c-bulls-eye)',
    logo: modeBullsEyeCardIconPath,
    backgroundElement: BullsEyeIcon,
    path: RouterPathes.bullsEye,
    description:
      'Test your skills! Guess BTC’s most accurate price and claim your victory!'
  },
  {
    key: 'setup',
    title: 'Setups',
    color: 'var(--c-setups)',
    logo: modeSetupsCardIconPath,
    backgroundElement: SetupsIcon,
    path: RouterPathes.setups,
    description:
      'Join trading ideas! Choose TP or SL, compete with others, and win if you’re right!'
  },
  {
    key: 'updown',
    title: 'Up / Down',
    color: 'var(--c-up-down)',
    logo: modeUpDownCardIconPath,
    backgroundElement: UpDownIcon,
    path: RouterPathes.upDown,
    description:
      'Quick and fun for everyone! Guess Bitcoin’s next move and win every minute!'
  },
  {
    key: 'referrals',
    title: 'Referral Program',
    color: 'var(--c-a-sky)',
    logo: modeReferralsCardIconPath,
    backgroundElement: ReferralsIcon,
    path: RouterPathes.referrals,
    description: 'Join Our Referral Program and Earn Rewards!'
  },
  {
    key: 'staking',
    title: 'Staking',
    color: 'var(--c-a-sky)',
    logo: modeStakingCardIconPath,
    backgroundElement: ModeStakingCardBackground,
    path: 'https://staking.xyro.io/',
    description: ''
  },
  {
    key: 'token',
    title: '$XYRO Token',
    color: 'var(--c-a-sky)',
    logo: modeTokenCardIconPath,
    backgroundElement: ModeTokenCardBackground,
    description:
      'Everything about $XYRO – trade, swap, buyback-and-burn, & more!',
    path: RouterPathes.buyback
  },
  {
    key: 'airdrop',
    title: 'Airdrop Claim',
    color: 'var(--c-a-sky)',
    logo: modeAirdropCardIconPath,
    backgroundElement: ModeAirdropCardBackground,
    description: 'You’ll be able to claim your $XYRO drop very soon!',
    path: 'https://airdrop.xyro.io/'
  },
  {
    key: 'meme-wars',
    title: 'Meme Wars',
    color: 'var(--c-bulls-eye)',
    logo: modeMemeWarsCardIconPath,
    backgroundElement: MemeWarsIcon,
    description:
      'Choose your favorite memecoin – the one you believe will see the highest price increase over a specific period.',
    path: RouterPathes.memeWars
  }
]

export const APP_ACHIEVEMENTS_MOCK = {
  cryptoOracle: {
    title: 'Crypto oracle',
    description:
      'Successfully predict and win 10 consecutive 1vs1 crypto games',
    imagePath: scullWithBg
  }
}

export const BANNERS: HeroBannerType[] = [
  'mainnet',
  'web3',
  'chainlink',
  'bullsEye',
  'upDown',
  'twitter',
  'discord'
]
