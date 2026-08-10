import { MutableRefObject, useEffect } from 'react'
import { ISeriesApi, Time } from 'lightweight-charts'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'

export const useChartBasePrice = (
  seriesInstanceRef: MutableRefObject<ISeriesApi<
    'Area' | 'Baseline',
    Time
  > | null>,
  basePrice: number | null
) => {
  // NOTE: cleaning of the previous base price
  useEffect(() => {
    return () => {
      seriesInstanceRef?.current?.applyOptions({
        baseValue: { type: 'price', price: undefined }
      })
    }
  }, [basePrice])

  // NOTE: adding new base price
  useEffect(() => {
    if (!seriesInstanceRef?.current || !isNotNullOrUndef(basePrice)) return

    seriesInstanceRef.current.applyOptions({
      baseValue: { type: 'price', price: basePrice }
    })
  }, [basePrice, seriesInstanceRef])
}
