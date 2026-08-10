import { FC, SVGProps } from 'react'
import { DataTestIDs, RouterPathes } from 'shared/constants'
import {
  BullsEyeNavIcon,
  BuyBackIcon,
  CupColoredIcon,
  CupIcon,
  GamesNavIcon,
  HomeNavIcon,
  MemeWarsNavIcon,
  MoreNavIcon,
  OneVsOneNavIcon,
  ReferralsTriangle,
  SetupsNavIcon,
  TokenNavIcon,
  UpDownNavIcon,
  WarningRectangleIcon
} from 'shared/icons'
import { NavigationMobileModeType } from './types'

export const ICON_SIZE = '4rem'
export const MENU_ICON_SIZE = '3rem'

export const GAME_MODE_IDS = [
  'up-down',
  'bulls-eye',
  'one-vs-one',
  'setups',
  'meme-wars'
] as const

export const MORE_MODE_IDS = ['rewards', 'token', 'about'] as const

export const MODE_ID_TO_MODE_MAP: Record<
  NavigationMobileModeType,
  { icon: FC<SVGProps<SVGSVGElement>>; name: string }
> = {
  'up-down': { icon: UpDownNavIcon, name: 'Up/Down' },
  'bulls-eye': { icon: BullsEyeNavIcon, name: 'Bull’s Eye' },
  'one-vs-one': { icon: OneVsOneNavIcon, name: '1vs1' },
  setups: { icon: SetupsNavIcon, name: 'Setups' },
  'meme-wars': { icon: MemeWarsNavIcon, name: 'Meme Wars' },
  rewards: { icon: CupIcon, name: 'Rewards' },
  token: { icon: TokenNavIcon, name: 'Token' },
  about: { icon: WarningRectangleIcon, name: 'About' },
  'rewards-extra': { icon: CupColoredIcon, name: 'Rewards' }
}

export const MODE_TYPE_TO_ICON_MAP = {
  home: HomeNavIcon,
  setups: SetupsNavIcon,
  'bulls-eye': BullsEyeNavIcon,
  'one-vs-one': OneVsOneNavIcon,
  'up-down': UpDownNavIcon,
  'meme-wars': MemeWarsNavIcon,
  rewards: CupIcon,
  'rewards-extra': CupColoredIcon,
  referrals: ReferralsTriangle,
  buyback: BuyBackIcon,
  games: GamesNavIcon,
  more: MoreNavIcon
}

export const MODE_ROUTES = [
  'up-down',
  'bulls-eye',
  'one-vs-one',
  'meme-wars',
  'setups',
  'rewards',
  'about',
  'buyback'
] as const

const {
  setupsSidePanel,
  upDownSidePanel,
  rewardsSidePanel,
  referralsSidePanel,
  bullsEyeSidePanel,
  oneVsOneSidePanel,
  buybackSidePanel,
  memeWarsSidePanel
} = DataTestIDs

export const gamesLinks = [
  {
    iconType: 'up-down',
    to: RouterPathes.upDown,
    title: 'Up / down',
    dataTestID: upDownSidePanel
  },
  {
    iconType: 'bulls-eye',
    to: RouterPathes.bullsEye,
    title: "Bull's Eye",
    dataTestID: bullsEyeSidePanel
  },
  {
    iconType: 'one-vs-one',
    to: RouterPathes.oneVsOne,
    title: '1 vs 1',
    dataTestID: oneVsOneSidePanel
  },
  {
    iconType: 'setups',
    to: RouterPathes.setups,
    title: 'Setups',
    dataTestID: setupsSidePanel
  },
  {
    iconType: 'meme-wars',
    to: RouterPathes.memeWars,
    title: 'Meme Wars',
    dataTestID: memeWarsSidePanel
  }
] as const

export const moreLinks = [
  {
    iconType: 'rewards',
    extraIconType: 'rewards-claimable',
    to: RouterPathes.rewards,
    title: 'Rewards',
    dataTestID: rewardsSidePanel,
    isReleased: true
  },
  {
    iconType: 'referrals',
    to: RouterPathes.referrals,
    title: 'Referrals',
    dataTestID: referralsSidePanel,
    isReleased: true
  },
  {
    iconType: 'buyback',
    to: RouterPathes.buyback,
    title: 'Token',
    dataTestID: buybackSidePanel,
    isReleased: true
  }
] as const
