import { FC, memo, useMemo } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { OneVsOneExactPricePredict, User } from '__generated__/graphql'
import cn from 'classnames'
import { AVATAR_FALLBACK_DEFAULT, DataTestIDs } from 'shared/constants'
import { userVar } from 'shared/store/user'
import { Maybe } from 'shared/types'
import { XyroAvatar } from 'shared/ui'
import { PredictBadge } from './predict-badge'
import styles from '../mode-one-vs-one.module.scss'

interface Props {
  predict?: Maybe<OneVsOneExactPricePredict>
  participant?: Maybe<User>
  startPrice?: Maybe<number>
  ownerId: string
}

export const ParticipantBase: FC<Props> = ({
  participant,
  predict,
  startPrice,
  ownerId
}) => {
  const user = useReactiveVar(userVar)

  const badgeTitle = useMemo(() => {
    if (predict) {
      return predict.ownerId === user?.id ? 'YOU SAY' : 'OPPONENT SAY'
    } else {
      return ownerId === user?.id ? 'OPPONENT SAY' : 'YOU SAY'
    }
  }, [user, predict, ownerId])

  const containerDataTestId =
    badgeTitle === 'YOU SAY' ? DataTestIDs.oneVsOneUserAcceptBid : ''

  return (
    <Flex
      direction={'column'}
      align={'center'}
      justify={'between'}
      className={cn(styles.participant, {
        [styles.emptyParticipant]: !participant
      })}
      data-testid={containerDataTestId}
    >
      <Flex
        direction={'column'}
        align={'center'}
        className={styles.participantUserContainer}
      >
        <XyroAvatar
          displayLevel={false}
          src={participant?.avatarUris[0]}
          userLevel={participant?.level?.levelId || 0}
          size={'3'}
          fallback={AVATAR_FALLBACK_DEFAULT}
        />

        <Text
          size={'3'}
          mt={'2'}
          align={'center'}
          className={styles.participantUserName}
        >
          {participant?.name ?? '-'}
        </Text>
      </Flex>

      <Flex
        direction={'column'}
        align={'center'}
      >
        <Text
          size={'2'}
          mt={'4'}
          mb={'2'}
          className={styles.participantBadgeTitle}
        >
          {badgeTitle}
        </Text>

        <PredictBadge
          predict={predict}
          startPrice={startPrice}
        />
      </Flex>
    </Flex>
  )
}

export const Participant = memo(
  ParticipantBase,
  (prevProps, nextProps) =>
    prevProps.participant?.id === nextProps.participant?.id
)
