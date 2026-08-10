import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { GameStatus } from '__generated__/graphql'
import { useChartAnnotationsManager } from '../../price-graph/hooks/use-chart-annotations-manager'
import { bullsEyeChartAnnotationsVar } from '../store/bulls-eye-chart-annotations'
import { bullsEyeGameVar } from '../store/game.store'

export const useBullsEyeAnnotation = () => {
  const bullsEyeGame = useReactiveVar(bullsEyeGameVar)
  const { setAnnotations } = useChartAnnotationsManager(
    bullsEyeChartAnnotationsVar
  )

  // NOTE: chart annotation creation
  // eslint-disable-next-line max-statements
  useEffect(() => {
    const myPredicts = bullsEyeGame?.myPredicts

    const annotations =
      myPredicts?.map(p => {
        return {
          name: 'bullsEyePredict' as const,
          value: p.price || 0
        }
      }) || []

    if (!annotations.length) {
      bullsEyeChartAnnotationsVar(null)
      return
    }

    setAnnotations({
      horizontal: annotations
    })
    // NOTE: the only way to listen to the changes frequently is to check the length of the predicts array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bullsEyeGame?.predicts?.length, bullsEyeGame?.myPredicts?.length])

  // NOTE: chart annotation removal
  useEffect(() => {
    const endAt = bullsEyeGame?.endAt
    const currentTime = Date.now()

    const isBullsEyeClosed =
      (endAt && endAt < currentTime) ||
      bullsEyeGame?.status === GameStatus.Close
    if (!isBullsEyeClosed) return

    bullsEyeChartAnnotationsVar(null)

    return () => {
      bullsEyeChartAnnotationsVar(null)
    }
  }, [bullsEyeGame?.endAt, bullsEyeGame?.status])
}
