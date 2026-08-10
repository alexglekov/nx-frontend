import React, { useMemo } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { BullseyePredict, Maybe, UpDownPredict } from '__generated__/graphql'
import { DataTestIDs } from 'shared/constants'
import { BetsPoolCalloutType } from '../bets-pool-callout'
import { BetsPoolCallout } from '../bets-pool-callout/bets-pool-callout'
import { ParticipantsContainer } from './participant-bet-list'
import styles from './participants-list.module.scss'

interface Props {
  bets: Maybe<BullseyePredict[] | UpDownPredict[]>
  messageType: Maybe<BetsPoolCalloutType>
  dataTestId?: DataTestIDs
  isDefaultTitleShown?: boolean
  gameMode?: 'upDown' | 'bullsEye'
  isGameForXyroToken?: boolean
  myBets?: Maybe<BullseyePredict[] | UpDownPredict[]>
}

export const ParticipantsInfo: React.FC<Props> = ({
  bets,
  dataTestId,
  messageType = null,
  isDefaultTitleShown = true,
  gameMode = 'upDown',
  isGameForXyroToken = false,
  myBets = []
}) => {
  const sortedBets = useMemo(
    () =>
      gameMode === 'upDown' ?
        bets?.toSorted((a, b) => (b?.amount || 0) - (a?.amount || 0)) || []
      : bets,
    [bets]
  )

  return (
    <Flex
      className={styles.participantsList}
      direction={'column'}
      align={'center'}
      gap={{ initial: '2', sm: '3' }}
      position={'relative'}
      width={'100%'}
    >
      {isDefaultTitleShown ?
        <Text
          size={'3'}
          weight={'bold'}
          className={styles.poolSizeTitle}
          align={'center'}
        >
          TOP PLAYERS
        </Text>
      : null}

      <BetsPoolCallout messageType={messageType} />

      <ParticipantsContainer
        dataTestId={dataTestId}
        bets={sortedBets || null}
        gameMode={gameMode}
        myBets={myBets}
        isGameForXyroToken={isGameForXyroToken}
      />
    </Flex>
  )
}
