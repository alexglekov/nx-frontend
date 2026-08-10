import { useEffect, useRef } from 'react'
import { useResponsive } from 'shared/hooks/use-responsive'
import { AssetId } from 'shared/types'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { DISABLED_FEATURES, ENABLED_FEATURES } from '../constants'
import {
  ChartingLibraryFeatureset,
  ChartingLibraryWidgetOptions,
  ChartStyle,
  IChartingLibraryWidget,
  ResolutionString,
  widget
} from '../tradingview'
import { UDFCompatibleDatafeed } from '../tradingview/datafeeds/udf'
import { ChartContainerProps } from '../types'
import datafeed from '../utils/datafeed'
import { getThemeColors } from '../utils/get-theme-colors'

export const useChartInit = (
  chartContainerRef: React.MutableRefObject<HTMLDivElement | null>,
  assetId: AssetId,
  mode?: 'default' | 'race',
  resolution?: ResolutionString,
  chartLineType?: ChartStyle
) => {
  const [isMobile] = useResponsive(['xs', 'sm'])
  const chartInstanceRef = useRef<IChartingLibraryWidget | null>(null)

  const defaultProps: Omit<
    ChartContainerProps,
    'container' | 'clientId' | 'userId' | 'chartsStorageUrl'
  > = {
    symbol: assetId,
    interval: resolution || ('5S' as ResolutionString),
    datafeedUrl: datafeed as UDFCompatibleDatafeed,
    libraryPath: '/tradingview/charting_library/',
    chartsStorageApiVersion: '1.1',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {}
  }

  const customThemeColors = getThemeColors()

  useEffect(() => {
    const isChartAlreadyCreated = chartInstanceRef.current !== null
    const chartContainer = chartContainerRef?.current

    if (isChartAlreadyCreated || !chartContainer || !isNotNullOrUndef(isMobile))
      return

    const disabledFeatureSetByMode = mode === 'race' ? ['header_widget'] : []

    const disabledFeatureSet =
      isMobile ?
        ([
          ...DISABLED_FEATURES,
          'left_toolbar',
          ...disabledFeatureSetByMode
        ] as ChartingLibraryFeatureset[])
      : ([
          ...DISABLED_FEATURES,
          ...disabledFeatureSetByMode
        ] as ChartingLibraryFeatureset[])

    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: defaultProps.symbol as string,
      // NOTE: no trailing slash is expected in feed URL
      datafeed: defaultProps.datafeedUrl,
      interval:
        defaultProps.interval as ChartingLibraryWidgetOptions['interval'],
      container: chartContainerRef.current as HTMLDivElement,
      library_path: defaultProps.libraryPath as string,
      theme: 'dark',
      locale: 'en',
      disabled_features: disabledFeatureSet,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      studies_overrides: defaultProps.studiesOverrides,
      enabled_features: ENABLED_FEATURES,
      custom_themes: {
        dark: {
          ...customThemeColors
        },
        light: {
          ...customThemeColors
        }
      }
    }

    const chartWidget = new widget(widgetOptions)

    chartWidget.onChartReady(() => {
      chartInstanceRef.current = chartWidget

      chartInstanceRef?.current?.applyOverrides({
        'mainSeriesProperties.style': chartLineType || ChartStyle.Line
      })
    })
  }, [chartContainerRef, isMobile])

  return {
    chartInstanceRef,
    chartContainerRef
  }
}
