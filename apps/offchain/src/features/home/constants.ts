/* eslint-disable max-lines */

import { scullWithBg } from 'shared/icons'
import { HeroBannerType } from 'shared/types'
import { gamePreviewPath } from '../../shared/images'
import { CardMode } from './types'

export type HomeCardType = CardMode | OnboardingCard
interface OnboardingCard {
  key: 'howto'
  title: string
  callToAction: string[]
}

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

export const GAME_LIST = [
  { image: gamePreviewPath, title: 'Neon Rush' },
  { image: gamePreviewPath, title: 'Neon Rush' },
  { image: gamePreviewPath, title: 'Neon Rush' },
  { image: gamePreviewPath, title: 'Neon Rush' },
  { image: gamePreviewPath, title: 'Neon Rush' },
  { image: gamePreviewPath, title: 'Neon Rush' },
  { image: gamePreviewPath, title: 'Neon Rush' },
  { image: gamePreviewPath, title: 'Neon Rush' },
  { image: gamePreviewPath, title: 'Neon Rush' },
  { image: gamePreviewPath, title: 'Neon Rush' },
  { image: gamePreviewPath, title: 'Neon Rush' },
  { image: gamePreviewPath, title: 'Neon Rush' }
] as const
