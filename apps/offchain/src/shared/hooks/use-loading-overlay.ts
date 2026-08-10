import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import {
  globalOverlayAssetsLoadingVar,
  globalOverlayBalanceLoadingVar,
  globalOverlayLoadingVar,
  globalOverlaySmartContractsLoadingVar,
  globalOverlayUserLoadingVar
} from 'shared/store/global-overlay-state-store'

export const useLoadingOverlay = () => {
  const globalOverlayBalanceLoading = useReactiveVar(
    globalOverlayBalanceLoadingVar
  )
  const globalOverlayUserLoading = useReactiveVar(globalOverlayUserLoadingVar)
  const globalOverlayAssetsLoading = useReactiveVar(
    globalOverlayAssetsLoadingVar
  )
  const globalOverlaySmartContractsLoading = useReactiveVar(
    globalOverlaySmartContractsLoadingVar
  )

  useEffect(() => {
    if (
      globalOverlayBalanceLoading ||
      globalOverlayUserLoading ||
      globalOverlayAssetsLoading ||
      globalOverlaySmartContractsLoading
    )
      return

    globalOverlayLoadingVar(false)
  }, [
    globalOverlayBalanceLoading,
    globalOverlayUserLoading,
    globalOverlayAssetsLoading,
    globalOverlaySmartContractsLoading
  ])
}
