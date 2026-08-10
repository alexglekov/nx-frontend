/* eslint-disable max-lines */

import { FC, useMemo } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { GameStatus } from '__generated__/graphql'
import classnames from 'classnames'
import { DataTestIDs } from 'shared/constants'
import upWinnerDecorationsPath from 'shared/icons/background-element-icons/up-down-winner-decorations.svg'
import { Maybe } from 'shared/types'
import { TetherToken, WinnersModalPrices } from 'shared/ui'
import { formatToTether } from 'shared/utils/format-price'
import { SwapXyroToken } from '../../../shared/icons'
import { useControlWinnerModal } from '../hooks/use-control-winner-modal'
import { useGetUpDownContracts } from '../hooks/use-get-up-down-contracts'
import { upDownGameVar } from '../store/game.store'
import { getWinnerModalDecorations } from '../utils/get-winner-modal-decorations'
import styles from '../mode-up-down.module.scss'

interface Props {
  isUpPoolWin?: Maybe<boolean>
}

// eslint-disable-next-line max-statements, complexity
export const UpDownWinnersModal: React.FC<Props> = () => {
  const { currentUpDownSmartContract } = useGetUpDownContracts()
  const game = useReactiveVar(upDownGameVar)
  const userPredict = game?.myPredict || null

  const { isWinnerModalOpen, userPayout } = useControlWinnerModal()

  const dataTestID = useMemo(() => {
    if (game?.status === GameStatus.Reject) {
      return resultUpDownRejected
    }

    return game?.isUp ? resultUpDownUpWins : resultUpDownDownWins
  }, [game])

  if (!isWinnerModalOpen || game?.status === GameStatus.Open) return null

  const isUp = game?.isUp as boolean // typesafe
  const upPoolPredictsCount = game?.upPool.predictsCount || 0
  const downPoolPredictsCount = game?.downPool.predictsCount || 0
  const isPoolsFilled = upPoolPredictsCount > 0 && downPoolPredictsCount > 0

  const { containerBorderColor, isUserWinner, gameStatusText, winTextColor } =
    getWinnerModalDecorations(isUp, userPredict, isPoolsFilled)

  const winnersModalClassNames = classnames(styles.winnersModal, {
    'border-green': containerBorderColor === 'green',
    'border-pink': containerBorderColor === 'pink'
  })

  const gameStatusTextClassNames = classnames(styles.gameStatusText, {
    'color-green': winTextColor === 'green',
    'color-pink': winTextColor === 'pink'
  })

  const gameStartPrice = game?.startPrice || 0
  const gameEndPrice = game?.endPrice || 0

  return (
    // TODO: extract the shared winner-modal wrapper with styles to the shared/ui
    <WinnersModalOverlay>
      <Flex
        className={winnersModalClassNames}
        position={'relative'}
        direction={'column'}
        align={'center'}
        justify={'center'}
        gap={'1'}
        data-testid={dataTestID}
      >
        {isUserWinner ?
          <img
            className={styles.decorationsIcon}
            src={upWinnerDecorationsPath}
            alt="winner's modal bg decorations"
          />
        : null}

        <Text
          className={gameStatusTextClassNames}
          align={'center'}
          weight={'bold'}
        >
          {gameStatusText?.toUpperCase()}
        </Text>

        {userPredict && isPoolsFilled ?
          <WinAmount
            isUserWinner={isUserWinner}
            amount={userPayout}
            isGameForXyroToken={
              currentUpDownSmartContract?.smartContractForXyroToken
            }
          />
        : null}

        {isPoolsFilled && (
          <WinnersModalPrices
            color={winTextColor}
            endPrice={gameEndPrice}
            startPrice={gameStartPrice}
          />
        )}
      </Flex>
    </WinnersModalOverlay>
  )
}

interface WinAmountProps {
  amount: number
  isUserWinner: boolean
  isGameForXyroToken?: boolean
}

const WinAmount: FC<WinAmountProps> = ({
  amount,
  isUserWinner,
  isGameForXyroToken = false
}) => {
  const formattedAmount = formatToTether(amount)

  return (
    <Flex
      direction={'column'}
      mt={'2'}
    >
      <Text
        size={'1'}
        weight={'bold'}
        align={'center'}
        className={classnames(styles.winText, { 'color-pink': !isUserWinner })}
      >
        {isUserWinner ? 'YOU WON' : 'YOU LOSE'}
      </Text>
      {isUserWinner && (
        <Flex
          align={'center'}
          gap={'1'}
        >
          {isGameForXyroToken ?
            <SwapXyroToken
              width={'2rem'}
              height={'2rem'}
            />
          : <TetherToken
              size='2rem'
              className='color-yellow'
            />
          }

          <Text
            className={'color-white'}
            size={'7'}
            weight={'light'}
          >
            {formattedAmount}
          </Text>
        </Flex>
      )}
    </Flex>
  )
}

interface OverlayProps {
  children: React.ReactNode
}
const WinnersModalOverlay: FC<OverlayProps> = ({ children }) => {
  return (
    <Flex
      className={styles.winnersModalOverlay}
      position={'absolute'}
      width={'100%'}
      height={'100%'}
      align={'center'}
      justify={'center'}
    >
      {children}
    </Flex>
  )
}

const { resultUpDownUpWins, resultUpDownDownWins, resultUpDownRejected } =
  DataTestIDs
