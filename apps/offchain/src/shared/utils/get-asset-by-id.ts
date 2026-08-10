import { assetsGlobalVar } from '../store/assets-store'
import { AssetId } from '../types'

export const getAssetById = (assetId: AssetId) => {
  const assetsList = assetsGlobalVar()

  return assetsList?.find(asset => asset.id === assetId)
}
