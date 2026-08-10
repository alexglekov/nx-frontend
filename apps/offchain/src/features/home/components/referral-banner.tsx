import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import styles from '../home.module.scss'

export const ReferralBanner: React.FC = () => {
  return (
    <Link
      to={'https://xyro.io'}
      className={styles.referralBannerWrapper}
    >
      <Flex
        direction={'column'}
        align={{ initial: 'center', sm: 'start' }}
        className={styles.referralBannerInfo}
      >
        <Text className={cn(styles.referralBannerText, 'color-white')}>
          🚫 iGaming mode is temporarily closed.
        </Text>

        <Text className={cn(styles.referralBannerText, 'color-white')}>
          We’ve decided to pause this section for now. Stay tuned for what’s
          next!
        </Text>

        <Button
          variant='solid'
          color={'pink'}
          size={'4'}
          className={styles.referralBannerButton}
        >
          Go to iTrading
        </Button>
      </Flex>
    </Link>
  )
}
