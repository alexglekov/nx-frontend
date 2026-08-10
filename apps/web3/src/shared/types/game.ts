import {
  OneVsOneGame,
  SetupGame,
  SmartContractEntity,
  UpDownGame
} from '__generated__/graphql'

export type OneVsOneGameCustomType = OneVsOneGame

export type GameClientType =
  | OneVsOneGame
  | SetupGame
  | UpDownGame
  | OneVsOneGameCustomType

export type GameClientTypeDeprecated = OneVsOneGame | SetupGame | UpDownGame

export type GameModeType =
  | 'oneVsOne'
  | 'setups'
  | 'upDown'
  | 'bullsEye'
  | 'memeWars'

export enum GameStateEnum {
  Open = 'OPEN',
  Inprogress = 'INPROGRESS',
  Pending = 'PENDING'
}

export enum GameModes {
  oneVsOne = 'oneVsOne',
  setups = 'setups',
  upDown = 'upDown',
  bullsEye = 'bullsEye'
}

export interface GameSmartContractEntity extends SmartContractEntity {
  smartContractForXyroToken?: boolean
  token?: string
}
