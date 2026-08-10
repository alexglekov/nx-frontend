import { Flex } from '@radix-ui/themes'
import { useResponsive } from 'shared/hooks/use-responsive'
import { introBackgroundPath } from 'shared/images'
import { Slider } from 'shared/ui/slider/slider'
import { BonusBanner } from './bonus-banner'
import { GameList } from './game-list'
import { HomeTelegramBanner } from './home-telegram-banner'
import { Intro } from './intro'
import { LiveWinsTable } from './live-wins-table'
import { ReferralBanner } from './referral-banner'
import styles from '../home.module.scss'

export const Home: React.FC = () => {
  const [isMobile] = useResponsive(['xs', 'sm'])

  return (
    <Flex
      direction='column'
      gap='9'
      className={styles.homeWrap}
    >
      {/* {!Boolean(isMobile) && (
        <img
          src={introBackgroundPath}
          className={styles.introImage}
          alt={'intro'}
        />
      )}

      <Intro />

      <GameList title={'Top Games'} /> */}

      {/* <BonusBanner /> */}

      {/* <GameList
        title={'Live'}
        popular
      /> */}

      {/* <HomeTelegramBanner /> */}

      <ReferralBanner />

      {/* <LiveWinsTable /> */}
    </Flex>
  )
}
