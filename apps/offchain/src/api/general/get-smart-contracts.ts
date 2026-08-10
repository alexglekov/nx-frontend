import { gql } from '__generated__'

export const GET_SMART_CONTRACTS = gql(`
  query getSmartContracts {
    getSmartContracts {
      contractName
      contracts {
        active
        chainId
        contractAddress
        contractName
        meta {
          amount
          fee
          ownerFee
          token
          asset
          isMultiParticipation
        }
        version
      }
    }
  }
`)
