import { makeVar } from '@apollo/client'
import { ContractEntry } from '__generated__/graphql'

export const smartContractsVar = makeVar<ContractEntry[]>([])
