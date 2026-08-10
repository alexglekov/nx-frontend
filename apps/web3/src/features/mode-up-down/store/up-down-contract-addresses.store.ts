import { makeVar } from '@apollo/client'
import { GameSmartContractEntity } from 'shared/types'

export const upDownContractsVar = makeVar<GameSmartContractEntity[]>([])

export const upDownContractAddressesLoadingVar = makeVar<boolean>(true)

export const upDownCurrentContractVar = makeVar<GameSmartContractEntity | null>(
  null
)
