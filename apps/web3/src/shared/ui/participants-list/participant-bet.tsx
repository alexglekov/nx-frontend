import { memo } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Tooltip } from '@radix-ui/themes'
import { BetType } from '__generated__/graphql'
import classnames from 'classnames'
import {
  AVATAR_FALLBACK_DEFAULT,
  DataTestIDs,
  HIDDEN_PROFILE_TOOLTIP_TEXT,
  RouterPathes
} from 'shared/constants'
import { HotIcon, SwapXyroToken } from 'shared/icons'
import { userVar } from 'shared/store/user'
import { TetherToken, XyroAvatar, XyroNumeral } from 'shared/ui'
import { XyroLink } from 'shared/ui/xyro-link'
import { formatToUSD } from 'shared/utils/format-price'
import { roundNumberWithRelativePrecision } from 'shared/utils/round-number-to-relative-precision'
import styles from './participants-list.module.scss'

interface Props {
  id: string
  address: string
  value: number
  dataTestId?: DataTestIDs
  userLevel?: number | null
  avatarUrl?: string
  ownerName?: string
  betType?: BetType
  isWinStreak?: boolean
  isGameForXyroToken?: boolean
}
/* eslint-disable-next-line complexity */
export const ParticipantBetBase: React.FC<Props> = ({
  id,
  address,
  ownerName,
  avatarUrl,
  value,
  betType,
  isWinStreak,
  userLevel,
  dataTestId,
  isGameForXyroToken = false
}) => {
  const isProfileHidden = (ownerName && !ownerName) ?? true
  const avatarFallback = ownerName?.at(0) || AVATAR_FALLBACK_DEFAULT
  const profileUrl = `${RouterPathes.profile}/${id}`

  const valueRounded = roundNumberWithRelativePrecision(value)
  const formattedValue =
    betType === BetType.Price ? formatToUSD(valueRounded) : valueRounded

  const user = useReactiveVar(userVar)

  const isOwnBet = address === user?.wallet?.address
  const containerClassNames = classnames(styles.participantBetContainer, {
    [styles.ownBet]: isOwnBet
  })

  return (
    <Flex
      className={containerClassNames}
      width={'100%'}
      align={'center'}
      justify={'start'}
      direction={'column'}
      px={'1'}
      gap={'1'}
      position={'relative'}
      data-testid={dataTestId}
    >
      {isWinStreak && (
        <HotIcon
          width={'2rem'}
          height={'2rem'}
          color='var(--orange)'
          className={classnames(styles.winStreakIcon, {
            [styles.winStreakIconMyBet]: isOwnBet
          })}
        />
      )}

      <Tooltip
        content={
          isProfileHidden ? HIDDEN_PROFILE_TOOLTIP_TEXT : ownerName ?? ''
        }
        delayDuration={100}
        hidden={!isProfileHidden}
      >
        <Flex
          align={'center'}
          gap={'2'}
          className={styles.participantBetAvatar}
        >
          <XyroLink to={profileUrl}>
            <XyroAvatar
              fallback={avatarFallback}
              src={avatarUrl}
              userLevel={userLevel}
              displayLevel={false}
              size={'2'}
            />
          </XyroLink>
        </Flex>
      </Tooltip>

      <Flex
        className={styles.participantBetAmount}
        align={'center'}
        gap={'1'}
        width={'auto'}
      >
        {betType !== BetType.Price &&
          (isGameForXyroToken ?
            <SwapXyroToken
              width={'2rem'}
              height={'2rem'}
            />
          : <TetherToken
              size={'2rem'}
              color='yellow'
            />)}

        <XyroNumeral
          variant={'ghost'}
          size={'3'}
          weight={'medium'}
          isWhite={true}
          className={styles.participantBetAmount}
        >
          {formattedValue}
        </XyroNumeral>
      </Flex>
    </Flex>
  )
}

export const ParticipantBet = memo(
  ParticipantBetBase,
  (prevProps: Props, nextProps: Props) => {
    return prevProps.avatarUrl !== nextProps.avatarUrl
  }
)
