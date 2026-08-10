import { useReactiveVar } from '@apollo/client'
import { oneVsOneIsXyroTokenSelectedVar } from 'features/mode-one-vs-one/store/selected-token'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { balanceVar } from 'shared/store/balance-store'
import { useAccount } from 'wagmi'
import {
  acceptGame,
  acceptGameWithPermit,
  cancelBet,
  createGameWithPermit,
  createGame,
  createGameWithDeposit,
  acceptGameWithDeposit
} from '../calls'
import {
  AcceptExactGameParams,
  CancelExactGameParams,
  CreateExactBetParams
} from '../types'

// eslint-disable-next-line max-statements
export const useExactPrice = () => {
  const account = useAccount()
  const balance = useReactiveVar(balanceVar)
  const isXyroTokenSelected = useReactiveVar(oneVsOneIsXyroTokenSelectedVar)

  const {
    smartContractAddress,
    smartContractVersion,
    getContractVersionByAddress
  } = useGetSmartContract('OneVsOne')
  const { smartContractAddress: usdcContractAddress } =
    useGetSmartContract('USDC')
  const { smartContractAddress: xyroContractAddress } =
    useGetSmartContract('XyroToken')
  const { smartContractAddress: treasuryContractAddress } =
    useGetSmartContract('Treasury')

  const tokenContractAddress =
    isXyroTokenSelected ? xyroContractAddress : usdcContractAddress

  const treasuryDeposit =
    isXyroTokenSelected ? balance.xyroDeposit : balance.treasuryDeposit
  const treasuryAllowance =
    isXyroTokenSelected ? balance.xyroAllowance : balance.treasuryAllowance

  if (!account.address) return

  const createNewBet = (params: CreateExactBetParams) => {
    const { amount } = params

    if (Number(amount) <= treasuryDeposit) {
      return createGameWithDeposit(
        params,
        smartContractAddress,
        tokenContractAddress,
        smartContractVersion,
        isXyroTokenSelected
      )
    }

    if (Number(amount) <= treasuryAllowance) {
      return createGame(
        params,
        smartContractAddress,
        tokenContractAddress,
        smartContractVersion,
        isXyroTokenSelected
      )
    }

    return createGameWithPermit(
      account,
      params,
      smartContractAddress,
      tokenContractAddress,
      treasuryContractAddress,
      smartContractVersion,
      isXyroTokenSelected
    )
  }

  const accept = (params: AcceptExactGameParams) => {
    const { amount } = params

    if (Number(amount) <= treasuryDeposit) {
      return acceptGameWithDeposit(
        params,
        smartContractAddress,
        smartContractVersion
      )
    }

    if (Number(amount) <= treasuryAllowance) {
      return acceptGame(params, smartContractAddress, smartContractVersion)
    }

    return acceptGameWithPermit(
      account,
      params,
      smartContractAddress,
      tokenContractAddress,
      treasuryContractAddress,
      smartContractVersion
    )
  }

  const cancelGame = ({ gameId, contractAddress }: CancelExactGameParams) => {
    const contractVersion = getContractVersionByAddress(contractAddress)

    return cancelBet({ gameId, contractAddress, contractVersion })
  }

  return {
    accept,
    cancelGame,
    createNewBet
  }
}
