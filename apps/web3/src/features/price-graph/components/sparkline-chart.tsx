import { FC, useEffect, useRef } from 'react'
import { sparkline } from '@fnando/sparkline'
import { Flex, Text } from '@radix-ui/themes'
import {
  NEGATIVE_COLOR_CSS_VAR,
  POSITIVE_COLOR_CSS_VAR
} from 'shared/constants'

interface Props {
  chartData: number[]
  className: string
  isDiffPercentShown?: boolean
}
// TODO: extract to shared components
export const SparklineChart: FC<Props> = ({
  chartData,
  isDiffPercentShown = false
}) => {
  const sparklineRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (chartData.length === 0 || !sparklineRef.current) return
    const normalizedData = normalizeData(chartData)

    sparkline(sparklineRef.current, normalizedData, {})
  }, [chartData])

  if (chartData.length === 0) return null

  const sparklineColor =
    chartData[0] > chartData[chartData.length - 1] ?
      NEGATIVE_COLOR_CSS_VAR
    : POSITIVE_COLOR_CSS_VAR

  const sparkLinePercentDiff = Number(
    (
      ((chartData[chartData.length - 1] - chartData[0]) / chartData[0]) *
      100
    ).toFixed(2)
  )

  const formattedSparkLinePriceDiff =
    sparkLinePercentDiff > 0 ? `+${sparkLinePercentDiff}` : sparkLinePercentDiff

  return (
    <Flex
      align={'center'}
      gap={'1'}
    >
      <svg
        width='80'
        height='24'
        ref={sparklineRef}
        strokeWidth='3'
        strokeLinejoin='round'
        strokeLinecap='round'
        stroke={sparklineColor}
        fill='none'
      ></svg>

      {isDiffPercentShown && (
        <Text
          size={'1'}
          className='color-white'
        >
          {formattedSparkLinePriceDiff}%
        </Text>
      )}
    </Flex>
  )
}

/** NOTE: normalize numbers to positive values */
function normalizeData(data: number[]) {
  const max = Math.max(...data)
  const min = Math.min(...data)

  if (max === min) return data

  const delta = max - min
  return data.map(n => (n - min) / delta)
}
