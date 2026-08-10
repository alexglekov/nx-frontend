import {
  OneVsOneNavIcon,
  UpDownNavIcon,
  SetupsNavIcon,
  BullsEyeNavIcon,
  profileWinratePath,
  profileLargestWinPath,
  profileTotalBetsPath,
  OnboardingBullsEye,
  OnboardingOneVsOne,
  OnboardingUpDown,
  OnboardingSetups
} from 'shared/icons'
import {
  ProfileAchievementItem,
  ProfileInfoStatItem,
  ProfileModeItem
} from './types'
import { GAME_MODES } from 'shared/constants'
import { GameModes } from 'shared/types'

export const PROFILE_MODES: ProfileModeItem[] = [
  {
    id: 'bulls-eye',
    title: 'Bull’s eye',
    color: 'var(--c-bulls-eye)',
    backgroundElement: BullsEyeNavIcon
  },
  {
    id: 'one-vs-one',
    title: '1vs1',
    color: 'var(--c-one-vs-one)',
    backgroundElement: OneVsOneNavIcon
  },
  {
    id: 'setups',
    title: 'Setups',
    color: 'var(--c-setups)',
    backgroundElement: SetupsNavIcon
  },
  {
    id: 'up-down',
    title: 'Up/Down',
    color: 'var(--c-up-down)',
    backgroundElement: UpDownNavIcon
  }
]

export const PROFILE_INFO_STATS: ProfileInfoStatItem[] = [
  {
    id: 'winPercentage',
    icon: profileWinratePath,
    name: 'WINRATE',
    isPercentage: true
  },
  {
    id: 'earned',
    icon: profileTotalBetsPath,
    name: 'TOTAL EARNING',
    isEqualsXyroToken: true
  },
  {
    id: 'totalGames',
    icon: profileLargestWinPath,
    name: 'TOTAL GAMES'
  }
]

// TODO: Remove mock
export const PROFILE_ACHIEVEMENTS_MOCK: ProfileAchievementItem[] = [
  {
    icon: '1',
    name: 'Crypto Oracle',
    description:
      'Successfully predict and win 10 consecutive 1vs1 crypto games',
    rarity: 3.5
  },
  {
    icon: '2',
    name: 'Crypto Oracle',
    description:
      'Successfully predict and win 10 consecutive 1vs1 crypto games',
    rarity: 3.5
  },
  {
    icon: '3',
    name: 'Crypto Oracle',
    description:
      'Successfully predict and win 10 consecutive 1vs1 crypto games',
    rarity: 3.5
  },
  {
    icon: '4',
    name: 'Crypto Oracle',
    description:
      'Successfully predict and win 10 consecutive 1vs1 crypto games',
    rarity: 3.5
  }
]

const { oneVsOne, bullsEye, upDown, setups } = GameModes

export const PROFILE_STATISTIC_MODES = [oneVsOne, bullsEye, upDown, setups]

export const PROFILE_STATISTIC_MODES_DATA = {
  [oneVsOne]: {
    modeIcon: OneVsOneNavIcon,
    modeRune: OnboardingOneVsOne,
    modeTitle: '1vs1'
  },
  [bullsEye]: {
    modeIcon: BullsEyeNavIcon,
    modeRune: OnboardingBullsEye,
    modeTitle: 'Bull’s Eye'
  },
  [upDown]: {
    modeIcon: UpDownNavIcon,
    modeRune: OnboardingUpDown,
    modeTitle: 'Up/ Down'
  },
  [setups]: {
    modeIcon: SetupsNavIcon,
    modeRune: OnboardingSetups,
    modeTitle: 'Setups'
  }
}
