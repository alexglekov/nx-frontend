import { FC, SVGProps } from 'react'
import {
  CupIcon,
  GamesNavIcon,
  HomeNavIcon,
  MoreNavIcon,
  ReferralNavIcon,
  UserIcon
} from 'shared/icons'
import { NavigationRouteType } from './types'

export const ICON_SIZE = '4rem'
export const MENU_ICON_SIZE = '3rem'

export const MORE_MODE_IDS = [
  'games',
  'favorites',
  'account',
  'referral'
] as const

export const MODE_ID_TO_MODE_MAP: Record<
  NavigationRouteType,
  { icon: FC<SVGProps<SVGSVGElement>>; name: string }
> = {
  home: { icon: HomeNavIcon, name: 'Home' },
  favorites: { icon: CupIcon, name: 'Favorites' },
  referral: { icon: ReferralNavIcon, name: 'Referral' },
  games: { icon: GamesNavIcon, name: 'Games' },
  more: { icon: MoreNavIcon, name: 'More' },
  promotions: { icon: CupIcon, name: 'Promotions' },
  account: { icon: UserIcon, name: 'Account' }
}

export const MODE_TYPE_TO_ICON_MAP = {
  home: HomeNavIcon,
  favorites: CupIcon,
  referral: ReferralNavIcon,
  games: GamesNavIcon,
  more: MoreNavIcon,
  promotions: CupIcon,
  account: UserIcon
}
