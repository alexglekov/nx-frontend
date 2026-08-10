import { AnnotationType } from 'features/price-graph/types'
import { GameStateEnum } from 'shared/types'

export function getAnnotationNameByStatus(
  upDownGameState: GameStateEnum | null
): AnnotationType | null {
  switch (upDownGameState) {
    case Open:
      return '▶️ start game'
    case Inprogress:
      return '⏸️ stop predicts'
    case Pending:
      return '⏹️ end game'
    default:
      return null
  }
}

const { Open, Inprogress, Pending } = GameStateEnum
