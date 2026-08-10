import { Buffer } from 'buffer/'
import { useLoadingOverlay } from './use-loading-overlay'
import { useOffline } from './use-offline'
import { useOnPageChangeNavigateTop } from './use-on-page-change-navigate-top'
import { useSmartContracts } from './use-smart-contracts'
import { useUserMetadata } from './use-user-metadata'
import { useVerifyUser } from './use-verify-user'

// NOTE: This is requirement from binance wallet wagmi lib
//@ts-expect-error Type 'typeof Buffer' is missing the following properties from type 'BufferConstructor': copyBytesFrom, poolSize
window.Buffer = Buffer

export const useAppHookParent = () => {
  useVerifyUser()
  useOffline()
  useUserMetadata()
  useLoadingOverlay()
  useSmartContracts()
  useOnPageChangeNavigateTop()
}
