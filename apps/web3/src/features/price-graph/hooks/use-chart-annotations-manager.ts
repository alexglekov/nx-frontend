import { useCallback } from 'react'
import { makeVar, useReactiveVar } from '@apollo/client'
import { ChartAnnotations, ModeChartAnnotations } from '../types'

type ChartAnnotationsVar = ReturnType<typeof makeVar<ChartAnnotations | null>>

interface ChartAnnotationsManagerReturn {
  annotations: ChartAnnotations | null
  addHorizontalAnnotation: (annotation: ModeChartAnnotations) => void
  addVerticalAnnotation: (annotation: ModeChartAnnotations) => void
  clearHorizontalAnnotations: () => void
  clearVerticalAnnotations: () => void
  clearAnnotations: () => void
  setAnnotations: (newAnnotations: ChartAnnotations) => void
}

export const useChartAnnotationsManager = (
  annotationsVar: ChartAnnotationsVar
): ChartAnnotationsManagerReturn => {
  const annotations = useReactiveVar(annotationsVar)

  const addHorizontalAnnotation = useCallback(
    (annotation: ModeChartAnnotations) => {
      const updatedHorizontal =
        annotations?.horizontal ?
          [...annotations.horizontal, annotation]
        : [annotation]

      annotationsVar({
        ...annotations,
        horizontal: updatedHorizontal
      })
    },
    [annotations, annotationsVar]
  )

  const addVerticalAnnotation = useCallback(
    (annotation: ModeChartAnnotations) => {
      const updatedVertical =
        annotations?.vertical ?
          [...annotations.vertical, annotation]
        : [annotation]

      annotationsVar({
        ...annotations,
        vertical: updatedVertical
      })
    },
    [annotations, annotationsVar]
  )

  const clearHorizontalAnnotations = useCallback(() => {
    annotationsVar({
      ...annotations,
      horizontal: undefined
    })
  }, [annotations, annotationsVar])

  const clearVerticalAnnotations = useCallback(() => {
    annotationsVar({
      ...annotations,
      vertical: undefined
    })
  }, [annotations, annotationsVar])

  const clearAnnotations = useCallback(() => {
    annotationsVar(null)
  }, [annotationsVar])

  const setAnnotations = useCallback(
    (newAnnotations: ChartAnnotations) => {
      clearAnnotations()

      annotationsVar(newAnnotations)
    },
    [annotationsVar]
  )

  return {
    annotations,
    addHorizontalAnnotation,
    addVerticalAnnotation,
    clearVerticalAnnotations,
    clearHorizontalAnnotations,
    clearAnnotations,
    setAnnotations
  }
}
