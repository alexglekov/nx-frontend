import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { userVar } from 'shared/store/user'
import { ParticipantsInfo } from 'shared/ui'
import { BetsPoolCalloutType } from 'shared/ui/bets-pool-callout'
import { useBullsEyeWinnerModal } from '../hooks/use-bulls-eye-winner-modal'
import { bullsEyeCurrentContractAddressVar } from '../store/bulls-eye-contract-addresses.store'
import {
  bullsEyeGameVar,
  isInviteAlertMessageShownVar
} from '../store/game.store'
import { DataTestIDs } from 'shared/constants'

// eslint-disable-next-line complexity, max-statements
export const BullsEyeFormUserList: React.FC = () => {
  const currentBullsEyeSmartContract = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )
  const user = useReactiveVar(userVar)

  const bullsEyeGame = useReactiveVar(bullsEyeGameVar)

  const bets = bullsEyeGame?.predicts || []
  const betsToDisplay = bets.filter(bet => bet.owner?.id !== user?.id)

  const isMyBetExists = Boolean(bullsEyeGame?.myPredicts?.[0])
  const myPredicts = bullsEyeGame?.myPredicts || []

  const { isWinnerModalOpen, isWinnersListOpen } = useBullsEyeWinnerModal()
  const isInviteAlertMessageShown = useReactiveVar(isInviteAlertMessageShownVar)

  if (isWinnerModalOpen || isWinnersListOpen) return null

  const isEmptyPoolCallout =
    bets.length === 0 &&
    !isInviteAlertMessageShown &&
    myPredicts.length < 2 &&
    BetsPoolCalloutType.noPlayers

  const isNoPlayersCallout =
    betsToDisplay.length === 0 &&
    isMyBetExists &&
    !isInviteAlertMessageShown &&
    myPredicts.length < 2 &&
    BetsPoolCalloutType.emptyPool

  const participantsListMessage =
    isNoPlayersCallout || isEmptyPoolCallout || null

  return (
    <Flex
      direction={'column'}
      align={'center'}
      gap={'3'}
      width={'100%'}
    >
      {bets.length > 0 && (
        <Text
          className='color-gray'
          size={'2'}
          weight={'medium'}
        >
          TOP PLAYERS:
        </Text>
      )}

      <ParticipantsInfo
        myBets={myPredicts}
        bets={betsToDisplay || []}
        messageType={participantsListMessage}
        isDefaultTitleShown={false}
        gameMode={'bullsEye'}
        dataTestId={DataTestIDs.bullsEyeCurrentPlayer}
        isGameForXyroToken={
          currentBullsEyeSmartContract?.smartContractForXyroToken
        }
      />
    </Flex>
  )
}
