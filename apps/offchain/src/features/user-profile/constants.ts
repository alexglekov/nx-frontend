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
import { GameModes } from 'shared/types'
import { ProfileInfoStatItem } from './types'

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
