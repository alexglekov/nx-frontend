import { SignatureParams } from 'contracts/types'

export type EstimateMakeUpDownPredictProps = [boolean, bigint]
export type EstimateMakeUpDownPredictWithPermitProps = [
  ...EstimateMakeUpDownPredictProps,
  SignatureParams
]
