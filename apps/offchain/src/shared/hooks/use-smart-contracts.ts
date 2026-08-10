import { useCallback, useEffect, useLayoutEffect } from 'react'
import { useLazyQuery, useReactiveVar } from '@apollo/client'
import { GET_SMART_CONTRACTS } from 'api/general/get-smart-contracts'
import { APP_CHAIN } from 'app/wagmi-config'
import { DEFAULT_CONTRACT_VERSION } from 'contracts/constants'
import { smartContractsVar } from 'shared/store/contracts'
import { globalOverlaySmartContractsLoadingVar } from 'shared/store/global-overlay-state-store'
import { notificationStateVar } from 'shared/store/notification'
import { Web3Adress } from 'shared/types'
import { zeroAddress } from 'viem'

type ContractEntryName =
  | 'OneVsOne'
  | 'UpDown'
  | 'FrontHelper'
  | 'Dataverifier'
  | 'Bullseye'
  | 'RevenueBank'
  | 'USDC'
  | 'XyroToken'
  | 'Treasury'
  | 'Setup'
  | 'Race'

export const useSmartContracts = () => {
  const [getSmartContracts, { loading }] = useLazyQuery(GET_SMART_CONTRACTS)

  const handleGetSmartContracts = useCallback(async () => {
    try {
      const res = await getSmartContracts()

      const smartContractEntries = res.data?.getSmartContracts || null

      if (!smartContractEntries) return

      smartContractsVar(smartContractEntries)
    } catch {
      notificationStateVar({
        isOpen: true,
        type: 'error',
        title: 'Error! Smart contract addresses were not fetched'
      })
    }
  }, [getSmartContracts])

  useEffect(() => {
    globalOverlaySmartContractsLoadingVar(loading)
  }, [loading])

  useLayoutEffect(() => {
    handleGetSmartContracts()
  }, [handleGetSmartContracts])
}

export const useGetSmartContract = (contractType: ContractEntryName) => {
  const smartContracts = useReactiveVar(smartContractsVar)

  const smartContractEntry = smartContracts.find(
    c => c.contractName === contractType
  )

  const highestContractsVersion =
    [...(smartContractEntry?.contracts || [])]
      ?.filter(c => c.chainId === APP_CHAIN.id)
      ?.sort((a, b) => b?.version - a?.version)?.[0]?.version ||
    DEFAULT_CONTRACT_VERSION

  const smartContractAddress = (smartContractEntry?.contracts
    ?.filter(c => c.chainId === APP_CHAIN.id)
    ?.find(c => c?.version === highestContractsVersion)?.contractAddress ||
    smartContractEntry?.contracts?.[0]?.contractAddress ||
    zeroAddress) as Web3Adress

  const smartContractVersion =
    smartContractEntry?.contracts
      ?.filter(c => c.chainId === APP_CHAIN.id)
      ?.find(c => c?.version === highestContractsVersion)?.version ||
    smartContractEntry?.contracts?.[0]?.version ||
    DEFAULT_CONTRACT_VERSION

  const getContractVersionByAddress = (address: Web3Adress) => {
    return (
      smartContractEntry?.contracts?.find(c => c?.contractAddress === address)
        ?.version ||
      smartContractEntry?.contracts?.[0]?.version ||
      DEFAULT_CONTRACT_VERSION
    )
  }

  const getContractEntryByAddress = (address: Web3Adress) => {
    const contractEntry = smartContracts.find(c =>
      c.contracts?.some(contract => contract.contractAddress === address)
    )

    const contractEntity = contractEntry?.contracts?.find(
      c => c.contractAddress === address
    )

    return contractEntity
  }

  return {
    smartContractEntry,
    smartContractAddress,
    smartContractVersion,
    getContractVersionByAddress,
    getContractEntryByAddress
  }
}
