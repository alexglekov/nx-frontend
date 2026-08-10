import { ReactElement } from 'react'

export interface ApporveBalanceFormValues {
  amount: string
}

export interface RakebackGamesMapType {
  name: string
  icon: ReactElement
  dataSource: 'bullseye' | 'setup' | 'updown' | 'race'
}

export enum ClaimBalanceSwitchTypes {
  Deposit = 'Deposit',
  Approve = 'Approve balance',
  Claim = 'Withdraw treasure'
}

export enum ApprovedBalanceSwitchTypes {
  Tether = 'Tether',
  Xyro = 'Xyro'
}

export type BalanceSwitchType = {
  switchType: ApprovedBalanceSwitchTypes
  icon: React.ReactNode
  balance?: number
  dataTestID: string
}
