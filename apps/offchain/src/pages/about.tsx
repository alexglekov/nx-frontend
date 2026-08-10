import { Box, Flex } from '@radix-ui/themes'
import {
  AboutBlock,
  FadeInSection,
  Footer,
  FooterBanner,
  Header,
  Intro,
  InvestorsBlock,
  Roadmap,
  TractionBlock
} from 'features/about'
import { useScrollTop } from 'shared/hooks/use-scroll-top'
import { ROADMAP_ITEMS } from '../features/about/constants'
import {
  globalOverlayAssetsLoadingVar,
  globalOverlayBalanceLoadingVar,
  globalOverlayLoadingVar,
  globalOverlayUserLoadingVar
} from '../shared/store/global-overlay-state-store'
import styles from '../features/about/about.module.scss'

export const AboutPage: React.FC = () => {
  globalOverlayBalanceLoadingVar(false)
  globalOverlayUserLoadingVar(false)
  globalOverlayAssetsLoadingVar(false)

  globalOverlayLoadingVar(false)

  useScrollTop()

  return (
    <Flex
      direction={'column'}
      className={styles.aboutPageWrapper}
      justify={'center'}
      align={'center'}
    >
      <Box className={styles.headerBackground} />

      <Header />

      <FadeInSection canRepeat={false}>
        <Intro />
      </FadeInSection>

      <FadeInSection>
        <TractionBlock />
      </FadeInSection>

      <FadeInSection
        withTimeout
        canRepeat={false}
      >
        <InvestorsBlock />
      </FadeInSection>

      <FadeInSection>
        <AboutBlock />
      </FadeInSection>

      <FadeInSection className={styles.roadmapBlock}>
        <Roadmap items={ROADMAP_ITEMS} />
      </FadeInSection>

      <FadeInSection withTimeout>
        <FooterBanner />
      </FadeInSection>

      <FadeInSection>
        <Footer />
      </FadeInSection>
    </Flex>
  )
}
