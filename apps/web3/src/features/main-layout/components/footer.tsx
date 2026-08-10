import { Flex, Grid, Text } from '@radix-ui/themes'
import { XyroLogoLink } from 'shared/ui'
import { XyroLink } from 'shared/ui/xyro-link'
import { FOOTER_LINKS, SERVICE_DESCRIPTIONS } from '../constants'
import { FooterLinksSection } from './footer-links-section'
import styles from '../main-layout.module.scss'

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <Flex
      align={'center'}
      gap={'3'}
    >
      <Flex
        p='1'
        align='center'
        justify={'center'}
      >
        <XyroLogoLink
          withText
          withPadding={false}
        />

        {import.meta.env.DEV && (
          <XyroLink to='very-secret-dev-page-for-very-secret-people-who-are-very-secretly-debugging'>
            🥷 SECRET DEV PAGE
          </XyroLink>
        )}
      </Flex>
    </Flex>

    <Grid className={styles.footerMainContainer}>
      <Flex
        direction={'column'}
        gap={'3'}
        className={styles.footerAbout}
      >
        <Text
          size={'2'}
          className={styles.footerMainDescription}
        >
          © 2025 xyro.io [XYRO]
          <br />
          <br />
          Customer support team is available 24/7 via e-mail{' '}
          <a href={'mailto:support@xyro.io'}>support@xyro.io</a> and{' '}
          <a
            href='https://t.me/xyro_chat'
            rel='noreferrer'
            target='_blank'
          >
            Telegram live chat.
          </a>
        </Text>
      </Flex>

      <Grid className={styles.footerLinksContainer}>
        {FOOTER_LINKS.map(el => {
          return (
            <FooterLinksSection
              section={el}
              key={el.title}
            />
          )
        })}
      </Grid>
    </Grid>
  </footer>
)
