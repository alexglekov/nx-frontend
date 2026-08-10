import { GameStateEnum } from 'shared/types'

export const getGameStatusText = (state: GameStateEnum | null) => {
  if (state === Open) {
    return 'Join the game!'
  }

  if (state === Inprogress) {
    return 'Wait for result'
  }

  if (state === Pending) {
    return 'Closing the game'
  }

  return null
}

const { Open, Inprogress, Pending } = GameStateEnum
