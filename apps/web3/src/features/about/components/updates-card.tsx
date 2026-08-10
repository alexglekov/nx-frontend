import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import styles from '../about.module.scss'

export const FeatureUpdates: React.FC = () => {
  return (
    <Flex
      className={styles.updatesCard}
      direction={'column'}
      gap={'4'}
    >
      <Text className={cn(styles.aboutCardTitle, 'color-white')}>
        Feature Updates
      </Text>

      <Text className={cn(styles.aboutCardText, 'color-white')}>
        Introducing AI agents, expanding into gamified infrastructure,{' '}
        <Text
          as={'span'}
          className={'color-gray-light'}
        >
          adding a layer of memecoins, and launching game modes tied to
          real-world events
        </Text>
      </Text>
    </Flex>
  )
}
