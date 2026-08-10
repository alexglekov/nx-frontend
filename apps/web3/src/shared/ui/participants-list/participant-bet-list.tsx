import React from 'react'
import { Grid, ScrollArea } from '@radix-ui/themes'
import {
  BetType,
  BullseyePredict,
  Maybe,
  UpDownPredict
} from '__generated__/graphql'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import { XyroAvatar } from 'shared/ui'
import { ParticipantBet } from 'shared/ui/participants-list/participant-bet'
import styles from './participants-list.module.scss'

interface Props {
  bets: BullseyePredict[] | UpDownPredict[] | null
  gameMode?: 'upDown' | 'bullsEye'
  myBets?: Maybe<BullseyePredict[] | UpDownPredict[]>
  isGameForXyroToken?: boolean
  dataTestId?: DataTestIDs
}
export const ParticipantsContainer: React.FC<Props> = ({
  bets,
  gameMode,
  dataTestId,
  myBets = [],
  isGameForXyroToken = false
}) => {
  if (!bets || bets.length <= 0) return null

  const isBullsEyeMode = gameMode === 'bullsEye'
  const myPredictsLength = myBets?.length || 0

  return (
    <ScrollArea
      type='auto'
      scrollbars='vertical'
      className={isBullsEyeMode ? styles.scrollAreaBullsEye : styles.scrollArea}
    >
      <Grid
        className={
          isBullsEyeMode ?
            cn(styles.participantBetListContainerBullseye, {
              [styles.participantBetListContainerBullseyeMyBets]:
                myPredictsLength > 2,
              [styles.participantBetListContainerBullseyeMyBet]:
                myPredictsLength <= 2 && myPredictsLength > 0
            })
          : styles.participantBetListContainer
        }
      >
        <ParticipantBetList
          bets={bets}
          isBullsEye={isBullsEyeMode}
          isGameForXyroToken={isGameForXyroToken}
          dataTestId={dataTestId}
        />
      </Grid>
    </ScrollArea>
  )
}

const ParticipantBetList = ({
  bets,
  isBullsEye,
  dataTestId,
  isGameForXyroToken = false
}: {
  isBullsEye: boolean
  bets: Maybe<BullseyePredict[] | UpDownPredict[]>
  dataTestId?: DataTestIDs
  isGameForXyroToken?: boolean
}) => {
  const [isMobile] = useResponsive(['sm', 'xs'])

  const MAX_PARTICIPANTS =
    isBullsEye ? MAX_PARTICIPANTS_BULLS_EYE : MAX_PARTICIPANTS_UP_DOWN

  if (!bets) return null

  // eslint-disable-next-line complexity, max-statements
  return bets.map((bet, i, arr) => {
    const { owner, amount } = bet

    const { avatarUris, wallet, id, name, level } = owner || {}

    const betValue = isBullsEye && 'price' in bet ? bet?.price : amount ?? 0
    const betType = isBullsEye ? Price : Updown
    const walletAddress = wallet?.address || ''
    const restParticipantsCount = `+${arr.length - MAX_PARTICIPANTS}`

    const isWinStreak =
      !isBullsEye && 'winStreakLength' in bet && bet.winStreakLength > 1 ?
        true
      : false

    const isShowRestCounter =
      arr.length > MAX_PARTICIPANTS && i === MAX_PARTICIPANTS - 1 && isMobile

    if (i > MAX_PARTICIPANTS - 1 && isMobile) return null

    return (
      <>
        <ParticipantBet
          key={walletAddress}
          address={walletAddress}
          id={id || ''}
          value={betValue}
          ownerName={name || ''}
          avatarUrl={avatarUris?.[0] || ''}
          betType={betType}
          isWinStreak={isWinStreak}
          userLevel={level?.levelId || 0}
          isGameForXyroToken={isGameForXyroToken}
          dataTestId={dataTestId}
        />

        {isShowRestCounter ?
          <XyroAvatar
            className={styles.participantListCounter}
            fallback={restParticipantsCount}
            displayLevel={false}
            color={'yellow'}
            size={'2'}
          />
        : null}
      </>
    )
  })
}

const { Price, Updown } = BetType
const MAX_PARTICIPANTS_UP_DOWN = 3
const MAX_PARTICIPANTS_BULLS_EYE = 6
