import { SignatureParams } from 'contracts/types'
import { Web3Adress } from 'shared/types/web3'

export interface CreateSetupsGameParams {
  startTime: number
  endTime: number
  takeProfitPrice: number
  stopLossPrice: number
  isLong: boolean
  feedNumber: number
  unverifiedReport: `0x${string}`
}

export interface PlaySetupParams {
  isStopLoss: boolean
  depositAmount: string
  gameId: string
  contractAddress: Web3Adress
}

export type InitiateCreateSetupGameParams = readonly [
  boolean,
  bigint,
  bigint,
  bigint,
  Web3Adress,
  Web3Adress
]
export type InitiatePlaySetupGameParams = readonly [boolean, bigint, Web3Adress]
export type InitiatePlaySetupGameWithPermitParams = readonly [
  ...InitiatePlaySetupGameParams,
  SignatureParams
]
