import React from 'react'
import { Flex, Grid } from '@radix-ui/themes'
import { Maybe, WinnerModalParticipantsList } from 'shared/types'
import { WinnerModalHeader } from './winner-modal-header'
import { WinnerModalWinnersList } from './winner-modal-winners-list'
import styles from './winner-modal.module.scss'

interface Props {
  title: string
  isUserPlayed: boolean
  participantsList: Maybe<WinnerModalParticipantsList>
  isOpen?: boolean
  isWin?: boolean
  isCountdownDisabled?: boolean
  children?: React.ReactNode
  modeCardIcon?: string
}
export const WinnerModal: React.FC<Props> = ({
  children,
  isOpen = false,
  title,
  isUserPlayed,
  isWin,
  isCountdownDisabled,
  participantsList,
  modeCardIcon
}) => {
  if (!isOpen) return

  const gameStatusTextColor = isWin ? 'var(--green)' : 'var(--pink)'
  const cardElementsColor = isUserPlayed ? gameStatusTextColor : 'var(--cyan)'

  return (
    <Flex
      position={'absolute'}
      width={'100%'}
      height={'100%'}
      className={styles.winnerModal}
    >
      <Flex
        className={styles.winnerModalInnerWrapper}
        width={'100%'}
        height={'100%'}
        align={'center'}
        justify={'center'}
      >
        <Flex
          className={styles.mainWindow}
          style={{ color: cardElementsColor }}
          align={'start'}
          direction={'column'}
        >
          <WinnerModalHeader
            title={title}
            modeCardIcon={modeCardIcon}
            isUserPlayed={isUserPlayed}
            isWin={isWin}
            elementsColor={cardElementsColor}
            isCountdownDisabled={isCountdownDisabled}
          />

          <Grid
            columns={'1fr 1.5fr'}
            width={'100%'}
            gap={'8'}
            justify={'between'}
            mt={'6'}
          >
            <Flex width={'100%'}>{children}</Flex>

            <Flex width={'100%'}>
              <WinnerModalWinnersList
                participantsBets={participantsList}
                winnerBorderColor={cardElementsColor}
              />
            </Flex>
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  )
}
