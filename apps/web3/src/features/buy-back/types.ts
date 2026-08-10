import { ReactElement } from 'react'
import { DataTestIDs } from 'shared/constants'
import { Web3Adress } from 'shared/types'

export type BuybackInputPercent = {
  title: '25%' | '50%' | '75%' | 'MAX'
  multiplier: number
  dataTestId: DataTestIDs
}

export type BridgeOption = {
  tokenAddress: Web3Adress
  routerAddress: Web3Adress
  chainSelector: string
}

export type OverviewItemType = {
  title: string
  dataSource: 'networkFee' | 'minReceived' | 'expectedOutput'
  tooltipTitle: string
  token: 'usdt' | 'xyro' | 'eth'
}

export type OverviewValuesType = {
  minReceived?: string
  networkFee: string
  expectedOutput: string
}

export interface ReviewDialogProps {
  amount?: string
  loading?: boolean
  tokenTitles?: [string, string]
  tokens?: [ReactElement, ReactElement]
  reviewSwapData?: OverviewValuesType
  handleConfirm?: (amount: string) => void
  handleClose?: () => void
}

export type ResultSwapForm = {
  Buy: string
  Sell: string
}

export interface BuyBackReviewDialogAssetItem {
  amount?: string
  assetIcon: React.ReactNode
  assetName: string
}
