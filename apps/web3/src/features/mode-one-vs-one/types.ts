import {
  OneVsOneBetDirectionType,
  OneVsOneGame,
  User
} from '__generated__/graphql'
import { Web3Adress } from 'shared/types/web3'
import { CONDITION_OPTIONS } from './constants'

export type BetConditionType =
  | typeof CONDITION_OPTIONS.UP_DOWN
  | typeof CONDITION_OPTIONS.EXACT_PRICE

export interface Create1vs1BetForm {
  predictAsset: string
  betCondition: BetConditionType
  betAmount: number
  isBetPrivate: 'on' | 'off'
  predictExactPrice?: number
  betDirection?: OneVsOneBetDirectionType
  betOpponent?: string
  predictTimeframe?: number
  betDate?: Date
  betTime?: string
}

export enum FieldNames {
  predictAsset = 'predictAsset',
  betDate = 'betDate',
  betTime = 'betTime',
  predictTimeframe = 'predictTimeframe',
  betCondition = 'betCondition',
  betDirection = 'betDirection',
  predictExactPrice = 'predictExactPrice',
  betAmount = 'betAmount',
  isPrivate = 'isPrivate',
  betOpponent = 'betOpponent'
}

export type OneVsOneCreateFormState = {
  [FieldNames.predictAsset]?: string
  [FieldNames.predictExactPrice]?: string
  [FieldNames.betAmount]?: string
  [FieldNames.predictTimeframe]?: number
  [FieldNames.isPrivate]: boolean
  [FieldNames.betOpponent]?: User
}

export interface CreateBetData {
  betAmount: string
  startTime: number
  endTime: number
  isExact: boolean
  feedId: Web3Adress
  opponentId?: Web3Adress | null
  timeframe: number
  isPrivate: boolean
  willGoUp?: boolean
  initiatorPrice?: number
}

export interface ExistingGame {
  game: OneVsOneGame
  type: 'public' | 'private' | 'current' | 'completed' | 'expired'
}

export enum BetDirection {
  Up = 'UP',
  Down = 'DOWN'
}
