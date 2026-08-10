import { FC, useMemo } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { GameStatus, PredictStatus } from '__generated__/graphql'
import classnames from 'classnames'
import { DataTestIDs } from 'shared/constants'
import upWinnerDecorationsPath from 'shared/icons/background-element-icons/up-down-winner-decorations.svg'
import { WinnersModalPrices } from 'shared/ui/winner-modal-prices/winner-modal-prices'
import { useBullsEyeWinnerModal } from '../hooks/use-bulls-eye-winner-modal'
import { bullsEyeGameVar } from '../store/game.store'
import { getWinnerModalDecorations } from '../utils/get-winner-modal-decorations'
import styles from '../mode-bulls-eye.module.scss'

// eslint-disable-next-line max-statements
export const BullsEyeWinnerModal: React.FC = () => {
  const bullsEyeGame = useReactiveVar(bullsEyeGameVar)

  const { isWinnerModalOpen, currentUserWinBet, currentUserWinBets, status } =
    useBullsEyeWinnerModal()

  const userWinAmount =
    Number(
      currentUserWinBets?.reduce((sum, b) => sum + b.outcome, 0)?.toFixed(2)
    ) || 0

  const isUserWinner =
    currentUserWinBet?.status === PredictStatus.Won && userWinAmount > 0

  const dataTestID = useMemo(() => {
    if (bullsEyeGame?.status === GameStatus.Reject) {
      return bullsEyeWinnerModalReject
    }

    return isUserWinner ? bullsEyeWinnerModalWon : bullsEyeWinnerModalLost
  }, [bullsEyeGame, isUserWinner])

  if (!isWinnerModalOpen) return null

  const {
    containerBorderColor,
    gameStatusText,
    winTextColor,
    gameStatusSecondaryText
  } = getWinnerModalDecorations(currentUserWinBet || null, isUserWinner, status)

  const gameEndPrice = bullsEyeGame?.endPrice || 0

  const winnersModalClassNames = classnames(styles.winnersModal, {
    'border-green': containerBorderColor === 'green',
    'border-pink': containerBorderColor === 'pink'
  })

  const gameStatusTextClassNames = classnames(styles.gameStatusText, {
    'color-green': winTextColor === 'green',
    'color-pink': winTextColor === 'pink'
  })

  const gameStatusSecondaryTextClassNames = classnames(
    styles.gameStatusSecondaryText,
    {
      'color-green': winTextColor === 'green',
      'color-pink': winTextColor === 'pink'
    }
  )

  return (
    <WinnersModalOverlay>
      <Flex
        className={winnersModalClassNames}
        position={'relative'}
        direction={'column'}
        align={'center'}
        justify={'center'}
        gap={'1'}
        data-testId={dataTestID}
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

        <Text
          className={gameStatusSecondaryTextClassNames}
          size={'1'}
          align={'center'}
          weight={'bold'}
        >
          {gameStatusSecondaryText}
        </Text>

        <WinnersModalPrices
          endPrice={gameEndPrice}
          color={winTextColor}
        />
      </Flex>
    </WinnersModalOverlay>
  )
}

// NOTE: Temporaly deprecated logic
// const WinAmount: FC<{ amount: number }> = ({ amount }) => {
//   return (
//     <Flex
//       direction={'column'}
//       mt={'2'}
//     >
//       <Flex
//         align={'center'}
//         gap={'1'}
//       >
//         <TetherToken
//           size={'3rem'}
//           color='yellow'
//         />
//         <Text
//           className={'color-white'}
//           size={'7'}
//           weight={'light'}
//           data-testid={bullsEyeWMPrize}
//         >
//           {amount}
//         </Text>
//       </Flex>
//     </Flex>
//   )
// }

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

const {
  bullsEyeWinnerModalWon,
  bullsEyeWinnerModalLost,
  bullsEyeWinnerModalReject
} = DataTestIDs
