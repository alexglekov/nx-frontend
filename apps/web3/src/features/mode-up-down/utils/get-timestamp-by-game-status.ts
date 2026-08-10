import { UpDownGame } from '__generated__/graphql'
import { GameStateEnum } from 'shared/types'

export function getTimeStampByGameStatus(
  current: GameStateEnum,
  upDownGame: UpDownGame | null
) {
  if (!upDownGame) return null

  switch (current) {
    case Open:
      return upDownGame?.startAt
    case Inprogress:
      return upDownGame?.stopPredictAt
    case Pending:
      return upDownGame?.endAt
    default:
      return null
  }
}

const { Open, Inprogress, Pending } = GameStateEnum
