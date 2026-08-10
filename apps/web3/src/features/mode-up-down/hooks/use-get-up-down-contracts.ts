import { useCallback, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { GameSmartContractEntity } from 'shared/types'
import {
  upDownContractsVar,
  upDownCurrentContractVar
} from '../store/up-down-contract-addresses.store'

export const useGetUpDownContracts = () => {
  const upDownSmartContracts = useReactiveVar(upDownContractsVar)
  const currentUpDownSmartContract = useReactiveVar(upDownCurrentContractVar)

  const { smartContractEntry } = useGetSmartContract('UpDown')
  const { smartContractAddress: xyroSmartContractAddress } =
    useGetSmartContract('XyroToken')

  const upDownContractAddressesData = smartContractEntry?.contracts || null

  useEffect(() => {
    if (!upDownContractAddressesData) return

    const sortedUpDownSmartContracts = [...upDownContractAddressesData]?.sort(
      (a, b) => Number(a?.meta?.amount) - Number(b.meta?.amount)
    )

    const upDownSmartContracts = sortedUpDownSmartContracts.map(contract => {
      const isXyroContract =
        contract?.meta?.token === xyroSmartContractAddress || false

      return {
        ...contract,
        smartContractForXyroToken: isXyroContract,
        token: isXyroContract ? 'XYRO' : 'USDT'
      }
    })

    upDownContractsVar(upDownSmartContracts)

    upDownCurrentContractVar(upDownSmartContracts?.[0] || null)
  }, [upDownContractAddressesData])

  const handleChangeUpDownSmartContract = useCallback(
    (contract: GameSmartContractEntity) => {
      upDownCurrentContractVar(contract)
    },
    []
  )

  return {
    handleChangeUpDownSmartContract,
    currentUpDownSmartContract,
    upDownSmartContracts
  }
}
