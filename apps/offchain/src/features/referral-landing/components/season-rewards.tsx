import { Box, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { LeaderCard } from 'features/referral/components/leader-cards'
import { useRewardsLeaderboard } from '../../referral/hooks/use-referral-leaderboard'
import styles from '../referral.module.scss'

export const SeasonRewards: React.FC = () => {
  const { topUsers } = useRewardsLeaderboard()

  if (!topUsers || topUsers.length === 0) {
    return null
  }

  const firstUser = topUsers[0]
  const secondUser = topUsers[1]
  const thirdUser = topUsers[2]

  return (
    <Flex
      className={styles.seasonRewardsWrapper}
      direction={'column'}
      width={'100%'}
    >
      <Flex
        gap={'4'}
        direction={'column'}
        align={'center'}
      >
        <Flex
          direction={'column'}
          align={'center'}
        >
          <Text
            className={cn(
              styles.seasonRewardsTitleText,
              styles.seasonRewardsTitleGradient
            )}
            weight={'bold'}
          >
            Seasonal Rewards
          </Text>

          <Text className={cn(styles.seasonRewardsTitleText, 'color-white')}>
            for Top Partners!
          </Text>
        </Flex>

        <Text
          className={cn(
            styles.seasonRewardsDescriptionText,
            'color-gray-light'
          )}
          size={'3'}
        >
          Every month, we launch a seasonal race among our partners! At the end
          of the month, the TOP 3 participants with the highest earnings receive
          valuable prizes:
        </Text>
      </Flex>

      <Box
        className={cn(
          styles.seasonRewardsShadow,
          styles.seasonRewardsShadowFirst
        )}
      />

      <Box
        className={cn(
          styles.seasonRewardsShadow,
          styles.seasonRewardsShadowSecond
        )}
      />

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
