/* eslint-disable complexity */
import { FC, useCallback, useMemo, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex } from '@radix-ui/themes'
import { GameStatus, PredictStatus } from '__generated__/graphql'
import cn from 'classnames'
import { useExactPrice } from 'contracts/exact-price'
import { DataTestIDs } from 'shared/constants'
import { useWallet } from 'shared/hooks/use-wallet'
import { balanceVar } from 'shared/store/balance-store'
import { userVar } from 'shared/store/user'
import { OneVsOneGameCustomType } from 'shared/types'
import { Web3Adress } from 'shared/types/web3'
import { XyroLoading } from 'shared/ui'
import { getDataTestIdByWalletStateKey } from 'shared/ui/with-wallet/get-data-test-id'
import { ButtonWithWalletConnection } from 'shared/ui/with-wallet/with-wallet-connection'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { DEFAULT_MAX_PRICE } from '../constants'
import { useGame1vs1RejectInvite } from '../hooks/use-reject-invite-game'
import { gameIdViewVar } from '../store/game-view-store'
import { GameViewDialogResult } from './game-view-dialog-result'
import styles from '../mode-one-vs-one.module.scss'

interface Props {
  game: OneVsOneGameCustomType
  price: string
}

// eslint-disable-next-line max-statements
export const GameViewDialogSubmit: FC<Props> = ({ game, price }) => {
  const user = useReactiveVar(userVar)
  const balance = useReactiveVar(balanceVar)
  const [isLoading, setLoading] = useState<boolean>(false)

  const exactPrice = useExactPrice()

  const { commitCancelGame } = useGame1vs1RejectInvite()

  const { walletStateKey } = useWallet()

  const {
    id,
    isAccepted,
    owner,
    ownerPredict,
    opponentPredict,
    status,
    startPrice,
    stopPredictAt
  } = game

  const isBalanceEnough =
    balance.usdtBalance + balance.treasuryDeposit >= ownerPredict.amount

  const maxPrice = startPrice ? startPrice * 2 : DEFAULT_MAX_PRICE

  const currentPredict = useMemo(() => {
    if (ownerPredict.ownerId === user?.id) {
      return ownerPredict
    }

    if (opponentPredict?.ownerId === user?.id) {
      return opponentPredict
    }

    return null
  }, [ownerPredict, opponentPredict, user])

  const isAcceptShown = useMemo(
    () =>
      isNotNullOrUndef(stopPredictAt) &&
      stopPredictAt > Date.now() &&
      !isAccepted &&
      owner.id !== user?.id,
    [stopPredictAt, isAccepted, owner, user]
  )

  const acceptTitle = isBalanceEnough ? 'ACCEPT GAME' : 'Insufficient funds'

  const isShowCancelGame = useMemo(
    () => user?.id === owner.id && !isAccepted && status === GameStatus.Open,
    [status, user, owner, isAccepted]
  )

  const isResultShown = useMemo(
    () =>
      isNotNullOrUndef(currentPredict) &&
      status === GameStatus.Close &&
      (currentPredict.status === PredictStatus.Won ||
        currentPredict?.status === PredictStatus.Loss),
    [currentPredict, status]
  )

  const acceptDisabled =
    !price ||
    Number(price) === ownerPredict.price ||
    !isBalanceEnough ||
    Number(price) > maxPrice

  const handleGameCancelation = useCallback(async () => {
    setLoading(true)
    await commitCancelGame(game)
    setLoading(false)
    gameIdViewVar(null)
  }, [setLoading, commitCancelGame, game])

  const handleGameConfirmation = useCallback(async () => {
    setLoading(true)
    if (!exactPrice) return

    try {
      await exactPrice.accept({
        gameId: id as Web3Adress,
        amount: String(ownerPredict?.amount),
        opponentPrice: price
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [id, ownerPredict, price, setLoading, exactPrice])

  const dataTestId = getDataTestIdByWalletStateKey(walletStateKey, {
    signInToPlayTestId: buttonOneVsOneSignInToPlay,
    connectWalletTestId: buttonOneVsOneConnectWallet,
    switchChainTestId: buttonOneVsOneSwitchChain,
    actionTestId: buttonOneVsOneAcceptGame
  })

  return (
    <Flex
      direction={'column'}
      mt={'8'}
    >
      {isAcceptShown && (
        <ButtonWithWalletConnection
          className={cn(styles.acceptGameBtn)}
          disabled={acceptDisabled}
          color={'mint'}
          onClick={handleGameConfirmation}
          variant={isLoading ? 'outline' : 'solid'}
          data-testid={dataTestId}
        >
          <XyroLoading loading={isLoading}>{acceptTitle}</XyroLoading>
        </ButtonWithWalletConnection>
      )}

      {isShowCancelGame && (
        <Button
          className={cn(styles.rejectGameBtn, styles.rejectGameBtnWhite)}
          onClick={handleGameCancelation}
        >
          CANCEL GAME
        </Button>
      )}

      {currentPredict && isResultShown && (
        <GameViewDialogResult predict={currentPredict} />
      )}
    </Flex>
  )
}

const {
  buttonOneVsOneConnectWallet,
  buttonOneVsOneSignInToPlay,
  buttonOneVsOneSwitchChain,
  buttonOneVsOneAcceptGame
} = DataTestIDs
