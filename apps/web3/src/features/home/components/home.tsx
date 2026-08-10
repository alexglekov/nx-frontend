import { Flex } from '@radix-ui/themes'
import { BannerSlider } from 'shared/ui/banner-slider/banner-slider'
import { BANNERS } from '../constants'
import { LiveWinsTable } from './live-wins-table'
import { ModeCards } from './mode-cards'
import styles from '../home.module.scss'

export const Home: React.FC = () => {
  return (
    <Flex
      direction='column'
      gap='1'
      className={styles.homeWrap}
    >
      <BannerSlider banners={BANNERS} />

      <Flex
        gap={{
          initial: '2',
          sm: '1'
        }}
        direction={{
          initial: 'column',
          md: 'row'
        }}
        px={{
          initial: '3',
          sm: '0'
        }}
      >
        <ModeCards />
      </Flex>

      <LiveWinsTable />
    </Flex>
  )
}
