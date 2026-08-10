import { PredictStatus, UpDownPredict } from '__generated__/graphql'
import { Maybe } from 'graphql/jsutils/Maybe'

export interface ModalParams {
  containerBorderColor: 'green' | 'pink' | 'cyan'
  winTextColor: 'green' | 'pink'
  gameStatusText: 'UP WINS' | 'DOWN WINS' | 'GAME REJECTED'
  isUserWinner: boolean
}

// eslint-disable-next-line max-statements
export const getWinnerModalDecorations = (
  isLong: boolean,
  userBet: Maybe<UpDownPredict>,
  isPoolsFilled: boolean
): ModalParams => {
  const isUserBetExist = Boolean(userBet)
  const isUserWin = userBet?.status === PredictStatus.Won

  const poolTextWin = isLong ? 'UP WINS' : 'DOWN WINS'

  const gameStatusText = isPoolsFilled ? poolTextWin : 'GAME REJECTED'

  const winTextColor = isLong ? 'green' : 'pink'
  const playedUserBorderColor = isUserWin ? 'green' : 'pink'
  const containerBorderColor = isUserBetExist ? playedUserBorderColor : 'cyan'

  return {
    gameStatusText,
    winTextColor,
    isUserWinner: Boolean(isUserWin),
    containerBorderColor
  }
}
