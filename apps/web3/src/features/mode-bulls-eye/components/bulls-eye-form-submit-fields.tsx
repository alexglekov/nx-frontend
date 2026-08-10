/* eslint-disable max-statements */
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import { Flex } from '@radix-ui/themes'
import { useAddBullsEyeBet } from 'contracts'
import { DataTestIDs, WalletStateStatus } from 'shared/constants'
import { useWallet } from 'shared/hooks/use-wallet'
import { notificationStateVar } from 'shared/store/notification'
import { GameStateEnum } from 'shared/types'
import { useBullsEyeWinnerModal } from '../hooks/use-bulls-eye-winner-modal'
import { bullsEyeCurrentContractAddressVar } from '../store/bulls-eye-contract-addresses.store'
import {
  bullsEyeGameStateVar,
  bullsEyeGameVar,
  isInviteAlertMessageShownVar
} from '../store/game.store'
import { BullsEyeFormAmountField } from './bulls-eye-form-amount-field'
import { BullsEyeBetFormSubmitButton } from './bulls-eye-form-submit-button'
import styles from '../mode-bulls-eye.module.scss'

// eslint-disable-next-line complexity
export const BullsEyeFormSubmitFields: React.FC = () => {
  const [predictPrice, setPredictPrice] = useState<string>('')
  const { addBullsEyeBet, isLoading } = useAddBullsEyeBet()
  const { isReady, walletStateKey } = useWallet()

  const bullsEyeCurrentContractEntity = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )

  const isMultiParticipation = Boolean(
    bullsEyeCurrentContractEntity?.meta?.isMultiParticipation || null
  )

  const bullsEyeGame = useReactiveVar(bullsEyeGameVar)

  const bullsEyeGameState = useReactiveVar(bullsEyeGameStateVar)

  const { isWinnerModalOpen } = useBullsEyeWinnerModal()

  const isInviteAlertShown = useReactiveVar(isInviteAlertMessageShownVar)

  const currentBullsEyeSmartContract = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )

  const bullsEyeBetAmount =
    Number(currentBullsEyeSmartContract?.meta?.amount) || 0

  const isMyBetExists = Boolean(bullsEyeGame?.myPredicts?.[0] || null)

  if (isWinnerModalOpen || isInviteAlertShown) return null

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isMultiParticipation && isMyBetExists) return

    const isSamePredictExists = bullsEyeGame?.myPredicts.find(
      p => p?.price === Number(predictPrice)
    )

    if (isSamePredictExists) {
      notificationStateVar({
        isOpen: true,
        type: 'error',
        title: "You can't predict same price twice"
      })

      return
    }

    return addBullsEyeBet(
      Number(predictPrice),
      bullsEyeBetAmount,
      bullsEyeGame?.token
    ).then(() => setPredictPrice(''))
  }

  const isButtonDisabled =
    isLoading ||
    !bullsEyeGameState ||
    bullsEyeGameState === Inprogress ||
    bullsEyeGameState === Pending ||
    (!isMultiParticipation && isMyBetExists)

  const dataTestID = getDataTestIdByWalletStateKey(walletStateKey)

  return (
    <RadixForm.Root
      className={styles.bullsEyeFormSubmit}
      onSubmit={handleSubmit}
    >
      <Flex
        direction={'column'}
        align={'center'}
        gap={'4'}
        width={'100%'}
        mt={{ initial: '2', sm: '0' }}
        px={{ sm: '0', xs: '0', initial: '4' }}
      >
        {isReady && (
          <BullsEyeFormAmountField
            value={predictPrice}
            setValue={setPredictPrice}
          />
        )}

        <BullsEyeBetFormSubmitButton
          betAmount={bullsEyeBetAmount}
          loading={isLoading}
          disabled={isButtonDisabled}
          dataTestId={dataTestID}
        />
      </Flex>
    </RadixForm.Root>
  )
}

const { Inprogress, Pending } = GameStateEnum

const {
  buttonBullsEyeConnectWallet,
  buttonBullsEyeSwitchChain,
  buttonBullsEyeSignInToPlay,
  buttonBullsEyeMakePredict
} = DataTestIDs

const { connectWallet, signInToPlay, switchChain } = WalletStateStatus

const getDataTestIdByWalletStateKey = (
  walletStateKey: WalletStateStatus | null
) => {
  if (walletStateKey === connectWallet) return buttonBullsEyeConnectWallet

  if (walletStateKey === signInToPlay) return buttonBullsEyeSignInToPlay

  if (walletStateKey === switchChain) return buttonBullsEyeSwitchChain

  return buttonBullsEyeMakePredict
}
