import { GameState } from '__generated__/graphql'
import { MS_IN_SEC } from 'shared/constants'
import { Seconds } from 'shared/types'

export const HISTORY_LENGTH = 8

export const CONDITION_RESULT_ITEM_TYPES = {
  CONDITION: 'CONDITION',
  RESULT: 'RESULT'
}

// TODO: check this titles with @mikeshukshin
export const TITLE_TEXT_BY_GAME_STATUS_MAP: Record<GameState, string> = {
  [GameState.Open]: 'Make a choice',
  [GameState.Inprogress]: 'Wait for results',
  [GameState.Pending]: 'Closing the game',
  [GameState.Close]: 'Game ended',
  // NOTE: this title is not used in the up-down mode
  [GameState.Draft]: ''
}

export const MAX_TIMER_VALUE = 60 as Seconds

/**
 * Maximum delta between current time and timestamp (tradeof between the backend lag and precision)
 */
export const MAX_TIMESTAMP_DELTA = 3 * MS_IN_SEC
