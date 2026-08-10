import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { JoinNowLink } from './join-now-link'
import styles from '../referral.module.scss'

export const BannerCTA: React.FC = () => {
  return (
    <Flex
      className={styles.bannerCTA}
      direction={'column'}
      gap={'5'}
      justify={'center'}
      align={'center'}
    >
      <Flex
        direction={'column'}
        align={'center'}
      >
        <Text
          className={cn(styles.seasonRewardsTitleText, 'color-white')}
          weight={'bold'}
        >
          Join our referral program today
        </Text>

        <Text className={cn(styles.seasonRewardsTitleText, 'color-pink')}>
          and start earning now!
        </Text>
      </Flex>

      <Flex
        width={{ initial: '100%', sm: 'auto' }}
        px={{ initial: '4', sm: '0' }}
      >
        <JoinNowLink />
      </Flex>
    </Flex>
  )
}
