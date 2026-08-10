import { UpDownGame } from '__generated__/graphql'
import { HISTORY_LENGTH } from '../constants'
import { historyVar } from '../store/game.store'

export function appendGameToHistory(game: UpDownGame, history: UpDownGame[]) {
  const { id, isUp, startAt, endAt } = game
  const historyGame = {
    id,
    isUp,
    startAt,
    endAt
  }

  const isGameAlreadyExists = history.find(el => el.id === historyGame.id)

  if (isGameAlreadyExists) return

  const newHistory = [...history, historyGame].slice(1, HISTORY_LENGTH + 1)

  historyVar(newHistory as UpDownGame[])
}
