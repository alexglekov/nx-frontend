import { FieldNames, OneVsOneCreateFormState } from './types'

export const MIN_BET_PRICE = 0
export const CONDITION_OPTIONS = {
  UP_DOWN: 'Up or Down',
  EXACT_PRICE: 'Exact price'
}

export const ONE_VS_ONE_MY_BETS_TYPES = {
  CURRENT: 'Current',
  COMPLETED: 'Completed',
  EXPIRED: 'Expired'
}

export const ONE_VS_ONE_OPEN_BETS_TYPES = {
  GLOBAL: 'Global',
  PERSONAL: 'Personal'
}

export const ONE_VS_ONE_MIN_AMOUNT_VALUE = 1

export const AVAILABLE_SELECTION_TIMEFRAMES = [
  {
    label: '5m',
    value: 300
  },
  {
    label: '10m',
    value: 600
  },
  {
    label: '30m',
    value: 1800
  },
  {
    label: '1h',
    value: 3600
  },
  {
    label: '2h',
    value: 7200
  },
  {
    label: '3h',
    value: 10800
  },
  {
    label: '4h',
    value: 14400
  },
  {
    label: '6h',
    value: 21600
  },
  {
    label: '8h',
    value: 28800
  },
  {
    label: '1d',
    value: 86400
  },
  {
    label: '3d',
    value: 259200
  },
  {
    label: '1w',
    value: 604800
  },
  {
    label: '2w',
    value: 1209600
  },
  {
    label: '4w',
    value: 2419000
  }
]

export const TIME_ADDITION = 120

export const ONE_VS_ONE_CREATE_FORM_INITIAL_STATE: OneVsOneCreateFormState = {
  [FieldNames.isPrivate]: false
}

export const ONE_VS_ONE_TABLE_TAKE_VAR = 5

export const DEFAULT_MAX_PRICE = 100000
