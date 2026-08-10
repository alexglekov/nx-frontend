import {
  Bar,
  ChartingLibraryWidgetOptions,
  ResolutionString,
  SubscribeBarsCallback
} from './tradingview'
import { UDFCompatibleDatafeed } from './tradingview/datafeeds/udf'

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions['symbol']
  interval: ChartingLibraryWidgetOptions['interval']

  // NOTE: no trailing slash is expected in feed URL
  datafeedUrl: UDFCompatibleDatafeed
  libraryPath: ChartingLibraryWidgetOptions['library_path']
  chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']
  chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']
  clientId: ChartingLibraryWidgetOptions['client_id']
  userId: ChartingLibraryWidgetOptions['user_id']
  fullscreen: ChartingLibraryWidgetOptions['fullscreen']
  autosize: ChartingLibraryWidgetOptions['autosize']
  studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides']
  container: ChartingLibraryWidgetOptions['container']
}

interface ApolloSubscription {
  unsubscribe: () => void
}

export type SubscriptionItem = {
  resolution: ResolutionString
  lastDailyBar?: Bar
  handlers: Array<{
    id: string
    callback: SubscribeBarsCallback
  }>
  apolloSubscription: ApolloSubscription | null
}

type LineStyle = 0 | 1 | 2 // 0 = solid, 1 = dotted, 2 = dashed

interface LineConfig {
  color?: string
  lineWidth?: number
  lineStyle?: LineStyle
  text: string
  textColor?: string
  textFontSize?: number
}

export interface PriceLineConfig extends LineConfig {
  price: number
}

export interface VerticalLineConfig extends LineConfig {
  timestamp: number
}
