import { ChartingLibraryFeatureset } from './tradingview'

export const DISABLED_FEATURES: ChartingLibraryFeatureset[] = [
  'header_symbol_search',
  'header_compare',
  'header_quick_search',
  'symbol_search_hot_key',
  'delete_button_in_legend',
  'edit_buttons_in_legend',
  'volume_force_overlay',
  'create_volume_indicator_by_default',
  'timeframes_toolbar'
]

export const ENABLED_FEATURES: ChartingLibraryFeatureset[] = [
  'show_exchange_logos',
  'iframe_loading_compatibility_mode',
  'hide_left_toolbar_by_default',
  'use_localstorage_for_settings',
  'seconds_resolution',
  'tick_resolution'
]
