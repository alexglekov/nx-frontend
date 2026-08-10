import { BullseyePredict, GameStatus } from '__generated__/graphql'

export interface ModalParams {
  containerBorderColor: 'green' | 'pink' | 'cyan'
  winTextColor: 'green' | 'pink'
  gameStatusText: 'YOU WON' | 'OOPS =(' | 'GAME REJECTED'
  gameStatusSecondaryText: string
}

export const getWinnerModalDecorations = (
  currentUserWinBet: BullseyePredict | null,
  isUserWinner: boolean,
  gameStatus?: GameStatus
): ModalParams => {
  const userWinnerText = isUserWinner ? 'YOU WON' : 'OOPS =('
  const gameStatusText =
    gameStatus === GameStatus.Close ? userWinnerText : 'GAME REJECTED'

  const gameDescription =
    isUserWinner ?
      `You won the ${currentUserWinBet?.place || ''} prize!`
    : 'You didn’t win'

  const gameStatusSecondaryText =
    gameStatus === GameStatus.Close ?
      gameDescription
    : 'Waiting for the next game'

  const winTextColor = isUserWinner ? 'green' : 'pink'
  const containerBorderColor = isUserWinner ? 'green' : 'pink'

  return {
    gameStatusText,
    winTextColor,
    containerBorderColor,
    gameStatusSecondaryText
  }
}
