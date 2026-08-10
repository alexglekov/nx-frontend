import { Asset } from '__generated__/graphql'
import { CreateSetupsGameParams } from 'contracts/setups/types'
import { MS_IN_SEC } from 'shared/constants'
import { CreateSetupForm } from '../types'

export const getCreateSetupVariables = (
  formValues: CreateSetupForm,
  selectedAsset: Asset,
  unverifiedReport: `0x${string}`
): CreateSetupsGameParams => {
  const { setupPosition, setupStopLoss, setupTakeProfit, setupTimeframe } =
    formValues

  const startTime = Math.round(Date.now() / MS_IN_SEC)

  return {
    feedNumber: selectedAsset?.feedNumber ?? 0,
    isLong: setupPosition === 'long',
    unverifiedReport,
    stopLossPrice: Number(setupStopLoss),
    takeProfitPrice: Number(setupTakeProfit),
    endTime: startTime + Number(setupTimeframe),
    startTime
  }
}
