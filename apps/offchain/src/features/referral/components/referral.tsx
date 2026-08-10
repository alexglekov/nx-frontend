import { Flex } from '@radix-ui/themes'
import { AboutReferral } from './about-referral'
import { ActiveSeason } from './active-season'
import { InviteFriends } from './invite-friends'
import { LeaderCards } from './leader-cards'
import { SeasonLeaderboard } from './leaderboard'
import { LevelStats } from './level-stats'
import { RegisteredFriends } from './registered-friends'
import { TournamentStatistics } from './tournament-statistics'
import styles from '../referral.module.scss'

export const Referral: React.FC = () => {
  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'3'}
    >
      <ActiveSeason />

      <Flex
        direction={{ initial: 'column', sm: 'row' }}
        gap={'3'}
      >
        <LevelStats />

        <TournamentStatistics />
      </Flex>

      <Flex
        direction={{ initial: 'column', sm: 'row' }}
        gap={'3'}
      >
        <Flex
          direction={'column'}
          gap={'3'}
          height={'100%'}
          className={styles.cardsInfo}
        >
          <RegisteredFriends />

          <AboutReferral />
        </Flex>

        <InviteFriends />
      </Flex>

      <SeasonLeaderboard />

      <LeaderCards />
    </Flex>
  )
}
