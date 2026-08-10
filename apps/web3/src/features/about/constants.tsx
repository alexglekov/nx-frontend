import { LinkedInLogoIcon } from '@radix-ui/react-icons'
import {
  DiscordLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MirrorCircleLogoIcon,
  TelegramLogoIcon,
  TwitterLogoIcon
} from 'shared/icons'
import {
  PurplePoint,
  BluePoint,
  GreenPoint,
  BlueLightPoint
} from 'shared/icons/about-page'
import { RoadmapItem, TractionStats } from './types'

export enum SocialTypes {
  discord = 'discord',
  twitter = 'twitter',
  telegram = 'telegram',
  mirror = 'mirror',
  linkedin = 'linkedin',
  instagram = 'instagram'
}

interface SocialItemOptions {
  name: string
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  href: string
}

type SocialItemOptionsMap = {
  [key in SocialTypes]: SocialItemOptions
}

export const SOCIAL_ITEM_OPTIONS_MAP: SocialItemOptionsMap = {
  [SocialTypes.discord]: {
    name: 'Discord',
    icon: DiscordLogoIcon,
    href: 'https://discord.gg/xyro'
  },
  [SocialTypes.twitter]: {
    name: 'Twitter',
    icon: TwitterLogoIcon,
    href: 'https://x.com/xyro_io'
  },
  [SocialTypes.telegram]: {
    name: 'Telegram',
    icon: TelegramLogoIcon,
    href: 'https://t.me/xyro_io'
  },
  [SocialTypes.mirror]: {
    name: 'Mirror',
    icon: MirrorCircleLogoIcon,
    href: 'https://mirror.xyz/xyro.eth'
  },
  [SocialTypes.linkedin]: {
    name: 'LinkedIn',
    icon: LinkedinLogoIcon,
    href: 'https://linkedin.com/company/xyro-io'
  },
  [SocialTypes.instagram]: {
    name: 'Instagram',
    icon: InstagramLogoIcon,
    href: 'https://instagram.com/xyroio'
  }
}

export const TRACTION_MAINNET_STATS: TractionStats[] = [
  {
    title: 'PLATFORM VOLUME',
    value: '$5.500.000'
  },
  {
    title: 'REVENUE',
    value: '$220.000'
  },
  {
    title: 'TRANSACTIONS',
    value: '700.000+'
  },
  {
    title: 'GAMES',
    value: '200.000+'
  }
]

export const TRACTION_GENERAL: TractionStats[] = [
  {
    title: 'COMMUNITY MEMBERS',
    value: '3.500.000+'
  },
  {
    title: 'UNIQUE USERS WITH CONNECTED WALLETS ON THE PLATFORM',
    value: '720,000+'
  },
  {
    title: 'USERS IN TELEGRAM APP',
    value: '2.100.000+'
  }
]

export const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    quarter: 'Q4 2023',
    circleIcon: PurplePoint,
    checkboxColor: 'Purple',
    actions: [
      'MVP development',
      'Enabling the first 3 game modes in the MVP',
      'Internal MVP testing',
      '$500K raised',
      'Community building'
    ]
  },
  {
    quarter: 'Q1-Q2 2024',
    circleIcon: BluePoint,
    checkboxColor: 'Blue',
    actions: [
      'Fully playable MVP with all game modes',
      'Closed alpha testing',
      'Start of community beta testing phase 1',
      'Preparation for competitive airdrop phase 1',
      'Tokenomics design',
      'Media marketing campaign',
      'Community building (50K target reached)'
    ]
  },
  {
    quarter: 'Q3-Q4 2024',
    circleIcon: GreenPoint,
    checkboxColor: 'Green',
    actions: [
      'Official Mainnet release',
      'Launch of the competitive airdrop',
      'Work on smart contracts on Arbitrum',
      'Media marketing campaign',
      'Partnerships'
    ]
  },
  {
    quarter: 'Q1 2025',
    circleIcon: BlueLightPoint,
    actions: [
      'Token IDO',
      'DEX listing and liquidity pools',
      'CEX listing',
      'Token marketing campaign',
      'Scaling and user base growth',
      'TGE in January'
    ]
  },
  {
    quarter: 'Q2-Q3 2025',
    circleIcon: PurplePoint,
    actions: [
      'New verticals for additional revenue streams',
      'Exploring technological advances and trends',
      'Providing game modes from partners as part of developing the infrastructure',
      'Introducing game modes based on tokenized real-world events'
    ]
  }
]
