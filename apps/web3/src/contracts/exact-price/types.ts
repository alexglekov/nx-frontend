import { Maybe } from '__generated__/graphql'
import { SignatureParams } from 'contracts/types'
import { Web3Adress } from 'shared/types/web3'

export interface CreateExactBetParams {
  feedNumber: number
  opponent: Maybe<Web3Adress>
  startTime: number
  endTime: number
  initiatorPrice: string
  amount: string
}

export interface AcceptExactGameParams {
  amount: string
  gameId: Web3Adress
  opponentPrice: string
}

export interface CancelExactGameCallParams {
  gameId: Web3Adress
  contractAddress: Web3Adress
  contractVersion: number
}

export interface CancelExactGameParams {
  gameId: Web3Adress
  contractAddress: Web3Adress
}

export type InitiateAcceptGameParams = readonly [Web3Adress, bigint]

export type InitiateAcceptGameWithPermitParams = readonly [
  ...InitiateAcceptGameParams,
  SignatureParams
]

export type InitiateCreateGameParams = readonly [
  Web3Adress,
  Web3Adress,
  number,
  bigint,
  bigint
]

export type InitiateCreateGameWithPermitParams = readonly [
  ...InitiateCreateGameParams,
  SignatureParams
]
