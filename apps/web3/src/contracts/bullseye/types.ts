import { SignatureParams } from 'contracts/types'

export type EstimateMakeBullsEyePredictProps = readonly [bigint]
export type EstimateMakeBullsEyePredictWithPermitProps = readonly [
  ...EstimateMakeBullsEyePredictProps,
  SignatureParams
]
