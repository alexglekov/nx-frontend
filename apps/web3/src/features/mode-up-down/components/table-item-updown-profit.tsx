import { FC } from 'react'
import { Flex } from '@radix-ui/themes'
import { UpDownPredict } from '__generated__/graphql'
import { TableItemProfit } from 'shared/ui/bets-table'
import { zeroAddress } from 'viem'
import { useGetSmartContract } from '../../../shared/hooks/use-smart-contracts'
import { Web3Adress } from '../../../shared/types'
import { UpDownInfoTooltip } from './up-down-info-tooltip'

interface Props {
  predict: UpDownPredict
}

export const TableItemUpDownProfit: FC<Props> = ({ predict }) => {
  const {
    smartContractAddress: xyroSmartContractAddress,
    getContractEntryByAddress
  } = useGetSmartContract('XyroToken')

  const { pnl, game } = predict
  const gameContractAddress = game?.contractAddress as Web3Adress

  const gameSmartContract = getContractEntryByAddress(
    gameContractAddress || zeroAddress
  )
  const tokenSmartContractAddress =
    gameSmartContract?.meta?.token || zeroAddress

  const isXyroToken = tokenSmartContractAddress === xyroSmartContractAddress

  return (
    <Flex
      align={'center'}
      height={'100%'}
      gap={'2'}
    >
      <TableItemProfit
        value={pnl}
        gameContractAddress={gameContractAddress}
      />
      <UpDownInfoTooltip
        predict={predict}
        isXyroToken={isXyroToken}
      />
    </Flex>
  )
}
