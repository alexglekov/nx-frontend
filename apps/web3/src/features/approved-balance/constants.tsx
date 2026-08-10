import { DataTestIDs } from 'shared/constants'
import {
  MemeWarsNavIcon,
  RakebackIconBullsEye,
  RakebackIconSetups,
  RakebackIconUpDown,
  SwapTetherToken,
  SwapXyroToken
} from 'shared/icons'
import {
  ApprovedBalanceSwitchTypes,
  BalanceSwitchType,
  RakebackGamesMapType
} from './types'

export const RAKEBACK_GAMES_MAP: RakebackGamesMapType[] = [
  {
    name: 'Bulls Eye',
    icon: <RakebackIconBullsEye />,
    dataSource: 'bullseye'
  },
  {
    name: 'Setups',
    icon: <RakebackIconSetups />,
    dataSource: 'setup'
  },
  {
    name: 'Up / Down',
    icon: <RakebackIconUpDown />,
    dataSource: 'updown'
  },
  {
    name: 'Meme Wars',
    icon: (
      <MemeWarsNavIcon
        width={'3rem'}
        height={'3rem'}
        color='var(--gray-11)'
      />
    ),
    dataSource: 'race'
  }
]

export const DEFAULT_RAKEBACK_VALUES = {
  bullseye: {
    xyro: 0,
    usdt: 0
  },
  setup: {
    xyro: 0,
    usdt: 0
  },
  updown: {
    xyro: 0,
    usdt: 0
  },
  race: {
    xyro: 0,
    usdt: 0
  },
  total: {
    xyro: 0,
    usdt: 0
  }
}

export const BALANCE_SWITCH_TYPES: BalanceSwitchType[] = [
  {
    icon: (
      <SwapTetherToken
        width={'3rem'}
        height={'3rem'}
      />
    ),
    dataTestID: DataTestIDs.buttonBalanceSwitchToTether,
    switchType: ApprovedBalanceSwitchTypes.Tether
  },
  {
    icon: (
      <SwapXyroToken
        width={'3rem'}
        height={'3rem'}
      />
    ),
    dataTestID: DataTestIDs.buttonBalanceSwitchToXyro,
    switchType: ApprovedBalanceSwitchTypes.Xyro
  }
]

export const CLAIM_BATCH_SIZE = 100
