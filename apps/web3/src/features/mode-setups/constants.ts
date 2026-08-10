import { HOURS_IN_DAY, SECS_IN_HOUR } from 'shared/constants'

export const SETUP_POSITION_BUTTONS = [
  {
    label: 'LONG',
    value: 'long'
  },
  {
    label: 'SHORT',
    value: 'short'
  }
]

export const TIMEFRAME_BUTTONS = [
  {
    label: '1h',
    value: SECS_IN_HOUR
  },
  {
    label: '3h',
    value: 3 * SECS_IN_HOUR
  },
  {
    label: '6h',
    value: 6 * SECS_IN_HOUR
  },
  {
    label: '12h',
    value: 12 * SECS_IN_HOUR
  },
  {
    label: '24h',
    value: HOURS_IN_DAY * SECS_IN_HOUR
  },
  {
    label: '3d',
    value: 3 * HOURS_IN_DAY * SECS_IN_HOUR
  },
  {
    label: '7d',
    value: 7 * HOURS_IN_DAY * SECS_IN_HOUR
  },
  {
    label: '14d',
    value: 14 * HOURS_IN_DAY * SECS_IN_HOUR
  },
  {
    label: '1m',
    value: 30 * HOURS_IN_DAY * SECS_IN_HOUR
  }
]

export const betAmountOptions = [
  {
    label: '5',
    value: 5
  },
  {
    label: '10',
    value: 10
  },
  {
    label: '25',
    value: 25
  },
  {
    label: '50',
    value: 50
  }
]

export const EXIT_STRATEGY_OPTIONS = [
  {
    label: 'TP',
    value: 'TP'
  },
  {
    label: 'SL',
    value: 'SL'
  }
]

export enum SetupsPredictsTableType {
  Current = 'Current',
  Completed = 'Completed',
  Unclaimed = 'Unclaimed'
}

export const LEAERS_BY_WINRATE_TITLE = 'By Winrate'
export const LEADERS_BY_USERS_TITLE = 'By Users'

export enum CreatedSetupsTableType {
  Active = 'Active',
  Closed = 'Closed'
}

export const SETUPS_MAX_BET_AMOUNT = 100000

export const ACTIVE_SETUPS_TAKE_VAR = 3
export const ACTIVE_SETUPS_TAKE_VAR_WITH_CHAT = 2
export const CREATED_SETUPS_TAKE_VAR = 3
export const JOINED_SETUPS_TAKE_VAR = 3
