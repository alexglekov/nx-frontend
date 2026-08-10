import React, { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { SetupsPredictFragment, User } from '__generated__/graphql'
import { userVar } from 'shared/store/user'
import { WinnerModalParticipantsList } from 'shared/types'
import { WinnerModalWinnersListItem } from './winner-modal-winner-list-item'
import styles from './winner-modal.module.scss'

// TODO: replace mock data with real one
const BET_POSITION_MOCK = 1

interface Props {
  participantsBets: WinnerModalParticipantsList | null
  winnerBorderColor: string
}
// eslint-disable-next-line max-statements
export const WinnerModalWinnersList: React.FC<Props> = ({
  winnerBorderColor,
  participantsBets
}) => {
  const user = useReactiveVar(userVar)

  const myBetPosition = BET_POSITION_MOCK

  const [isWinnersListLoading, setWinnersListLoading] = useState(true)
  const isWinnerListEmpty = !participantsBets || participantsBets.length === 0

  useEffect(() => {
    if (isWinnersListLoading && isWinnerListEmpty) return

    setWinnersListLoading(false)
  }, [isWinnersListLoading, participantsBets, isWinnerListEmpty])

  if (isWinnersListLoading)
    return <WinnersListMessageWrapper message='Loading...' />

  if (isWinnerListEmpty && !isWinnersListLoading)
    return (
      <WinnersListMessageWrapper
        message={`There are no participants in this game :(`}
      />
    )

  return (
    <Flex
      className={styles.winnersListContainer}
      direction={'column'}
      width={'100%'}
      gap={'3'}
      p={'4'}
    >
      {participantsBets?.map((predict, index) => {
        const { ownerId, owner, id } = (predict || {}) as SetupsPredictFragment
        const isCurrentUser = ownerId === user?.id
        const listPosition =
          isCurrentUser && myBetPosition ? myBetPosition : index + 1
        // WARN: commented due to absence of price in SetupsBetFragment
        // const winAmount = price?.toFixed(2) || bet.amount?.toFixed(2)

        return (
          <WinnerModalWinnersListItem
            // winAmount={winAmount}
            key={id}
            position={listPosition}
            user={owner as User}
            isCurrentUser={isCurrentUser}
            winnerBorderColor={winnerBorderColor}
          />
        )
      })}
    </Flex>
  )
}

const WinnersListMessageWrapper = ({ message }: { message: string }) => {
  return (
    <Flex
      width={'100%'}
      height={'100%'}
      align={'center'}
      justify={'center'}
      px={'8'}
      className={styles.winnersListContainer}
    >
      <Text
        className='color-white'
        size={'3'}
        align={'center'}
      >
        {message}
      </Text>
    </Flex>
  )
}
