import { AddSetupPredictForm, SetupPredictType } from '../types'

export const getAddSetupVariables = (
  formValues: AddSetupPredictForm,
  betType: SetupPredictType,
  gameId: string
): { data: { amount: number; gameId: string; takeProfit: boolean } } => {
  const amount = Number(
    formValues.setupBetAmount
      ? formValues.setupBetAmount
      : formValues.setupBetAmountSelection
  )

  return {
    data: {
      amount,
      gameId,
      takeProfit: betType === SetupPredictType.TP
    }
  }
}
