import React, { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { GameStatus } from '__generated__/graphql'
import cn from 'classnames'
import { memeWarsGameVar } from '../store/meme-wars-game.store'
import { MemeWarsWinnerModalCommonType } from '../types'
import { MemeWarsWinnerModalCommon } from './meme-wars-winner-modal-common'
import { MemeWarsGraphWinnerModalUnparticipated } from './meme-wars-winner-modal-game-unparticipated'
import { MemeWarsGraphWinnerModalRejected } from './meme-wars-winner-modal-rejected'
import styles from '../mode-meme-wars.module.scss'

// eslint-disable-next-line max-statements, complexity
export const MemeWarsGraphWinnerModal: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus | null>(null)

  const memeWarsGame = useReactiveVar(memeWarsGameVar)
  const memeWarsGameStatus = memeWarsGame?.status || null
  const isMyPredictExists = (memeWarsGame?.myPredicts?.length || 0) > 0

  useEffect(() => {
    if (!memeWarsGameStatus || memeWarsGameStatus === GameStatus.Open) return

    setGameStatus(memeWarsGameStatus)
  }, [memeWarsGameStatus, memeWarsGame])

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      setGameStatus(null)
    }, 10000)

    return () => {
      clearTimeout(timeout)
    }
  }, [gameStatus])

  if (!gameStatus) return null

  const myPredicts = memeWarsGame?.myPredicts || []

  const totalAmount = myPredicts?.reduce(
    (sum, p) => (sum = sum + (p?.amount || 0)),
    0
  )

  const totalPNL = myPredicts?.reduce(
    (sum, p) => (sum = sum + (p?.pnl || 0)),
    0
  )

  const playedGamePredictsResult =
    totalPNL > totalAmount ?
      MemeWarsWinnerModalCommonType.Win
    : MemeWarsWinnerModalCommonType.Loss

  const isWin = playedGamePredictsResult === MemeWarsWinnerModalCommonType.Win

  return (
    <Flex
      className={styles.winnerModalWrapper}
      position={'absolute'}
      align={'center'}
      justify={'center'}
    >
      <Flex
        className={cn(styles.winnerModalContentWrapper, {
          'border-green': isWin && isMyPredictExists,
          'border-pink': !isWin && isMyPredictExists
        })}
      >
        {gameStatus === GameStatus.Reject && (
          <MemeWarsGraphWinnerModalRejected />
        )}

        {gameStatus === GameStatus.Close && isMyPredictExists && (
          <MemeWarsWinnerModalCommon
            result={playedGamePredictsResult}
            totalPNL={totalPNL}
          />
        )}

        {gameStatus === GameStatus.Close && !isMyPredictExists && (
          <MemeWarsGraphWinnerModalUnparticipated />
        )}
      </Flex>
    </Flex>
  )
}
