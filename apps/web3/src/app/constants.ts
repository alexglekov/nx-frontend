import { useEffect } from 'react'
import * as Sentry from '@sentry/react'
import { SkeletonStyleProps } from 'react-loading-skeleton'
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType
} from 'react-router-dom'
import {
  DEFAULT_SKELETON_COLOR,
  DEFAULT_SKELETON_HIGHLIGHT_COLOR
} from 'shared/constants'
import { AppConfig, Stand } from './types'

export const STAND = import.meta.env.VITE_STAND as Stand

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const BACKEND_GRAPHQL_URL = `https://${BACKEND_URL}/graphql`
export const SUBSCRIPTION_URL = `wss://${BACKEND_URL}/subscription`

export const IGAMING_URL =
  STAND === Stand.dev ?
    'https://dev-offchain-front.xyrotech.net/'
  : 'https://play.xyro.io'

export const IS_TECHNICAL_ISSUES_STUB_ENABLED =
  import.meta.env.VITE_TECH_ISSUES_FLAG == 'true'

export const MAINNET_FLAGS: AppConfig = {
  auth: {
    isDiscordAllowed: true,
    isSignUpByEmailAllowed: true,
    isTwitterAllowed: true,
    isWalletAllowed: true,
    isAuthRequired: true,
    isReferralCodeFlowAllowed: false
  },
  tokenMintAllowed: false,
  isMainNetFeature: true,
  mobile: {
    upDown: false,
    oneVsOne: false,
    bullsEye: false,
    setups: false,
    rewards: false
  }
}

export const PROD_FLAGS: AppConfig = {
  auth: {
    isDiscordAllowed: true,
    isSignUpByEmailAllowed: true,
    isTwitterAllowed: true,
    isWalletAllowed: true,
    isAuthRequired: true,
    isReferralCodeFlowAllowed: true
  },
  tokenMintAllowed: true,
  isMainNetFeature: false,
  mobile: {
    upDown: false,
    oneVsOne: false,
    bullsEye: false,
    setups: false,
    rewards: false
  }
}

export const DEV_FLAGS: AppConfig = {
  auth: {
    isDiscordAllowed: true,
    isSignUpByEmailAllowed: true,
    isTwitterAllowed: true,
    isWalletAllowed: true,
    isAuthRequired: true,
    isReferralCodeFlowAllowed: true
  },
  tokenMintAllowed: true,
  isMainNetFeature: true,
  mobile: {
    upDown: false,
    oneVsOne: false,
    bullsEye: false,
    setups: false,
    rewards: false
  }
}

export const SENTRY_CONFIG = {
  dsn: 'https://876a2b2eee75887cc83c7017b45b1d19@o4507582820581376.ingest.de.sentry.io/4507582826020944',
  environment: STAND || Stand.prod || Stand.mainnet,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes
    })
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [/^https:\/\/xyro\.io/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
}

export const THEME_CONFIG = {
  accentColor: 'sky' as const,
  radius: 'full' as const,
  hasBackground: true, // NOTE: to inject Radix CSS variables into a <body/>
  grayColor: 'gray' as const,
  appearance: 'dark' as const,
  panelBackground: 'solid' as const,
  scaling: '100%' as const
}

export const SKELETON_CONFIG: SkeletonStyleProps = {
  baseColor: DEFAULT_SKELETON_COLOR,
  highlightColor: DEFAULT_SKELETON_HIGHLIGHT_COLOR,
  borderRadius: '2rem'
}

export const THIRD_WEB_API_KEY = import.meta.env.VITE_THIRD_WEB_API_KEY
export const WSS_PROVIDER_URL = import.meta.env.VITE_WSS_PROVIDER
export const VITE_HTTP_PROVIDER = import.meta.env.VITE_HTTP_PROVIDER
export const VITE_ETH_HTTP_PROVIDER = import.meta.env.VITE_ETH_HTTP_PROVIDER
export const UNAUTHORIZED = 'Unauthorized'
export const POLLING_INTERVAL = 30 * 1000 //ms
