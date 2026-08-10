import { Box, Flex, Text } from '@radix-ui/themes'
import { SOCIAL_ITEM_OPTIONS_MAP, SocialTypes } from '../constants'
import { SocialItem } from './social-item'
import styles from '../about.module.scss'

const socialItems = Object.entries(SOCIAL_ITEM_OPTIONS_MAP)

const Footer: React.FC = () => {
  return (
    <footer className={styles.aboutFooter}>
      <Box className={styles.footerBackground} />

      <Text className={styles.aboutFooterDescription}>
        <span className={styles.aboutFooterDescriptionGradient}>
          Subscribe to our socials to stay updated{' '}
        </span>
        <span className={'color-white'}>
          about Mainnet Season 2 & Competitive Airdrop Season 2!
        </span>
      </Text>

      <Flex
        align={'center'}
        gap={'4'}
        justify={'center'}
      >
        {socialItems.map(([key]) => {
          const typedKey = key as SocialTypes

          return (
            <SocialItem
              key={typedKey}
              type={typedKey}
              position={'footer'}
            />
          )
        })}
      </Flex>
    </footer>
  )
}

export default Footer
