import { Box, Flex, Text } from '@radix-ui/themes'
import { OffchainReferralUserLevel } from '__generated__/graphql'
import cn from 'classnames'
import { referralCupImagePath } from 'shared/images'
import { UserProfileLink } from 'shared/ui'
import { MAP_TOP_REFERRAL_TO_ICON } from '../constants'
import { useRewardsLeaderboard } from '../hooks/use-referral-leaderboard'
import styles from '../referral.module.scss'

export const LeaderCards: React.FC = () => {
  const { topUsers } = useRewardsLeaderboard()

  if (!topUsers || topUsers.length === 0) {
    return null
  }

  const firstUser = topUsers[0]
  const secondUser = topUsers[1]
  const thirdUser = topUsers[2]

  return (
    <Flex
      direction={'column'}
      gap={'5'}
      className={styles.leaderCards}
    >
      <Flex
        align={'start'}
        width={'100%'}
        justify={'between'}
        direction={{ initial: 'column', sm: 'row' }}
        gap={'3'}
      >
        <Flex
          direction={'column'}
          gap={'2'}
        >
          <Text
            size={'6'}
            className={'color-white'}
            weight={'bold'}
          >
            Top leaders for previos
          </Text>

          <Text
            size={'6'}
            className={styles.seasonText}
            weight={'bold'}
          >
            Season 3
          </Text>
        </Flex>

        <Text
          size={'2'}
          className={'color-gray-light'}
        >
          At month’s end, the top 3 earners win valuable prizes.
        </Text>
      </Flex>

      <Flex
        gap={'2'}
        align={'end'}
        direction={{ initial: 'column', sm: 'row' }}
      >
        <LeaderCard
          user={secondUser}
          text={'A huge bonus and VIP status!'}
          position={2}
        />

        <LeaderCard
          user={firstUser}
          text={'Exclusive bonus, cash prize, or the latest gadget!'}
          position={1}
        />

        <LeaderCard
          user={thirdUser}
          text={'Free spins, cashback, and additional privileges!'}
          position={3}
        />
      </Flex>
    </Flex>
  )
}

interface Props {
  user: OffchainReferralUserLevel
  text: string
  position: number
}
export const LeaderCard: React.FC<Props> = ({ user, text, position }) => {
  const userBase = user?.user || null

  const TopLevelIcon = MAP_TOP_REFERRAL_TO_ICON[position] || null

  return (
    <Flex
      direction={'column'}
      gap={position === 1 ? '0' : '5'}
      justify={position === 1 ? 'start' : 'between'}
      className={cn(styles.leaderCard, styles[`leaderCard--${position}`])}
      position={'relative'}
    >
      <Flex
        align={'center'}
        gap={'2'}
        className={styles.leaderInfo}
      >
        <TopLevelIcon className={styles.topLevelIcon} />

        <UserProfileLink user={userBase} />
      </Flex>

      <Text
        size={'3'}
        className={'color-gray-light'}
      >
        {text}
      </Text>

      {position === 1 && (
        <img
          src={referralCupImagePath}
          className={styles.referralCupImage}
          alt={'Top cup'}
        />
      )}

      <Box
        className={cn(
          styles.leaderCardShadow,
          styles[`leaderCardShadow--${position}`]
        )}
      />
    </Flex>
  )
}
