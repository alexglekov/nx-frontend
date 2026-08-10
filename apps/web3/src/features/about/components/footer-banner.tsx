import { Box, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { GradientLink } from './gradient-link'
import styles from '../about.module.scss'

const FooterBanner: React.FC = () => {
  return (
    <Flex
      className={styles.footerBanner}
      direction={'column'}
      align={'center'}
      justify={'center'}
      gap={'5'}
    >
      <Box className={styles.footerBannerBlur} />

      <Text className={cn(styles.footerBannerTitle, 'color-pink')}>
        Innovative Trading Platform{' '}
        <span className={'color-white'}>with AI-Driven Gamification</span>
      </Text>

      <GradientLink
        title={'LAUNCH XYRO PLATFORM'}
        href={'/'}
      />
    </Flex>
  )
}

export default FooterBanner
