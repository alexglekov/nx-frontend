import React from 'react'
import { GlobalLoaderOverlay } from 'shared/components'
import { OfflineModal } from 'shared/ui/offline-modal/offline-modal'
import { AppRoutes } from './app-routes'

export const AppContent: React.FC = () => {
  return (
    <>
      <AppRoutes />

      {/* TODO: move modals and overlays to main layout */}
      <GlobalLoaderOverlay />
      <OfflineModal />
    </>
  )
}
