import { Seconds } from 'shared/types'

export const BULLS_EYE_TABLE_TYPES = {
  CURRENT: 'Current',
  COMPLETED: 'Completed'
}

export const MAX_BULLS_EYE_TIMER_VALUE = 30 as Seconds

export const BULLS_EYE_TABLE_BETS_TAKE = 5

export enum BullsEyeGameEvents {
  StartGame = 'BullseyeStart',
  NewBet = 'BullseyeNewPlayer',
  FinishGame = 'BullseyeFinalized'
}

export const MIN_BULLS_EYE_INPUT_VALUE = 0.00001 // NOTE: Think about workaround
