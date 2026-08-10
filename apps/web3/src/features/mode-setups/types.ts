export interface CreateSetupForm {
  setupAsset: string
  setupPosition: 'long' | 'short'
  setupStopLoss: string
  setupTakeProfit: string
  /** Seconds */
  setupTimeframe: string
}

export enum FieldNames {
  setupAsset = 'setupAsset',
  setupPosition = 'setupPosition',
  setupStopLoss = 'setupStopLoss',
  setupTakeProfit = 'setupTakeProfit',
  setupTimeframe = 'setupTimeframe'
}

export interface AddSetupPredictForm {
  gameId: string
  setupBetAmountSelection: string
  setupBetAmount?: string
}

export enum AddBetFieldNames {
  betAmountSelection = 'setupBetAmountSelection',
  betAmount = 'setupBetAmount',
  betType = 'betType'
}

export enum SetupPredictType {
  TP = 'TP',
  SL = 'SL'
}
