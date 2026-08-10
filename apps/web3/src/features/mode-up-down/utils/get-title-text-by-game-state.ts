import { GameStateEnum } from 'shared/types'
import { TITLE_TEXT_BY_GAME_STATUS_MAP } from '../constants'

export function getTitleTextByGameState(gameStatus?: GameStateEnum | null) {
  if (!gameStatus) return null

  return TITLE_TEXT_BY_GAME_STATUS_MAP?.[gameStatus] || 'Unknown game state'
}
