import { useCallback, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { GameSmartContractEntity } from 'shared/types'
import {
  bullsEyeContractAddressesVar,
  bullsEyeCurrentContractAddressVar
} from '../store/bulls-eye-contract-addresses.store'

export const useGetBullsEyeContracts = () => {
  const bullsEyeSmartContracts = useReactiveVar(bullsEyeContractAddressesVar)
  const currentBullsEyeSmartContract = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )

  const { smartContractEntry } = useGetSmartContract('Bullseye')
  const { smartContractAddress: xyroSmartContractAddress } =
    useGetSmartContract('XyroToken')

  const bullsEyeContractAddressesData = smartContractEntry?.contracts || null

  useEffect(() => {
    if (!bullsEyeContractAddressesData) return

    const sortedBullsEyeContractAddressesData = [
      ...bullsEyeContractAddressesData
    ]?.sort((a, b) => Number(a?.meta?.amount) - Number(b.meta?.amount))

    const newBullsEyeContractAddressesData =
      sortedBullsEyeContractAddressesData.map(contract => {
        const isXyroContract =
          contract?.meta?.token === xyroSmartContractAddress || false

        return {
          ...contract,
          smartContractForXyroToken: isXyroContract,
          token: isXyroContract ? 'XYRO' : 'USDT'
        }
      })

    bullsEyeContractAddressesVar(newBullsEyeContractAddressesData)

    bullsEyeCurrentContractAddressVar(
      newBullsEyeContractAddressesData?.[0] || null
    )
  }, [bullsEyeContractAddressesData])

  const handleChangeBullsEyeSmartContract = useCallback(
    (contract: GameSmartContractEntity) => {
      bullsEyeCurrentContractAddressVar(contract)
    },
    []
  )

  return {
    handleChangeBullsEyeSmartContract,
    currentBullsEyeSmartContract,
    bullsEyeSmartContracts
  }
}
