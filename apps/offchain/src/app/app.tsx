import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { __DEV__ } from '@apollo/client/utilities/globals'
import { Theme } from '@radix-ui/themes'
import { TechIssuesStub } from 'features/mobile-stub/components/tech-issues-stub'
import { ErrorPage } from 'pages/error'
import { ErrorBoundary } from 'react-error-boundary'
import { SkeletonTheme } from 'react-loading-skeleton'
import { useAppHookParent } from 'shared/hooks/use-app-hook-parent'
import { AppContent } from './app-content'
import {
  IS_TECHNICAL_ISSUES_STUB_ENABLED,
  SKELETON_CONFIG,
  THEME_CONFIG
} from './constants'
import '@radix-ui/themes/styles.css'
import 'shared/styles/global.scss'

// TODO: this import doesn't work, investigate
import 'react-loading-skeleton/dist/skeleton.css'

if (__DEV__) {
  loadDevMessages()
  loadErrorMessages()
}

const App: React.FC = () => {
  useAppHookParent()

  return (
    <Theme {...THEME_CONFIG}>
      <SkeletonTheme {...SKELETON_CONFIG}>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          {IS_TECHNICAL_ISSUES_STUB_ENABLED ?
            <TechIssuesStub />
          : <AppContent />}
        </ErrorBoundary>
      </SkeletonTheme>
    </Theme>
  )
}

export default App
