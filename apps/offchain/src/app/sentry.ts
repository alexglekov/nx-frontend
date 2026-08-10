import * as Sentry from '@sentry/react'
import { SENTRY_CONFIG } from './constants'
import { Stand } from './types'

if (import.meta.env.VITE_STAND === Stand.prod) {
  Sentry.init(SENTRY_CONFIG)
}
