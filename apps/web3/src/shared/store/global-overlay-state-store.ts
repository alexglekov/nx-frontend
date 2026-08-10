import { makeVar } from '@apollo/client'

export const globalOverlayBalanceLoadingVar = makeVar<boolean>(true)
export const globalOverlayUserLoadingVar = makeVar<boolean>(true)
export const globalOverlayAssetsLoadingVar = makeVar<boolean>(true)
export const globalOverlaySmartContractsLoadingVar = makeVar<boolean>(true)

export const globalOverlayLoadingVar = makeVar<boolean>(true)
