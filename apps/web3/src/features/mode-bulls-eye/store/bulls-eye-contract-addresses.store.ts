import { makeVar } from '@apollo/client'
import { GameSmartContractEntity } from 'shared/types'

export const bullsEyeContractAddressesVar = makeVar<GameSmartContractEntity[]>(
  []
)

export const bullsEyeContractAddressesLoadingVar = makeVar<boolean>(true)

export const bullsEyeCurrentContractAddressVar =
  makeVar<GameSmartContractEntity | null>(null)
