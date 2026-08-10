import { Flex } from '@radix-ui/themes'
import { ProgressCard } from './progress-card'
import { TeamCard } from './team-card'
import { FeatureUpdates } from './updates-card'
import styles from '../about.module.scss'

const AboutBlock: React.FC = () => {
  return (
    <Flex
      className={styles.aboutBlockWrapper}
      direction={'column'}
    >
      <TeamCard />

      <Flex
        className={styles.aboutBlockCards}
        direction={{ initial: 'column', lg: 'row' }}
      >
        <FeatureUpdates />

        <ProgressCard />
      </Flex>
    </Flex>
  )
}

export default AboutBlock
